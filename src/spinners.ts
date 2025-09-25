import { SpinnerType } from './types.js';

export const spinners: Record<string, SpinnerType> = {
  // Classic enhanced spinners
  vortex: {
    interval: 80,
    frames: ['◐', '◓', '◑', '◒'],
    adaptive: true
  },

  // Adaptive wave spinner
  wave: {
    interval: 100,
    frames: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂'],
    adaptive: true
  },

  // Pulsing dots
  pulse: {
    interval: 120,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    adaptive: true
  },

  // Modern geometric
  geometric: {
    interval: 90,
    frames: ['◢', '◣', '◤', '◥'],
    adaptive: true
  },

  // Bouncing ball
  bounce: {
    interval: 150,
    frames: ['⠁', '⠂', '⠄', '⠂'],
    adaptive: true
  },

  // Matrix-style
  matrix: {
    interval: 100,
    frames: ['⠀', '⠁', '⠃', '⠇', '⠏', '⠟', '⠿', '⡿', '⣿', '⣾', '⣼', '⣸', '⢸', '⠸', '⠘', '⠈'],
    adaptive: true
  },

  // Elegant arrow
  arrow: {
    interval: 120,
    frames: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
    adaptive: true
  },

  // Breathing circle
  breathe: {
    interval: 200,
    frames: ['○', '◔', '◑', '◕', '●', '◕', '◑', '◔'],
    adaptive: true
  },

  // DNA helix
  dna: {
    interval: 100,
    frames: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
    adaptive: true
  },

  // Plasma effect
  plasma: {
    interval: 80,
    frames: ['▖', '▘', '▝', '▗'],
    adaptive: true
  },

  // Compact for small terminals
  compact: {
    interval: 100,
    frames: ['-', '\\', '|', '/'],
    adaptive: false
  },

  // Simple dots for basic terminals
  dots: {
    interval: 400,
    frames: ['.  ', '.. ', '...', '   '],
    adaptive: false
  }
};

export function getAdaptiveSpinner(terminalWidth: number, useUnicode: boolean): SpinnerType {
  if (terminalWidth < 30) {
    return spinners.compact;
  }
  
  if (!useUnicode) {
    return spinners.dots;
  }

  if (terminalWidth < 60) {
    return spinners.pulse;
  }

  return spinners.vortex;
}

export function createCustomSpinner(frames: string[], interval: number = 100): SpinnerType {
  return {
    interval,
    frames,
    adaptive: true
  };
}