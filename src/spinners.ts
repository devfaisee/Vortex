import { SpinnerType } from './types.js';

/**
 * Professional spinner collection with industry-leading animations
 */
export const spinners: Record<string, SpinnerType> = {
  // === VORTEX - Quantum Energy Field ===
  vortex: {
    interval: 120,
    frames: [
      '◐◑◒◓',
      '◓◐◑◒', 
      '◒◓◐◑',
      '◑◒◓◐',
      '◐◑◒◓',
      '◓◐◑◒',
      '◒◓◐◑',
      '◑◒◓◐'
    ],
    adaptive: true,
    description: 'Quantum energy vortex field'
  },

  // === WAVE - Electromagnetic Pulse ===
  wave: {
    interval: 100,
    frames: [
      '▁▂▃▄▅▆▇█',
      '▂▃▄▅▆▇█▁',
      '▃▄▅▆▇█▁▂',
      '▄▅▆▇█▁▂▃',
      '▅▆▇█▁▂▃▄',
      '▆▇█▁▂▃▄▅',
      '▇█▁▂▃▄▅▆',
      '█▁▂▃▄▅▆▇'
    ],
    adaptive: true,
    description: 'Electromagnetic wave propagation'
  },

  // === PULSE - Neural Network Activity ===
  pulse: {
    interval: 150,
    frames: [
      '●○○○○○○○',
      '○●○○○○○○',
      '○○●○○○○○',
      '○○○●○○○○',
      '○○○○●○○○',
      '○○○○○●○○',
      '○○○○○○●○',
      '○○○○○○○●',
      '○○○○○○●○',
      '○○○○○●○○',
      '○○○○●○○○',
      '○○○●○○○○',
      '○○●○○○○○',
      '○●○○○○○○'
    ],
    adaptive: true,
    description: 'Neural network pulse transmission'
  },

  // === MATRIX - Digital Rain ===
  matrix: {
    interval: 80,
    frames: [
      '█▓▒░    ',
      ' █▓▒░   ',
      '  █▓▒░  ',
      '   █▓▒░ ',
      '    █▓▒░',
      '     █▓▒',
      '      █▓',
      '       █',
      '        ',
      '█       ',
      '██      ',
      '█▓█     ',
      '█▓▒█    '
    ],
    adaptive: true,
    description: 'Digital matrix cascade'
  },

  // === DNA - Genetic Helix ===
  dna: {
    interval: 200,
    frames: [
      '╭─╮ ╭─╮',
      '│ ╰─╯ │',
      '╰─╮ ╭─╯',
      '  ╰─╯  ',
      '  ╭─╮  ',
      '╭─╯ ╰─╮',
      '│ ╭─╮ │',
      '╰─╯ ╰─╯'
    ],
    adaptive: true,
    description: 'DNA double helix structure'
  },

  // === PLASMA - Energy Field ===
  plasma: {
    interval: 90,
    frames: [
      '⚡▲⚡▼⚡',
      '▼⚡▲⚡▼',
      '⚡▼⚡▲⚡',
      '▲⚡▼⚡▲',
      '⚡▲⚡▼⚡',
      '▼⚡▲⚡▼',
      '⚡▼⚡▲⚡',
      '▲⚡▼⚡▲'
    ],
    adaptive: true,
    description: 'High-energy plasma field'
  },

  // === GALAXY - Cosmic Rotation ===
  galaxy: {
    interval: 250,
    frames: [
      '    ✦    ',
      '   ✦✧✦   ',
      '  ✦✧★✧✦  ',
      ' ✦✧★✦★✧✦ ',
      '✦✧★✦✧✦★✧✦',
      ' ✧★✦✧✦★✧ ',
      '  ★✦✧✦✧  ',
      '   ✦✧✦   ',
      '    ✦    '
    ],
    adaptive: true,
    description: 'Galactic spiral formation'
  },

  // === QUANTUM - Particle Physics ===
  quantum: {
    interval: 100,
    frames: [
      '◯ ◯ ◯ ◯',
      '◉ ◯ ◯ ◯',
      '◯ ◉ ◯ ◯',
      '◯ ◯ ◉ ◯',
      '◯ ◯ ◯ ◉',
      '◯ ◯ ◉ ◯',
      '◯ ◉ ◯ ◯',
      '◉ ◯ ◯ ◯'
    ],
    adaptive: true,
    description: 'Quantum particle entanglement'
  },

  // === NEURAL - Brain Activity ===
  neural: {
    interval: 180,
    frames: [
      '⟨⟨⟨⟨⟨⟨⟨⟨',
      '⟩⟨⟨⟨⟨⟨⟨⟨',
      '⟩⟩⟨⟨⟨⟨⟨⟨',
      '⟩⟩⟩⟨⟨⟨⟨⟨',
      '⟩⟩⟩⟩⟨⟨⟨⟨',
      '⟩⟩⟩⟩⟩⟨⟨⟨',
      '⟩⟩⟩⟩⟩⟩⟨⟨',
      '⟩⟩⟩⟩⟩⟩⟩⟨',
      '⟩⟩⟩⟩⟩⟩⟩⟩'
    ],
    adaptive: true,
    description: 'Neural network processing'
  },

  // === FUSION - Nuclear Reaction ===
  fusion: {
    interval: 130,
    frames: [
      '◦ ◦ ◦ ◦',
      '◦ ● ◦ ◦',
      '● ◦ ● ◦',
      '◦ ● ◦ ●',
      '● ◦ ● ◦',
      '◦ ● ◦ ◦',
      '◦ ◦ ◦ ◦',
      '◦ ◦ ● ◦',
      '◦ ● ◦ ●',
      '● ◦ ● ◦'
    ],
    adaptive: true,
    description: 'Nuclear fusion reaction'
  },

  // === HOLOGRAM - 3D Projection ===
  hologram: {
    interval: 160,
    frames: [
      '▱▱▱▱▱▱▱▱',
      '▰▱▱▱▱▱▱▱',
      '▰▰▱▱▱▱▱▱',
      '▰▰▰▱▱▱▱▱',
      '▰▰▰▰▱▱▱▱',
      '▰▰▰▰▰▱▱▱',
      '▰▰▰▰▰▰▱▱',
      '▰▰▰▰▰▰▰▱',
      '▰▰▰▰▰▰▰▰',
      '▱▰▰▰▰▰▰▰',
      '▱▱▰▰▰▰▰▰',
      '▱▱▱▰▰▰▰▰',
      '▱▱▱▱▰▰▰▰',
      '▱▱▱▱▱▰▰▰',
      '▱▱▱▱▱▱▰▰',
      '▱▱▱▱▱▱▱▰'
    ],
    adaptive: true,
    description: 'Holographic projection matrix'
  },

  // === CIPHER - Encryption Process ===
  cipher: {
    interval: 110,
    frames: [
      '🔒🔐🔑🗝️',
      '🔐🔑🗝️🔒',
      '🔑🗝️🔒🔐',
      '🗝️🔒🔐🔑',
      '🔒🔐🔑🗝️',
      '🔐🔑🗝️🔒',
      '🔑🗝️🔒🔐',
      '🗝️🔒🔐🔑'
    ],
    adaptive: true,
    description: 'Advanced encryption cipher'
  }
};

