/**
 * Zero-dependency terminal utilities with advanced color support and detection
 */

export interface TerminalCapabilities {
  width: number;
  height: number;
  colorDepth: number;
  supportsUnicode: boolean;
  supportsEmoji: boolean;
  isInteractive: boolean;
  platform: string;
}

export interface ColorConfig {
  mode: 'none' | 'basic' | 'ansi256' | 'truecolor';
  supportsRgb: boolean;
  supportsGradients: boolean;
}

export class TerminalDetector {
  private static instance: TerminalDetector;
  private capabilities: TerminalCapabilities;
  private colorConfig: ColorConfig;

  private constructor() {
    this.capabilities = this.detectCapabilities();
    this.colorConfig = this.detectColorSupport();
  }

  public static getInstance(): TerminalDetector {
    if (!TerminalDetector.instance) {
      TerminalDetector.instance = new TerminalDetector();
    }
    return TerminalDetector.instance;
  }

  private detectCapabilities(): TerminalCapabilities {
    const width = process.stdout.columns || 80;
    const height = process.stdout.rows || 24;
    
    return {
      width,
      height,
      colorDepth: this.getColorDepth(),
      supportsUnicode: this.detectUnicodeSupport(),
      supportsEmoji: this.detectEmojiSupport(),
      isInteractive: process.stdout.isTTY || false,
      platform: process.platform
    };
  }

  private getColorDepth(): number {
    const env = process.env;
    
    if (env.COLORTERM === 'truecolor' || env.COLORTERM === '24bit') {
      return 24;
    }
    
    if (env.TERM && (env.TERM.includes('256') || env.TERM.includes('xterm'))) {
      return 8;
    }
    
    if (env.TERM && env.TERM !== 'dumb') {
      return 4;
    }
    
    return 1;
  }

  private detectUnicodeSupport(): boolean {
    const env = process.env;
    const locale = env.LC_ALL || env.LC_CTYPE || env.LANG || '';
    
    return locale.toLowerCase().includes('utf') || 
           env.TERM_PROGRAM === 'vscode' ||
           env.TERM_PROGRAM === 'hyper' ||
           process.platform === 'darwin';
  }

  private detectEmojiSupport(): boolean {
    return this.detectUnicodeSupport() && 
           (process.platform !== 'win32' ||
           (process.platform === 'win32' && !!process.env.WT_SESSION));
  }

  /**
   * Check if terminal supports Unicode characters
   */
  public checkUnicodeSupport(): boolean {
    return this.capabilities.supportsUnicode;
  }

  /**
   * Check if terminal supports emoji
   */
  public checkEmojiSupport(): boolean {
    return this.capabilities.supportsEmoji;
  }

  private detectColorSupport(): ColorConfig {
    const depth = this.capabilities.colorDepth;
    
    if (depth >= 24) {
      return {
        mode: 'truecolor',
        supportsRgb: true,
        supportsGradients: true
      };
    }
    
    if (depth >= 8) {
      return {
        mode: 'ansi256',
        supportsRgb: false,
        supportsGradients: false
      };
    }
    
    if (depth >= 4) {
      return {
        mode: 'basic',
        supportsRgb: false,
        supportsGradients: false
      };
    }
    
    return {
      mode: 'none',
      supportsRgb: false,
      supportsGradients: false
    };
  }

  public getCapabilities(): TerminalCapabilities {
    return { ...this.capabilities };
  }

  public getColorConfig(): ColorConfig {
    return { ...this.colorConfig };
  }

  public isCompactMode(): boolean {
    return this.capabilities.width < 60;
  }

  public get width(): number {
    return this.capabilities.width;
  }

  public supportsUnicode(): boolean {
    return this.capabilities.supportsUnicode;
  }

  public supportsEmoji(): boolean {
    return this.capabilities.supportsEmoji;
  }

  public getOptimalSpinnerType(): string {
    if (!this.capabilities.supportsUnicode) {
      return 'ascii';
    }
    
    if (this.capabilities.width < 40) {
      return 'compact';
    }
    
    if (this.capabilities.supportsEmoji) {
      return 'emoji';
    }
    
    return 'unicode';
  }
}

/**
 * Zero-dependency color utilities
 */
export class Colors {
  private static colorConfig = TerminalDetector.getInstance().getColorConfig();

  // ANSI escape codes
  private static readonly RESET = '\x1b[0m';
  private static readonly BOLD = '\x1b[1m';
  private static readonly DIM = '\x1b[2m';
  
