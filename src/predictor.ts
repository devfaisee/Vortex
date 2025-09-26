import { ProgressPrediction, SpinnerStats, PerformanceMetrics } from './types.js';

/**
 * Progress prediction engine with statistical analysis
 * Zero dependencies, high accuracy
 */
export class ProgressPredictor {
  private startTime: number = 0;
  private samples: number[] = [];
  private progressHistory: Array<{ time: number; progress: number }> = [];
  private currentProgress: number = 0;
  private totalExpected: number = 100;
  private confidence: number = 0;
  private trend: 'accelerating' | 'steady' | 'slowing' = 'steady';
  private accuracy: number = 0;
  private performanceMetrics: PerformanceMetrics;

  constructor() {
    this.performanceMetrics = {
      renderTime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      frameRate: 60
    };
  }

  /**
   * Reset predictor for new operation
   */
  public reset(): void {
    this.startTime = Date.now();
    this.samples = [];
    this.progressHistory = [];
    this.currentProgress = 0;
    this.confidence = 0;
    this.trend = 'steady';
    this.accuracy = 0;
  }

  /**
   * Update progress with current value
   */
  public updateProgress(current: number, total: number = 100): void {
    this.totalExpected = total;
    this.currentProgress = Math.min(current, total);
    
    const now = Date.now();
    const elapsed = now - this.startTime;
    
    this.progressHistory.push({
      time: elapsed,
      progress: (this.currentProgress / this.totalExpected) * 100
    });

    // Keep only recent history for better prediction
    if (this.progressHistory.length > 20) {
      this.progressHistory = this.progressHistory.slice(-20);
    }

    this.updateTrend();
    this.updateConfidence();
    this.updateAccuracy();
  }

  /**
   * Simulate progress for demo purposes
   */
  public simulateProgress(): void {
    const elapsed = Date.now() - this.startTime;
    const baseProgress = Math.min((elapsed / 10000) * 100, 100); // 10 second simulation
    
    // Add realistic variations
    const variation = Math.sin(elapsed / 1000) * 5;
    const networkDelay = Math.random() * 10;
    
    this.currentProgress = Math.max(0, Math.min(100, baseProgress + variation - networkDelay));
    
    this.progressHistory.push({
      time: elapsed,
      progress: this.currentProgress
    });

    if (this.progressHistory.length > 15) {
      this.progressHistory = this.progressHistory.slice(-15);
    }

    this.updateTrend();
    this.updateConfidence();
    this.updateAccuracy();
  }

  /**
   * Get current prediction with enhanced accuracy
   */
  public predict(): ProgressPrediction {
    if (this.progressHistory.length < 2) {
      return {
        percentage: 0,
        estimatedTimeLeft: 0,
        confidence: 0,
        trend: 'steady',
        accuracy: 0
      };
    }

    const currentTime = Date.now() - this.startTime;
    const recentHistory = this.progressHistory.slice(-10);
    
    // Calculate velocity using weighted average
    let totalWeight = 0;
    let weightedVelocity = 0;
    
    for (let i = 1; i < recentHistory.length; i++) {
      const timeDiff = recentHistory[i].time - recentHistory[i - 1].time;
      const progressDiff = recentHistory[i].progress - recentHistory[i - 1].progress;
      
      if (timeDiff > 0) {
        const velocity = progressDiff / timeDiff;
        const weight = Math.exp(-(recentHistory.length - i) * 0.2); // Recent samples have higher weight
        
        weightedVelocity += velocity * weight;
        totalWeight += weight;
      }
    }

    const averageVelocity = totalWeight > 0 ? weightedVelocity / totalWeight : 0;
    const remainingProgress = 100 - this.currentProgress;
    const estimatedTimeLeft = averageVelocity > 0 ? remainingProgress / averageVelocity : 0;

    return {
      percentage: Math.round(this.currentProgress * 10) / 10,
      estimatedTimeLeft: Math.max(0, estimatedTimeLeft),
      confidence: this.confidence,
      trend: this.trend,
      accuracy: this.accuracy
    };
  }

