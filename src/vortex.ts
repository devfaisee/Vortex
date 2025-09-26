import { VortexOptions, SpinnerType, ProgressPrediction, SpinnerStats, PerformanceMetrics } from './types.js';
import { TerminalDetector, Colors, Cursor } from './terminal.js';
import { ProgressPredictor } from './predictor.js';
import { spinners, getAdaptiveSpinner } from './spinners.js';

/**
 * Vortex - Advanced terminal spinner with progress prediction
 * Zero dependencies, high performance, professional animations
 */
export class Vortex {
  private options: Required<VortexOptions>;
  private terminal: TerminalDetector;
  private predictor: ProgressPredictor;
  
  private isSpinning: boolean = false;
  private currentFrame: number = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private startTime: number = 0;
  private lastRenderTime: number = 0;
  private frameCount: number = 0;
  
  private currentSpinner: SpinnerType;
  private originalText: string = '';
  private lastLineLength: number = 0;
  
  // Performance tracking
  private performanceMetrics: PerformanceMetrics = {
    renderTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    frameRate: 60
  };

  constructor(options: VortexOptions = {}) {
    // Set comprehensive default options
    this.options = {
      text: options.text || 'Loading...',
      spinner: options.spinner || 'vortex',
      color: options.color || 'cyan',
      interval: options.interval ?? 150,
      stream: options.stream || process.stderr,
      hideCursor: options.hideCursor !== false,
      indent: options.indent ?? 0,
      discardStdin: options.discardStdin !== false,
      prefixText: options.prefixText || '',
      suffixText: options.suffixText || '',
      predictive: options.predictive !== false,
      adaptive: options.adaptive !== false,
      gradient: options.gradient || false,
      rainbow: options.rainbow || false,
      bold: options.bold || false,
      dim: options.dim || false
    };

    // Initialize components
    this.terminal = TerminalDetector.getInstance();
    this.predictor = new ProgressPredictor();
    
    // Set initial spinner
    this.currentSpinner = this.getSpinnerConfig();
    this.originalText = this.options.text;
  }

  /**
   * Start the spinner animation
   */
  public start(text?: string): this {
    if (this.isSpinning) {
      return this;
    }

    if (text) {
      this.options.text = text;
      this.originalText = text;
    }

    this.isSpinning = true;
    this.startTime = Date.now();
    this.frameCount = 0;
    this.currentFrame = 0;
    
    // Hide cursor if enabled
    if (this.options.hideCursor) {
      Cursor.hide();
    }

    // Handle stdin if needed
    if (this.options.discardStdin && process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
    }

    // Reset predictor
    this.predictor.reset();

    // Start animation loop
    this.startAnimation();

    return this;
  }

  /**
   * Stop the spinner animation
   */
  public stop(): this {
    if (!this.isSpinning) {
      return this;
    }

    this.isSpinning = false;

    // Clear interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Clear the line
    if (this.options.stream.isTTY) {
      this.options.stream.write('\r\x1b[K');
    } else {
      this.options.stream.write('\r');
      this.options.stream.write(' '.repeat(this.lastLineLength));
      this.options.stream.write('\r');
    }

    // Show cursor if it was hidden
    if (this.options.hideCursor) {
      Cursor.show();
    }

    // Restore stdin
    if (this.options.discardStdin && process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }

    return this;
  }

  /**
   * Update spinner text
   */
  public setText(text: string): this {
    this.options.text = text;
    return this;
  }

  /**
   * Update spinner type
   */
  public setSpinner(spinner: string): this {
    this.options.spinner = spinner;
    this.currentSpinner = this.getSpinnerConfig();
    this.currentFrame = 0;
    
    // Restart animation with new spinner
    if (this.isSpinning) {
      this.startAnimation();
    }
    
    return this;
  }

  /**
   * Update spinner color
   */
  public setColor(color: string): this {
    this.options.color = color;
    return this;
  }

  /**
   * Enable/disable progress prediction
   */
  public setPredictive(enabled: boolean): this {
    this.options.predictive = enabled;
    if (enabled) {
      this.predictor.reset();
    }
    return this;
  }

