export interface VortexOptions {
  text?: string;
  spinner?: SpinnerType;
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
}

export interface SpinnerFrame {
  frame: string;
  interval: number;
}

export interface SpinnerType {
  interval: number;
  frames: string[];
  adaptive?: boolean;
}

export interface ProgressData {
  current: number;
  total: number;
  startTime: number;
  lastUpdate: number;
  samples: number[];
  sampleTimes: number[];
}

export interface PredictionResult {
  percentage: number;
  estimatedTimeLeft: number;
  estimatedTotal: number;
  confidence: number;
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