  /**
   * Format time estimate in human-readable format
   */
  public formatTimeEstimate(milliseconds: number): string {
    if (milliseconds < 1000) {
      return '<1s';
    }
    
    const seconds = Math.round(milliseconds / 1000);
    
    if (seconds < 60) {
      return `${seconds}s`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes < 60) {
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours}h ${remainingMinutes}m`;
  }

  /**
   * Get progress bar visualization
   */
  public getProgressBar(width: number = 20): string {
    const percentage = this.currentProgress;
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    
    const filledChar = '█';
    const emptyChar = '░';
    const partialChars = ['▏', '▎', '▍', '▌', '▋', '▊', '▉'];
    
    let bar = filledChar.repeat(filled);
    
    // Add partial character for smoother animation
    if (empty > 0 && filled < width) {
      const partial = ((percentage / 100) * width) - filled;
      const partialIndex = Math.floor(partial * partialChars.length);
      if (partialIndex > 0 && partialIndex < partialChars.length) {
        bar += partialChars[partialIndex];
        bar += emptyChar.repeat(empty - 1);
      } else {
        bar += emptyChar.repeat(empty);
      }
    }
    
    return bar;
  }

  /**
   * Get detailed progress information
   */
  public getDetailedProgress(): string {
    const prediction = this.predict();
    const progressBar = this.getProgressBar(25);
    const timeLeft = this.formatTimeEstimate(prediction.estimatedTimeLeft);
    
    let trendIndicator = '';
    switch (prediction.trend) {
      case 'accelerating':
        trendIndicator = '↗️';
        break;
      case 'slowing':
        trendIndicator = '↘️';
        break;
      default:
        trendIndicator = '→';
    }
    
    const confidenceLevel = prediction.confidence > 0.8 ? 'High' : 
                           prediction.confidence > 0.5 ? 'Medium' : 'Low';
    
    return `${progressBar} ${prediction.percentage.toFixed(1)}% ${trendIndicator} ~${timeLeft} (${confidenceLevel})`;
  }

  /**
   * Update trend analysis
   */
  private updateTrend(): void {
    if (this.progressHistory.length < 3) {
      this.trend = 'steady';
      return;
    }

    const recent = this.progressHistory.slice(-3);
    const velocities: number[] = [];
    
    for (let i = 1; i < recent.length; i++) {
      const timeDiff = recent[i].time - recent[i - 1].time;
      const progressDiff = recent[i].progress - recent[i - 1].progress;
      
      if (timeDiff > 0) {
        velocities.push(progressDiff / timeDiff);
      }
    }

    if (velocities.length >= 2) {
      const velocityChange = velocities[velocities.length - 1] - velocities[0];
      
      if (velocityChange > 0.001) {
        this.trend = 'accelerating';
      } else if (velocityChange < -0.001) {
        this.trend = 'slowing';
      } else {
        this.trend = 'steady';
      }
    }
  }

  /**
   * Update confidence level
   */
  private updateConfidence(): void {
    if (this.progressHistory.length < 3) {
      this.confidence = 0.1;
      return;
    }

    // Calculate variance in velocity
    const velocities: number[] = [];
    for (let i = 1; i < this.progressHistory.length; i++) {
      const timeDiff = this.progressHistory[i].time - this.progressHistory[i - 1].time;
      const progressDiff = this.progressHistory[i].progress - this.progressHistory[i - 1].progress;
      
      if (timeDiff > 0) {
        velocities.push(progressDiff / timeDiff);
      }
    }

    if (velocities.length > 1) {
      const mean = velocities.reduce((a, b) => a + b, 0) / velocities.length;
      const variance = velocities.reduce((acc, vel) => acc + Math.pow(vel - mean, 2), 0) / velocities.length;
      
      // Lower variance = higher confidence
      this.confidence = Math.max(0.1, Math.min(1.0, 1 - Math.sqrt(variance) * 10));
    }
  }

  /**
   * Update accuracy based on prediction vs actual
   */
  private updateAccuracy(): void {
    if (this.progressHistory.length < 5) {
      this.accuracy = 0.5;
      return;
    }

    // Simple accuracy calculation based on trend consistency
    const recentTrends = this.progressHistory.slice(-5);
    let consistentTrends = 0;
    
    for (let i = 1; i < recentTrends.length; i++) {
      const expectedTrend = this.trend;
      const actualChange = recentTrends[i].progress - recentTrends[i - 1].progress;
      
      let actualTrend: 'accelerating' | 'steady' | 'slowing' = 'steady';
      if (actualChange > 2) actualTrend = 'accelerating';
      else if (actualChange < -1) actualTrend = 'slowing';
      
      if (expectedTrend === actualTrend) {
        consistentTrends++;
      }
    }
    
    this.accuracy = consistentTrends / (recentTrends.length - 1);
  }

  /**
   * Get performance statistics
   */
  public getStats(): SpinnerStats {
    const elapsed = Date.now() - this.startTime;
    
    return {
      startTime: this.startTime,
      totalFrames: this.progressHistory.length,
      averageFrameTime: this.progressHistory.length > 0 ? elapsed / this.progressHistory.length : 0,
      predictedCompletion: this.startTime + (elapsed / (this.currentProgress / 100))
    };
  }

  /**
   * Check if prediction is reliable
   */
  public isReliable(): boolean {
    return this.confidence > 0.3 && this.progressHistory.length >= 3;
  }

  /**
   * Get current progress percentage
   */
  public getCurrentProgress(): number {
    return this.currentProgress;
  }

  /**
   * Set manual progress for testing
   */
  public setProgress(percentage: number): void {
    this.currentProgress = Math.max(0, Math.min(100, percentage));
    this.updateProgress(this.currentProgress, 100);
  }
}