  /**
   * Update progress for prediction
   */
  public updateProgress(current: number, total: number = 100): this {
    if (this.options.predictive) {
      this.predictor.updateProgress(current, total);
    }
    return this;
  }

  /**
   * Simulate progress for demo purposes
   */
  public simulateProgress(): this {
    if (this.options.predictive) {
      this.predictor.simulateProgress();
    }
    return this;
  }

  /**
   * Set manual progress percentage
   */
  public setProgress(percentage: number): this {
    if (this.options.predictive) {
      this.predictor.setProgress(percentage);
    }
    return this;
  }

  /**
   * Succeed and stop spinner
   */
  public succeed(text?: string): this {
    this.stop();
    const successText = text || this.options.text;
    const symbol = Colors.green('✓');
    this.writeLine(`${symbol} ${successText}`);
    return this;
  }

  /**
   * Fail and stop spinner
   */
  public fail(text?: string): this {
    this.stop();
    const failText = text || this.options.text;
    const symbol = Colors.red('✗');
    this.writeLine(`${symbol} ${failText}`);
    return this;
  }

  /**
   * Warn and stop spinner
   */
  public warn(text?: string): this {
    this.stop();
    const warnText = text || this.options.text;
    const symbol = Colors.yellow('⚠');
    this.writeLine(`${symbol} ${warnText}`);
    return this;
  }

  /**
   * Info and stop spinner
   */
  public info(text?: string): this {
    this.stop();
    const infoText = text || this.options.text;
    const symbol = Colors.blue('ℹ');
    this.writeLine(`${symbol} ${infoText}`);
    return this;
  }

