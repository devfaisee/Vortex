export { Vortex } from './vortex.js';
export { spinners, getAdaptiveSpinner, createCustomSpinner } from './spinners.js';
export { TerminalDetector } from './terminal.js';
export { ProgressPredictor } from './predictor.js';
export * from './types.js';

// 🚀 BUILT-IN LOADER FUNCTIONS - ZERO SETUP REQUIRED!
export { 
  loading, 
  success, 
  error, 
  warn, 
  info, 
  loaders, 
  quick, 
  smartLoader as smart,
  magic,
  type LoaderController 
} from './builtin-loaders.js';

// Import for default export
import { Vortex } from './vortex.js';
import builtin from './builtin-loaders.js';

// Default export for convenience
export default Vortex;

// Built-in loaders as secondary export
export { builtin };