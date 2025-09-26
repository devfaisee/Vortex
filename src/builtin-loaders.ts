/**
 * 🚀 BUILT-IN LOADER FUNCTIONS - ZERO SETUP REQUIRED!
 * 
 * These functions work like native JavaScript - just import and use!
 * No configuration, no instances, no setup - pure simplicity.
 */

import { Vortex } from './vortex.js';

// Global spinner instance for built-in functions
let globalSpinner: Vortex | null = null;

/**
 * 🔄 LOADING - Start a loading animation instantly
 * 
 * @example
 * const stop = loading('Processing...');
 * // Your work here...
 * stop.success('Done!');
 */
export function loading(text: string = 'Loading...', animation: string = 'vortex'): LoaderController {
  // Stop any existing spinner
  if (globalSpinner?.spinning) {
    globalSpinner.stop();
  }

  // Create and start new spinner
  globalSpinner = new Vortex({
    text,
    spinner: animation,
    color: 'cyan',
    predictive: false, // Clean output, no bulky bars!
    adaptive: true
  });

  globalSpinner.start();

  // Return controller functions
  return {
    success: (message?: string) => {
      if (globalSpinner) {
        globalSpinner.succeed(message || text);
        globalSpinner = null;
      }
    },
    error: (message?: string) => {
      if (globalSpinner) {
        globalSpinner.fail(message || text);
        globalSpinner = null;
      }
    },
    warn: (message?: string) => {
      if (globalSpinner) {
        globalSpinner.warn(message || text);
        globalSpinner = null;
      }
    },
    info: (message?: string) => {
      if (globalSpinner) {
        globalSpinner.info(message || text);
        globalSpinner = null;
      }
    },
    stop: () => {
      if (globalSpinner) {
        globalSpinner.stop();
        globalSpinner = null;
      }
    },
    update: (newText: string) => {
      if (globalSpinner) {
        globalSpinner.setText(newText);
      }
    }
  };
}

/**
 * ✅ SUCCESS - Show success message instantly
 */
export function success(message: string = 'Success!'): void {
  const spinner = new Vortex({ text: message, predictive: false });
  spinner.succeed(message);
}

/**
 * ❌ ERROR - Show error message instantly
 */
export function error(message: string = 'Error!'): void {
  const spinner = new Vortex({ text: message, predictive: false });
  spinner.fail(message);
}

/**
 * ⚠️ WARN - Show warning message instantly
 */
export function warn(message: string = 'Warning!'): void {
  const spinner = new Vortex({ text: message, predictive: false });
  spinner.warn(message);
}

/**
 * ℹ️ INFO - Show info message instantly
 */
export function info(message: string = 'Info!'): void {
  const spinner = new Vortex({ text: message, predictive: false });
  spinner.info(message);
}

/**
 * 🤖 AUTO LOADER - Automatically handles async operations
 * 
 * @example
 * const result = await loading.auto('Fetching data...', async () => {
 *   return await fetch('/api/data');
 * });
 */
loading.auto = async function<T>(
  text: string,
  asyncOperation: () => Promise<T>,
  animation: string = 'vortex'
): Promise<T> {
  const controller = loading(text, animation);
  
  try {
    const result = await asyncOperation();
    controller.success(`${text} - Complete!`);
    return result;
  } catch (err) {
    controller.error(`${text} - Failed!`);
    throw err;
  }
};

/**
 * 🎨 THEMED LOADERS - Pre-configured for common use cases
 */
export const loaders = {
  // File operations
  file: (text: string = 'Processing files...') => loading(text, 'matrix'),
  
  // Network operations
  network: (text: string = 'Connecting...') => loading(text, 'wave'),
  
  // Database operations
  database: (text: string = 'Querying database...') => loading(text, 'neural'),
  
  // Build operations
  build: (text: string = 'Building project...') => loading(text, 'fusion'),
  
  // Security operations
  security: (text: string = 'Encrypting...') => loading(text, 'cipher'),
  
  // AI/ML operations
  ai: (text: string = 'Processing AI...') => loading(text, 'quantum'),
  
  // Data processing
  data: (text: string = 'Processing data...') => loading(text, 'pulse'),
  
  // Cloud operations
  cloud: (text: string = 'Deploying to cloud...') => loading(text, 'galaxy'),
  
  // Generic processing
  process: (text: string = 'Processing...') => loading(text, 'vortex'),
  
  // DNA/Bio operations
  bio: (text: string = 'Analyzing...') => loading(text, 'dna'),
  
  // Energy/Power operations
  energy: (text: string = 'Powering up...') => loading(text, 'plasma'),
  
  // 3D/Graphics operations
  graphics: (text: string = 'Rendering...') => loading(text, 'hologram')
};