  /**
   * Get current spinner statistics
   */
  public getStats(): SpinnerStats {
    const elapsed = Date.now() - this.startTime;
    return {
      startTime: this.startTime,
      totalFrames: this.frameCount,
      averageFrameTime: this.frameCount > 0 ? elapsed / this.frameCount : 0,
      predictedCompletion: this.predictor.getStats().predictedCompletion
    };
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics };
  }

  /**
   * Check if spinner is currently running
   */
  public get spinning(): boolean {
    return this.isSpinning;
  }

  /**
   * Get current text
   */
  public get text(): string {
    return this.options.text;
  }

  /**
   * Start the animation loop
   */
  private startAnimation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const interval = this.options.interval || this.currentSpinner.interval;
    
    this.intervalId = setInterval(() => {
      if (this.isSpinning) {
        this.render();
      }
    }, interval);

    // Render immediately
    this.render();
  }

  /**
   * Render current frame
   */
  private render(): void {
    const renderStart = Date.now();
    
    try {
      // Update frame
      this.currentFrame = (this.currentFrame + 1) % this.currentSpinner.frames.length;
      this.frameCount++;

      // Get current frame
      const frame = this.currentSpinner.frames[this.currentFrame];
      
      // Apply colors and effects
      const coloredFrame = this.applyEffects(frame);
      
      // Format text with progress prediction
      const formattedText = this.formatText();
      
      // Construct full line
      const line = `${coloredFrame} ${formattedText}`;
      
      // Clear current line and write new content
      if (this.options.stream.isTTY) {
        this.options.stream.write('\r\x1b[K');
        this.options.stream.write(line);
      } else {
        this.options.stream.write('\r');
        this.options.stream.write(' '.repeat(this.lastLineLength));
        this.options.stream.write('\r');
        this.options.stream.write(line);
      }
      
      this.lastLineLength = this.stripAnsi(line).length;
      
      // Update performance metrics
      this.updatePerformanceMetrics(renderStart);
      
      // Update progress prediction if enabled
      if (this.options.predictive) {
        this.simulateProgress();
      }
      
    } catch (error) {
      // Graceful error handling
      console.error('Vortex render error:', error);
    }
  }

  /**
   * Apply visual effects to frame
   */
  private applyEffects(frame: string): string {
    let result = frame;

    // Apply rainbow effect
    if (this.options.rainbow) {
      result = Colors.rainbow(result);
    }
    // Apply gradient effect
    else if (this.options.gradient) {
      result = Colors.gradient(result, this.options.color, 'white');
    }
    // Apply regular color
    else {
      result = Colors.colorize(result, this.options.color);
    }

    // Apply text effects
    if (this.options.bold) {
      result = Colors.bold(result);
    }
    
    if (this.options.dim) {
      result = Colors.dim(result);
    }

    return result;
  }

  /**
   * Format text with progress prediction
   */
  private formatText(): string {
    let text = this.options.text;

    // Add progress prediction if enabled
    if (this.options.predictive && this.predictor.isReliable()) {
      const prediction = this.predictor.predict();
      const progressBar = this.predictor.getProgressBar(20);
      const timeLeft = this.predictor.formatTimeEstimate(prediction.estimatedTimeLeft);
      
      // Create detailed progress display
      const progressInfo = Colors.dim(
        ` [${progressBar}] ${prediction.percentage.toFixed(1)}% ~${timeLeft}`
      );
      
      // Add trend indicator
      let trendIndicator = '';
      switch (prediction.trend) {
        case 'accelerating':
          trendIndicator = Colors.green(' ↗');
          break;
        case 'slowing':
          trendIndicator = Colors.yellow(' ↘');
          break;
        default:
          trendIndicator = Colors.blue(' →');
      }
      
      text += progressInfo + trendIndicator;
    }

    return text;
  }

  /**
   * Get spinner configuration
   */
  private getSpinnerConfig(): SpinnerType {
    // First try to get the specific spinner requested
    const spinner = spinners[this.options.spinner as keyof typeof spinners];
    if (spinner) {
      return spinner;
    }
    
    // If spinner not found and adaptive is enabled, use adaptive selection
    if (this.options.adaptive) {
      return getAdaptiveSpinner(
        this.terminal.width,
        this.terminal.supportsUnicode(),
        this.terminal.supportsEmoji()
      );
    }
    
    // Fallback to vortex
    console.warn(`Unknown spinner: ${this.options.spinner}, falling back to 'vortex'`);
    return spinners.vortex;
  }

  /**
   * Clear current line
   */
  private clearLine(): void {
    if (this.lastLineLength > 0) {
      Cursor.clearLine();
      Cursor.moveToColumn(0);
    }
  }

  /**
   * Write line to output
   */
  private writeLine(text: string, newline: boolean = true): void {
    this.lastLineLength = this.stripAnsi(text).length;
    
    if (newline) {
      this.options.stream.write(text + '\n');
    } else {
      this.options.stream.write(text);
    }
  }

  /**
   * Strip ANSI escape codes for length calculation
   */
  private stripAnsi(text: string): string {
    return text.replace(/\u001b\[[0-9;]*m/g, '');
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(renderStart: number): void {
    const renderTime = Date.now() - renderStart;
    this.performanceMetrics.renderTime = renderTime;
    
    // Calculate frame rate
    const now = Date.now();
    if (this.lastRenderTime > 0) {
      const frameDuration = now - this.lastRenderTime;
      this.performanceMetrics.frameRate = Math.round(1000 / frameDuration);
    }
    this.lastRenderTime = now;
    
    // Estimate memory usage (simplified)
    if (process.memoryUsage) {
      this.performanceMetrics.memoryUsage = process.memoryUsage().heapUsed;
    }
  }

  /**
   * Create a new Vortex instance with options
   */
  public static create(options?: VortexOptions): Vortex {
    return new Vortex(options);
  }

  /**
   * Quick start method for simple use cases
   */
  public static start(text: string, options?: VortexOptions): Vortex {
    const spinner = new Vortex({ ...options, text });
    return spinner.start();
  }

  /**
   * Quick success method
   */
  public static succeed(text: string, options?: VortexOptions): void {
    const spinner = new Vortex(options);
    spinner.succeed(text);
  }

  /**
   * Quick fail method
   */
  public static fail(text: string, options?: VortexOptions): void {
    const spinner = new Vortex(options);
    spinner.fail(text);
  }

  /**
   * Quick warn method
   */
  public static warn(text: string, options?: VortexOptions): void {
    const spinner = new Vortex(options);
    spinner.warn(text);
  }

  /**
   * Quick info method
   */
  public static info(text: string, options?: VortexOptions): void {
    const spinner = new Vortex(options);
    spinner.info(text);
  }
}