/**
 * Get adaptive spinner based on terminal capabilities
 */
export function getAdaptiveSpinner(terminalWidth: number, useUnicode: boolean, supportsEmoji: boolean = false): SpinnerType {
  // Ultra compact mode
  if (terminalWidth < 30) {
    return {
      interval: 120,
      frames: ['|', '/', '-', '\\'],
      adaptive: false,
      description: 'Compact ASCII spinner'
    };
  }
  
  // No Unicode support
  if (!useUnicode) {
    return {
      interval: 120,
      frames: ['|', '/', '-', '\\'],
      adaptive: false,
      description: 'ASCII spinner'
    };
  }

  // Compact mode
  if (terminalWidth < 60) {
    return spinners.pulse;
  }

  // Full featured mode with emoji support
  if (supportsEmoji && terminalWidth > 80) {
    return spinners.cipher;
  }

  // Standard Unicode mode
  return spinners.vortex;
}

/**
 * Get spinner by category
 */
export function getSpinnersByCategory(category: string): Record<string, SpinnerType> {
  const categories: Record<string, string[]> = {
    energy: ['vortex', 'plasma', 'fusion'],
    science: ['wave', 'quantum', 'neural'],
    tech: ['matrix', 'hologram', 'cipher'],
    cosmic: ['galaxy', 'pulse'],
    bio: ['dna', 'neural']
  };

  const spinnerNames = categories[category] || [];
  const result: Record<string, SpinnerType> = {};
  
  for (const name of spinnerNames) {
    if (spinners[name]) {
      result[name] = spinners[name];
    }
  }
  
  return result;
}

/**
 * Create custom spinner with validation
 */
export function createCustomSpinner(frames: string[], interval: number = 100, adaptive: boolean = true): SpinnerType {
  if (!frames || frames.length === 0) {
    throw new Error('Spinner frames cannot be empty');
  }
  
  if (interval < 50 || interval > 2000) {
    throw new Error('Spinner interval must be between 50ms and 2000ms');
  }
  
  return {
    interval,
    frames: [...frames],
    adaptive,
    description: 'Custom spinner'
  };
}

/**
 * Get random spinner
 */
export function getRandomSpinner(): SpinnerType {
  const spinnerNames = Object.keys(spinners);
  const randomName = spinnerNames[Math.floor(Math.random() * spinnerNames.length)];
  return spinners[randomName];
}

/**
 * List all available spinners with descriptions
 */
export function listSpinners(): Array<{ name: string; description: string; preview: string }> {
  return Object.entries(spinners).map(([name, spinner]) => ({
    name,
    description: spinner.description || 'No description',
    preview: spinner.frames.slice(0, 2).join(' → ')
  }));
}