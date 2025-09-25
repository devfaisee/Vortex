# 🌪️ Vortex - Next-Level CLI Spinner

[![npm version](https://badge.fury.io/js/vortex-spinner.svg)](https://badge.fury.io/js/vortex-spinner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Vortex** is the ultimate CLI spinner that adapts to your terminal, predicts progress, and delivers stunning visuals. Say goodbye to boring spinners!

## ✨ Features

- 🎨 **Adaptive Rendering** - Automatically adjusts to terminal size and capabilities
- 🔮 **Progress Prediction** - Shows estimated time remaining with confidence levels
- 🌈 **Smart Color Detection** - Supports basic colors to true color (24-bit)
- 🎭 **Multiple Animations** - 10+ beautiful spinner styles
- 📱 **Responsive Design** - Works perfectly on any terminal size
- ⚡ **High Performance** - Optimized for minimal CPU usage
- 🛠️ **TypeScript Ready** - Full type definitions included

## 🚀 Quick Start

```bash
npm install vortex-spinner
```

```javascript
import { Vortex } from 'vortex-spinner';

const spinner = new Vortex({ text: 'Loading awesome content...' });
spinner.start();

// Simulate some work
setTimeout(() => {
  spinner.succeed('Content loaded successfully!');
}, 3000);
```

## 🎯 Real-World Example

```javascript
import { Vortex } from 'vortex-spinner';

// NPM install simulation with progress prediction
const spinner = new Vortex({
  text: 'Installing packages...',
  predictive: true,
  adaptive: true
});

spinner.start();

// Update progress as packages install
for (let i = 0; i <= 100; i += 10) {
  spinner.updateProgress(i, 100);
  await new Promise(resolve => setTimeout(resolve, 500));
}

spinner.succeed('All packages installed! 🎉');
// Output: ✓ All packages installed! 🎉 (95% done, ~3s left)
```

## 🎨 Available Spinners

| Name | Preview | Description |
|------|---------|-------------|
| `vortex` | ◐ ◓ ◑ ◒ | Classic rotating spinner (default) |
| `wave` | ▁▂▃▄▅▆▇█ | Animated wave pattern |
| `pulse` | ⠋⠙⠹⠸⠼⠴⠦⠧ | Pulsing dots |
| `geometric` | ◢◣◤◥ | Modern geometric shapes |
| `matrix` | ⠀⠁⠃⠇⠏⠟ | Matrix-style animation |
| `dna` | ⠁⠂⠄⡀⢀⠠ | DNA helix pattern |
| `arrow` | ←↖↑↗→↘↓↙ | Rotating arrow |
| `breathe` | ○◔◑◕●◕◑◔ | Breathing circle |

## 📖 API Reference

### Constructor Options

```typescript
interface VortexOptions {
  text?: string;           // Spinner text
  spinner?: SpinnerType;   // Spinner animation
  color?: string;          // Spinner color
  interval?: number;       // Animation interval (ms)
  predictive?: boolean;    // Enable progress prediction
  adaptive?: boolean;      // Enable adaptive rendering
  prefixText?: string;     // Text before spinner
  suffixText?: string;     // Text after spinner
  indent?: number;         // Indentation level
}
```

### Methods

```typescript
// Basic controls
spinner.start(text?: string)     // Start spinning
spinner.stop()                   // Stop spinning
spinner.setText(text: string)    // Update text

// Status indicators
spinner.succeed(text?: string)   // Show success ✓
spinner.fail(text?: string)      // Show failure ✗
spinner.warn(text?: string)      // Show warning ⚠
spinner.info(text?: string)      // Show info ℹ

// Progress tracking
spinner.updateProgress(current: number, total?: number)

// Customization
spinner.setSpinner(name: string | SpinnerType)
spinner.setColor(color: string)
```

## 🎭 Advanced Usage

### Custom Spinner

```javascript
import { Vortex, createCustomSpinner } from 'vortex-spinner';

const customSpinner = createCustomSpinner(['🌍', '🌎', '🌏'], 200);
const spinner = new Vortex({ 
  text: 'Spinning around the world...',
  spinner: customSpinner 
});
```

### Progress Prediction

```javascript
const spinner = new Vortex({ 
  text: 'Processing files...',
  predictive: true 
});

spinner.start();

// As you process items, update progress
files.forEach((file, index) => {
  spinner.updateProgress(index + 1, files.length);
  processFile(file);
});

spinner.succeed('All files processed!');
```

### Adaptive Theming

```javascript
// Vortex automatically detects terminal capabilities
const spinner = new Vortex({ 
  text: 'Adapting to your terminal...',
  adaptive: true  // Adjusts colors, unicode, and layout
});
```

## 🎪 CLI Usage

Install globally for CLI access:

```bash
npm install -g vortex-spinner
```

```bash
# Basic usage
vortex "Loading data..."

# With options
vortex -s wave -c blue "Processing files..."

# With progress prediction
vortex -p -t 10 "Installing packages..."

# Run demo
vortex --demo

# List available spinners
vortex --list
```

## 🎯 Why Vortex?

### Before (boring spinners)
```
⠋ Loading...
```

### After (Vortex magic)
```
🌪️ ◐ Installing packages... (87%, ~2s left)
```

## 🔧 Terminal Compatibility

- ✅ **Windows Terminal** - Full support with true color
- ✅ **macOS Terminal** - Full support with true color  
- ✅ **Linux Terminals** - Full support (GNOME, KDE, etc.)
- ✅ **VS Code Terminal** - Full support
- ✅ **iTerm2** - Full support with enhanced features
- ✅ **Hyper** - Full support
- ⚠️ **CMD** - Basic support (limited colors)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Your Name](https://github.com/devfaisee)

## 🙏 Acknowledgments

- Inspired by [ora](https://github.com/sindresorhus/ora) and [cli-spinners](https://github.com/sindresorhus/cli-spinners)
- Built with ❤️ for the developer community

---

**Made with 🌪️ by developers, for developers**