/**
 * 🚀 QUICK FUNCTIONS - One-liner solutions
 */
export const quick = {
  // Quick async wrapper
  async: async <T>(operation: () => Promise<T>, text?: string): Promise<T> => {
    return loading.auto(text || 'Processing...', operation);
  },
  
  // Quick file processing
  file: async <T>(operation: () => Promise<T>, text?: string): Promise<T> => {
    return loading.auto(text || 'Processing files...', operation, 'matrix');
  },
  
  // Quick API call
  api: async <T>(operation: () => Promise<T>, text?: string): Promise<T> => {
    return loading.auto(text || 'Fetching data...', operation, 'wave');
  },
  
  // Quick database operation
  db: async <T>(operation: () => Promise<T>, text?: string): Promise<T> => {
    return loading.auto(text || 'Database operation...', operation, 'neural');
  },
  
  // Quick build operation
  build: async <T>(operation: () => Promise<T>, text?: string): Promise<T> => {
    return loading.auto(text || 'Building...', operation, 'fusion');
  }
};

/**
 * 🎯 SMART LOADERS - Context-aware animations
 */
export function smartLoader(context: string, text?: string): LoaderController {
  const contextMap: Record<string, string> = {
    'file': 'matrix',
    'network': 'wave', 
    'api': 'wave',
    'database': 'neural',
    'db': 'neural',
    'build': 'fusion',
    'compile': 'fusion',
    'security': 'cipher',
    'encrypt': 'cipher',
    'ai': 'quantum',
    'ml': 'quantum',
    'data': 'pulse',
    'cloud': 'galaxy',
    'deploy': 'galaxy',
    'bio': 'dna',
    'graphics': 'hologram',
    'render': 'hologram',
    'energy': 'plasma',
    'power': 'plasma'
  };
  
  const animation = contextMap[context.toLowerCase()] || 'vortex';
  return loading(text || `${context} operation...`, animation);
}

/**
 * Controller interface for loader functions
 */
export interface LoaderController {
  success: (message?: string) => void;
  error: (message?: string) => void;
  warn: (message?: string) => void;
  info: (message?: string) => void;
  stop: () => void;
  update: (text: string) => void;
}

/**
 * 🌟 MAGIC LOADER - Automatically detects what you're doing
 */
export function magic(text: string): LoaderController {
  // Auto-detect context from text
  const lowerText = text.toLowerCase();
  
  let animation = 'vortex'; // default
  
  if (lowerText.includes('file') || lowerText.includes('read') || lowerText.includes('write')) {
    animation = 'matrix';
  } else if (lowerText.includes('fetch') || lowerText.includes('api') || lowerText.includes('network')) {
    animation = 'wave';
  } else if (lowerText.includes('database') || lowerText.includes('query') || lowerText.includes('sql')) {
    animation = 'neural';
  } else if (lowerText.includes('build') || lowerText.includes('compile') || lowerText.includes('bundle')) {
    animation = 'fusion';
  } else if (lowerText.includes('encrypt') || lowerText.includes('security') || lowerText.includes('auth')) {
    animation = 'cipher';
  } else if (lowerText.includes('ai') || lowerText.includes('ml') || lowerText.includes('model')) {
    animation = 'quantum';
  } else if (lowerText.includes('deploy') || lowerText.includes('cloud') || lowerText.includes('server')) {
    animation = 'galaxy';
  } else if (lowerText.includes('render') || lowerText.includes('graphics') || lowerText.includes('3d')) {
    animation = 'hologram';
  }
  
  return loading(text, animation);
}

// Export everything for easy access
export default {
  loading,
  success,
  error,
  warn,
  info,
  loaders,
  quick,
  smart: smartLoader,
  magic
};