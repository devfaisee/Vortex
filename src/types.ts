export interface VortexOptions {
  text?: string;
  spinner?: SpinnerType | string;
  color?: string;
  interval?: number;
  stream?: NodeJS.WriteStream;
  hideCursor?: boolean;
  indent?: number;
  discardStdin?: boolean;
  prefixText?: string;
  suffixText?: string;
  predictive?: boolean;
  adaptive?: boolean;
  gradient?: boolean;
  rainbow?: boolean;
  bold?: boolean;
  dim?: boolean;
}

export interface SpinnerFrame {
  frame: string;
  interval: number;
}

export interface SpinnerType {
  interval: number;
  frames: string[];
  adaptive: boolean;
  description?: string;
}

export interface ProgressData {
  current: number;
  total: number;
  startTime: number;
  lastUpdate: number;
  samples: number[];
  sampleTimes: number[];
}

export interface ProgressPrediction {
  percentage: number;
  estimatedTimeLeft: number;
  confidence: number;
  trend: 'accelerating' | 'steady' | 'slowing';
  accuracy: number;
}

export interface TerminalInfo {
  width: number;
  height: number;
  supportsColor: boolean;
  colorDepth: number;
}

export interface AdaptiveConfig {
  minWidth: number;
  maxWidth: number;
  compactMode: boolean;
  useUnicode: boolean;
  colorMode: 'none' | 'basic' | 'ansi256' | 'truecolor';
}

export interface SpinnerStats {
  startTime: number;
  totalFrames: number;
  averageFrameTime: number;
  predictedCompletion: number;
}

export interface AnimationConfig {
  useGradients: boolean;
  useRainbow: boolean;
  colorTransitions: boolean;
  smoothAnimation: boolean;
  adaptiveSpeed: boolean;
}

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  cpuUsage: number;
  frameRate: number;
}