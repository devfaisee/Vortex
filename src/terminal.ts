import terminalSize from 'terminal-size';
import { TerminalInfo, AdaptiveConfig } from './types.js';

export class TerminalDetector {
  private static instance: TerminalDetector;
  private terminalInfo: TerminalInfo;

  private constructor() {
    this.terminalInfo = this.detectTerminal();
  }

  public static getInstance(): TerminalDetector {
    if (!TerminalDetector.instance) {
      TerminalDetector.instance = new TerminalDetector();
    }
    return TerminalDetector.instance;
  }

  private detectTerminal(): TerminalInfo {
    const size = terminalSize();
    const supportsColor = this.detectColorSupport();
    const colorDepth = this.detectColorDepth();

    return {
      width: size.columns || 80,
      height: size.rows || 24,
      supportsColor,
      colorDepth
    };
  }

  private detectColorSupport(): boolean {
    if (process.env.NO_COLOR) return false;
    if (process.env.FORCE_COLOR) return true;
    
    const term = process.env.TERM || '';
    const colorterm = process.env.COLORTERM || '';
    
    return !!(
      process.stdout.isTTY &&
      (colorterm === 'truecolor' ||
       term.includes('color') ||
       term.includes('256') ||
       term === 'xterm' ||
       term === 'screen')
    );
  }

  private detectColorDepth(): number {
    if (!this.terminalInfo?.supportsColor) return 0;
    
    const colorterm = process.env.COLORTERM || '';
    const term = process.env.TERM || '';
    
    if (colorterm === 'truecolor' || colorterm === '24bit') return 24;
    if (term.includes('256')) return 8;
    if (term.includes('color')) return 4;
    
    return 4; // Basic color support
  }

  public getTerminalInfo(): TerminalInfo {
    return { ...this.terminalInfo };
  }

  public getAdaptiveConfig(): AdaptiveConfig {
    const info = this.getTerminalInfo();
    
    return {
      minWidth: 20,
      maxWidth: Math.min(info.width - 4, 120),
      compactMode: info.width < 60,
      useUnicode: info.width > 40 && process.platform !== 'win32',
      colorMode: this.getColorMode(info)
    };
  }

  private getColorMode(info: TerminalInfo): AdaptiveConfig['colorMode'] {
    if (!info.supportsColor) return 'none';
    if (info.colorDepth >= 24) return 'truecolor';
    if (info.colorDepth >= 8) return 'ansi256';
    return 'basic';
  }

  public refresh(): void {
    this.terminalInfo = this.detectTerminal();
  }
}