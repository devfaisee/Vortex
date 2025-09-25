import { ProgressData, PredictionResult } from './types.js';

export class ProgressPredictor {
  private progressData: ProgressData;
  private readonly maxSamples = 20;
  private readonly minSamplesForPrediction = 3;

  constructor() {
    this.progressData = {
      current: 0,
      total: 0,
      startTime: Date.now(),
      lastUpdate: Date.now(),
      samples: [],
      sampleTimes: []
    };
  }

  public updateProgress(current: number, total?: number): void {
    const now = Date.now();
    
    if (total !== undefined) {
      this.progressData.total = total;
    }

    this.progressData.current = current;
    this.progressData.lastUpdate = now;

    // Add sample for prediction
    this.addSample(current, now);
  }

  private addSample(value: number, timestamp: number): void {
    this.progressData.samples.push(value);
    this.progressData.sampleTimes.push(timestamp);

    // Keep only recent samples
    if (this.progressData.samples.length > this.maxSamples) {
      this.progressData.samples.shift();
      this.progressData.sampleTimes.shift();
    }
  }

  public predict(): PredictionResult {
    const { current, total, samples, sampleTimes, startTime } = this.progressData;

    if (samples.length < this.minSamplesForPrediction) {
      return {
        percentage: total > 0 ? (current / total) * 100 : 0,
        estimatedTimeLeft: 0,
        estimatedTotal: 0,
        confidence: 0
      };
    }

    const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
    
    // Calculate velocity using linear regression
    const velocity = this.calculateVelocity();
    const confidence = this.calculateConfidence();

    let estimatedTimeLeft = 0;
    let estimatedTotal = 0;

    if (velocity > 0 && total > 0) {
      const remaining = total - current;
      estimatedTimeLeft = remaining / velocity;
      estimatedTotal = (Date.now() - startTime) + estimatedTimeLeft;
    } else if (velocity > 0) {
      // Estimate total based on current progress and time
      const elapsed = Date.now() - startTime;
      const estimatedTotalProgress = current + (velocity * (elapsed / 1000));
      estimatedTotal = elapsed * (estimatedTotalProgress / current);
    }

    return {
      percentage: Math.round(percentage * 100) / 100,
      estimatedTimeLeft: Math.max(0, estimatedTimeLeft),
      estimatedTotal: Math.max(0, estimatedTotal),
      confidence: Math.round(confidence * 100) / 100
    };
  }

  private calculateVelocity(): number {
    const { samples, sampleTimes } = this.progressData;
    
    if (samples.length < 2) return 0;

    // Use linear regression to calculate velocity
    const n = samples.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    for (let i = 0; i < n; i++) {
      const x = (sampleTimes[i] - sampleTimes[0]) / 1000; // Convert to seconds
      const y = samples[i];
      
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return isNaN(slope) ? 0 : Math.max(0, slope);
  }

  private calculateConfidence(): number {
    const { samples } = this.progressData;
    
    if (samples.length < this.minSamplesForPrediction) return 0;

    // Calculate variance in velocity to determine confidence
    const velocities: number[] = [];
    
    for (let i = 1; i < samples.length; i++) {
      const timeDiff = (this.progressData.sampleTimes[i] - this.progressData.sampleTimes[i - 1]) / 1000;
      const valueDiff = samples[i] - samples[i - 1];
      
      if (timeDiff > 0) {
        velocities.push(valueDiff / timeDiff);
      }
    }

    if (velocities.length === 0) return 0;

    const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;
    const variance = velocities.reduce((acc, v) => acc + Math.pow(v - avgVelocity, 2), 0) / velocities.length;
    const standardDeviation = Math.sqrt(variance);

    // Higher confidence when velocity is more consistent
    const coefficientOfVariation = avgVelocity !== 0 ? standardDeviation / Math.abs(avgVelocity) : 1;
    const confidence = Math.max(0, 1 - Math.min(1, coefficientOfVariation));

    // Boost confidence with more samples
    const sampleBonus = Math.min(0.3, (samples.length - this.minSamplesForPrediction) * 0.05);
    
    return Math.min(1, confidence + sampleBonus);
  }

  public formatTimeEstimate(milliseconds: number): string {
    if (milliseconds < 1000) return '<1s';
    
    const seconds = Math.round(milliseconds / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m ${seconds % 60}s`;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  public reset(): void {
    this.progressData = {
      current: 0,
      total: 0,
      startTime: Date.now(),
      lastUpdate: Date.now(),
      samples: [],
      sampleTimes: []
    };
  }
}