  // Basic colors
  private static readonly COLORS = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m'
  };

  public static colorize(text: string, color: string): string {
    if (this.colorConfig.mode === 'none') {
      return text;
    }

    if (this.colorConfig.mode === 'truecolor' && color.startsWith('#')) {
      return this.rgb(text, color);
    }

    const colorCode = this.COLORS[color as keyof typeof this.COLORS];
    if (colorCode) {
      return `${colorCode}${text}${this.RESET}`;
    }

    return text;
  }

  public static rgb(text: string, hex: string): string {
    if (this.colorConfig.mode !== 'truecolor') {
      return this.colorize(text, 'cyan'); // Fallback
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `\x1b[38;2;${r};${g};${b}m${text}${this.RESET}`;
  }

  public static gradient(text: string, startColor: string, endColor: string): string {
    if (!this.colorConfig.supportsGradients || text.length < 2) {
      return this.colorize(text, startColor);
    }

    const start = this.colorToRgb(startColor);
    const end = this.colorToRgb(endColor);
    const length = text.length;
    
    let result = '';
    for (let i = 0; i < length; i++) {
      const ratio = i / (length - 1);
      const r = Math.round(start.r + (end.r - start.r) * ratio);
      const g = Math.round(start.g + (end.g - start.g) * ratio);
      const b = Math.round(start.b + (end.b - start.b) * ratio);
      
      result += `\x1b[38;2;${r};${g};${b}m${text[i]}`;
    }
    
    return result + this.RESET;
  }

  public static bold(text: string): string {
    return `${this.BOLD}${text}${this.RESET}`;
  }

  public static dim(text: string): string {
    return `${this.DIM}${text}${this.RESET}`;
  }

  /**
   * Apply red color
   */
  public static red(text: string): string {
    return `\x1b[31m${text}\x1b[0m`;
  }

  /**
   * Apply green color
   */
  public static green(text: string): string {
    return `\x1b[32m${text}\x1b[0m`;
  }

  /**
   * Apply yellow color
   */
  public static yellow(text: string): string {
    return `\x1b[33m${text}\x1b[0m`;
  }

  /**
   * Apply blue color
   */
  public static blue(text: string): string {
    return `\x1b[34m${text}\x1b[0m`;
  }

  private static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  private static colorToRgb(color: string): { r: number; g: number; b: number } {
    // If it's a hex color, use hexToRgb
    if (color.startsWith('#')) {
      return this.hexToRgb(color);
    }
    
    // Map color names to RGB values
    const colorMap: { [key: string]: { r: number; g: number; b: number } } = {
      black: { r: 0, g: 0, b: 0 },
      red: { r: 255, g: 0, b: 0 },
      green: { r: 0, g: 255, b: 0 },
      yellow: { r: 255, g: 255, b: 0 },
      blue: { r: 0, g: 0, b: 255 },
      magenta: { r: 255, g: 0, b: 255 },
      cyan: { r: 0, g: 255, b: 255 },
      white: { r: 255, g: 255, b: 255 },
      gray: { r: 128, g: 128, b: 128 }
    };
    
    return colorMap[color] || colorMap.cyan; // Default to cyan if color not found
  }

  public static rainbow(text: string, speed: number = 1): string {
    if (!this.colorConfig.supportsGradients) {
      return this.colorize(text, 'cyan');
    }

    const time = Date.now() * speed;
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const hue = (time / 50 + i * 10) % 360;
      const { r, g, b } = this.hslToRgb(hue, 70, 60);
      result += `\x1b[38;2;${r};${g};${b}m${text[i]}`;
    }
    
    return result + this.RESET;
  }

  private static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);

    return { r, g, b };
  }
}

/**
 * Zero-dependency cursor utilities
 */
export class Cursor {
  public static hide(): void {
    if (process.stdout.isTTY) {
      process.stdout.write('\x1b[?25l');
    }
  }

  public static show(): void {
    if (process.stdout.isTTY) {
      process.stdout.write('\x1b[?25h');
    }
  }

  public static clearLine(): void {
    if (process.stdout.isTTY) {
      process.stdout.write('\r\x1b[K');
    }
  }

  public static moveTo(x: number, y: number): void {
    if (process.stdout.isTTY) {
      process.stdout.write(`\x1b[${y};${x}H`);
    }
  }

  /**
   * Move cursor to specific column
   */
  public static moveToColumn(col: number): void {
    if (process.stdout.isTTY) {
      process.stdout.write(`\x1b[${col}G`);
    }
  }
}