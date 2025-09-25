import chalk from 'chalk';
import cliCursor from 'cli-cursor';
import stripAnsi from 'strip-ansi';
import { VortexOptions, SpinnerType } from './types.js';
import { TerminalDetector } from './terminal.js';
import { ProgressPredictor } from './predictor.js';
import { spinners, getAdaptiveSpinner } from './spinners.js';

export class Vortex {
  private options: Required<VortexOptions>;
  private spinner: SpinnerType;
  private frameIndex: number = 0;
  private timer: NodeJS.Timeout | null = null;
  private isSpinning: boolean = false;
  private terminalDetector: TerminalDetector;
  private predictor: ProgressPredictor;
  private startTime: number = 0;

  constructor(options: VortexOptions = {}) {
    this.terminalDetector = TerminalDetector.getInstance();
    this.predictor = new ProgressPredictor();
    
    const adaptiveConfig = this.terminalDetector.getAdaptiveConfig();
    
    this.options = {
      text: options.text || 'Loading',
      spinner: options.spinner || getAdaptiveSpinner(adaptiveConfig.maxWidth, adaptiveConfig.useUnicode),
      color: options.color || 'cyan',
      interval: options.interval || 100,
      stream: options.stream || process.stderr,
      hideCursor: options.hideCursor !== false,
      indent: options.indent || 0,
      discardStdin: options.discardStdin !== false,
      prefixText: options.prefixText || '',
      suffixText: options.suffixText || '',
      predictive: options.predictive !== false,
      adaptive: options.adaptive !== false
    };

    this.spinner = this.options.spinner;
    
    if (this.options.adaptive) {
      this.adaptToTerminal();
    }
  }

  private adaptToTerminal(): void {
    const config = this.terminalDetector.getAdaptiveConfig();
    
    if (config.compactMode && this.spinner.adaptive) {
      this.spinner = spinners.compact;
    }
    
    if (!config.useUnicode && this.spinner.adaptive) {
      this.spinner = spinners.dots;
    }
  }

  private getColoredFrame(frame: string): string {
    const config = this.terminalDetector.getAdaptiveConfig();
    
    if (config.colorMode === 'none') {
      return frame;
    }
    
    return chalk.hex(this.getColorForMode(config.colorMode))(frame);
  }

  private getColorForMode(colorMode: string): string {
    const colors = {
      basic: '#00FFFF',
      ansi256: '#00FFFF',
      truecolor: this.getGradientColor()
    };
    
    return colors[colorMode as keyof typeof colors] || '#00FFFF';
  }

  private getGradientColor(): string {
    const time = Date.now() - this.startTime;
    const hue = (time / 20) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }

  private formatText(): string {
    const config = this.terminalDetector.getAdaptiveConfig();
    let text = this.options.text;
    
    // Add prediction if enabled
    if (this.options.predictive) {
      const prediction = this.predictor.predict();
      
      if (prediction.confidence > 0.3) {
        const timeLeft = this.predictor.formatTimeEstimate(prediction.estimatedTimeLeft);
        const percentage = Math.round(prediction.percentage);
        
        if (percentage > 0 && percentage < 100) {
          text += ` ${chalk.dim(`(${percentage}%, ~${timeLeft} left)`)}`;
        }
      }
    }
    
    // Truncate if too long for terminal
    const maxLength = config.maxWidth - 10; // Leave space for spinner and padding
    if (stripAnsi(text).length > maxLength) {
      text = text.substring(0, maxLength - 3) + '...';
    }
    
    return text;
  }

  private render(): void {
    if (!this.isSpinning) return;
    
    const frame = this.spinner.frames[this.frameIndex];
    const coloredFrame = this.getColoredFrame(frame);
    const formattedText = this.formatText();
    
    const indent = ' '.repeat(this.options.indent);
    const prefix = this.options.prefixText ? `${this.options.prefixText} ` : '';
    const suffix = this.options.suffixText ? ` ${this.options.suffixText}` : '';
    
    const line = `${indent}${prefix}${coloredFrame} ${formattedText}${suffix}`;
    
    // Clear current line and write new content
    this.options.stream.write('\r\x1b[K' + line);
    
    this.frameIndex = (this.frameIndex + 1) % this.spinner.frames.length;
  }

  public start(text?: string): this {
    if (text) {
      this.options.text = text;
    }
    
    if (this.isSpinning) {
      return this;
    }
    
    this.isSpinning = true;
    this.startTime = Date.now();
    this.frameIndex = 0;
    this.predictor.reset();
    
    if (this.options.hideCursor) {
      cliCursor.hide(this.options.stream);
    }
    
    if (this.options.discardStdin && process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
    }
    
    this.render();
    this.timer = setInterval(() => this.render(), this.options.interval);
    
    return this;
  }

  public stop(): this {
    if (!this.isSpinning) {
      return this;
    }
    
    this.isSpinning = false;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    if (this.options.hideCursor) {
      cliCursor.show(this.options.stream);
    }
    
    if (this.options.discardStdin && process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }
    
    // Clear the line
    this.options.stream.write('\r\x1b[K');
    
    return this;
  }

  public succeed(text?: string): this {
    this.stop();
    const successText = text || this.options.text;
    const indent = ' '.repeat(this.options.indent);
    const prefix = this.options.prefixText ? `${this.options.prefixText} ` : '';
    
    this.options.stream.write(`${indent}${prefix}${chalk.green('✓')} ${successText}\n`);
    return this;
  }

  public fail(text?: string): this {
    this.stop();
    const failText = text || this.options.text;
    const indent = ' '.repeat(this.options.indent);
    const prefix = this.options.prefixText ? `${this.options.prefixText} ` : '';
    
    this.options.stream.write(`${indent}${prefix}${chalk.red('✗')} ${failText}\n`);
    return this;
  }

  public warn(text?: string): this {
    this.stop();
    const warnText = text || this.options.text;
    const indent = ' '.repeat(this.options.indent);
    const prefix = this.options.prefixText ? `${this.options.prefixText} ` : '';
    
    this.options.stream.write(`${indent}${prefix}${chalk.yellow('⚠')} ${warnText}\n`);
    return this;
  }

  public info(text?: string): this {
    this.stop();
    const infoText = text || this.options.text;
    const indent = ' '.repeat(this.options.indent);
    const prefix = this.options.prefixText ? `${this.options.prefixText} ` : '';
    
    this.options.stream.write(`${indent}${prefix}${chalk.blue('ℹ')} ${infoText}\n`);
    return this;
  }

  public updateProgress(current: number, total?: number): this {
    if (this.options.predictive) {
      this.predictor.updateProgress(current, total);
    }
    return this;
  }

  public setText(text: string): this {
    this.options.text = text;
    return this;
  }

  public setSpinner(spinner: string | SpinnerType): this {
    if (typeof spinner === 'string') {
      this.spinner = spinners[spinner] || this.spinner;
    } else {
      this.spinner = spinner;
    }
    return this;
  }

  public setColor(color: string): this {
    this.options.color = color;
    return this;
  }

  public get isActive(): boolean {
    return this.isSpinning;
  }
}