# 🌀 Vortex Spinner

[![npm version](https://badge.fury.io/js/vortex-spinner.svg)](https://badge.fury.io/js/vortex-spinner)
[![Downloads](https://img.shields.io/npm/dm/vortex-spinner.svg)](https://npmjs.org/package/vortex-spinner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/devfaisee/Vortex)
[![npm](https://img.shields.io/badge/npm-Package-red.svg)](https://www.npmjs.com/package/vortex-spinner)

**The most advanced, beautiful, and developer-friendly spinner library for Node.js and browsers.**

Vortex Spinner revolutionizes loading indicators with **zero-setup built-in functions**, **12 stunning animations**, and **universal compatibility**. Works like native JavaScript functions - just import and use!

## ✨ Features

- 🚀 **Zero Setup** - Works like `console.log()`, no configuration needed
- 🎨 **12 Beautiful Animations** - Professional, smooth, artifact-free
- ⚡ **Lightning Fast** - Optimized performance, minimal overhead
- 🌍 **Universal Compatibility** - Node.js, browsers, React, Vue, Angular, CLI
- 📦 **Built-in Functions** - Multiple usage patterns for every need
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Smart Detection** - Auto-detects context and picks optimal animations
- 📱 **Responsive** - Adapts to terminal capabilities automatically
- 🔄 **Single Line** - Perfect rendering without frame artifacts
- 🛠️ **CLI Tool** - Command-line spinner utility included

## 🚀 Quick Start

### Installation

```bash
npm install vortex-spinner
```

### Basic Usage

```javascript
import { loading, success, error } from 'vortex-spinner';

// Instant messages (like console.log!)
success('✅ Package installed successfully!');
error('❌ Connection failed!');

// Simple loading
const loader = loading('Processing files...');
// ... do work ...
loader.success('Files processed!');
```

## 📖 Documentation

### Built-in Functions

#### Instant Messages
```javascript
import { success, error, warn, info } from 'vortex-spinner';

success('✅ Operation completed!');
error('❌ Something went wrong!');
warn('⚠️ Deprecated API detected!');
info('ℹ️ Using cached data!');
```

#### Simple Loading
```javascript
import { loading } from 'vortex-spinner';

const loader = loading('Downloading files...');
// ... async operation ...
loader.success('Download complete!');
// or
loader.error('Download failed!');
loader.warn('Partial download!');
loader.info('Using cache!');
```

#### Auto Loader (Handles Everything)
```javascript
import { loading } from 'vortex-spinner';

const result = await loading.auto('Fetching user data...', async () => {
  const response = await fetch('/api/users');
  return response.json();
});
// Automatically shows success/error based on promise result
```

#### Themed Loaders
```javascript
import { loaders } from 'vortex-spinner';

// Pre-configured for common tasks
const fileLoader = loaders.file('Reading configuration...');
const networkLoader = loaders.network('Connecting to API...');
const dbLoader = loaders.database('Querying records...');
const buildLoader = loaders.build('Compiling TypeScript...');
```

#### Quick Functions (One-liners)
```javascript
import { quick } from 'vortex-spinner';

// Quick API call
await quick.api(async () => {
  return await fetchData();
}, 'Loading data...');

// Quick file processing
await quick.file(async () => {
  return await processFiles();
}, 'Processing files...');

// Quick database operation
await quick.db(async () => {
  return await saveData();
}, 'Saving data...');
```

#### Smart Loader (Context Aware)
```javascript
import { smart } from 'vortex-spinner';

// Automatically picks the right animation based on context
const loader1 = smart('file', 'Processing files...');
const loader2 = smart('api', 'Calling API...');
const loader3 = smart('build', 'Building project...');
```

#### Magic Loader (Auto-Detection)
```javascript
import { magic } from 'vortex-spinner';

// Automatically detects what you're doing from the text!
magic('Building React application...');  // Uses build animation
magic('Fetching from GraphQL API...');   // Uses network animation
magic('Processing user files...');       // Uses file animation
```

### Advanced Usage

#### Custom Spinner
```javascript
import { Vortex } from 'vortex-spinner';

const spinner = new Vortex({
  text: 'Custom loading...',
  spinner: 'vortex',
  color: 'cyan'
});

spinner.start();
spinner.setText('Updated text...');
spinner.succeed('Done!');
```

#### Progress Tracking
```javascript
const loader = loading('Processing items...');

for (let i = 0; i <= 100; i += 10) {
  loader.setProgress(i);
  loader.setText(`Processing... ${i}%`);
  await new Promise(resolve => setTimeout(resolve, 100));
}

loader.success('All items processed!');
```

## 🎨 Available Animations

| Animation | Description | Best For |
|-----------|-------------|----------|
| `vortex` | Swirling vortex effect | General loading |
| `wave` | Smooth wave motion | Data processing |
| `pulse` | Pulsing circles | Heartbeat/sync operations |
| `matrix` | Matrix-style rain | Code compilation |
| `dna` | DNA helix rotation | Biological/scientific |
| `plasma` | Plasma energy effect | High-energy operations |
| `galaxy` | Spinning galaxy | Space/cosmic themes |
| `quantum` | Quantum particle effect | Advanced computing |
| `neural` | Neural network pattern | AI/ML operations |
| `fusion` | Energy fusion effect | Merging/combining |
| `hologram` | Holographic projection | Futuristic interfaces |
| `cipher` | Encryption pattern | Security operations |

## 🌍 Framework Examples

### React
```jsx
import { loading, quick } from 'vortex-spinner';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    quick.api(async () => {
      const userData = await fetchUser(userId);
      setUser(userData);
      return userData;
    }, 'Loading user profile...');
  }, [userId]);
  
  return <div>{user?.name}</div>;
}
```

### Express.js
```javascript
import { loaders } from 'vortex-spinner';

app.post('/api/users', async (req, res) => {
  const loader = loaders.api('Creating user account...');
  
  try {
    const user = await createUser(req.body);
    loader.success('User created successfully!');
    res.json(user);
  } catch (error) {
    loader.error('Failed to create user!');
    res.status(500).json({ error: error.message });
  }
});
```

### Vue.js
```vue
<script setup>
import { magic, loading } from 'vortex-spinner';

const loadData = async () => {
  const loader = magic('Loading dashboard data...');
  try {
    const data = await fetchDashboardData();
    loader.success('Dashboard loaded!');
    return data;
  } catch (error) {
    loader.error('Failed to load dashboard!');
  }
};
</script>
```

### CLI Tools
```javascript
#!/usr/bin/env node
import { loaders, magic } from 'vortex-spinner';

async function buildProject() {
  const buildLoader = loaders.build('Installing dependencies...');
  await installDeps();
  
  buildLoader.update('Compiling TypeScript...');
  await compileTS();
  
  buildLoader.update('Bundling assets...');
  await bundleAssets();
  
  buildLoader.success('Build completed successfully!');
}
```

## 🔧 CLI Tool

Vortex Spinner includes a command-line tool:

```bash
# Install globally
npm install -g vortex-spinner

# Use in terminal
vortex "Processing files..." --spinner matrix --color cyan
vortex "Building project..." --spinner build --timeout 5000
```

## 📚 API Reference

### Core Functions

#### `loading(text: string, options?: LoaderOptions): LoaderController`
Creates a simple loader with the specified text.

#### `success(text: string): void`
Displays an instant success message.

#### `error(text: string): void`
Displays an instant error message.

#### `warn(text: string): void`
Displays an instant warning message.

#### `info(text: string): void`
Displays an instant info message.

### Advanced Functions

#### `loading.auto(text: string, asyncFn: () => Promise<T>): Promise<T>`
Automatically handles loading state for async operations.

#### `loaders.file(text: string): LoaderController`
Pre-configured loader for file operations.

#### `loaders.network(text: string): LoaderController`
Pre-configured loader for network operations.

#### `loaders.database(text: string): LoaderController`
Pre-configured loader for database operations.

#### `loaders.build(text: string): LoaderController`
Pre-configured loader for build operations.

#### `quick.api(asyncFn: () => Promise<T>, text?: string): Promise<T>`
One-liner for API calls.

#### `quick.file(asyncFn: () => Promise<T>, text?: string): Promise<T>`
One-liner for file operations.

#### `quick.db(asyncFn: () => Promise<T>, text?: string): Promise<T>`
One-liner for database operations.

#### `smart(context: string, text: string): LoaderController`
Context-aware loader that picks optimal animation.

#### `magic(text: string): LoaderController`
Auto-detects context from text and picks optimal animation.

### LoaderController Methods

```typescript
interface LoaderController {
  update(text: string): void;
  setProgress(percentage: number): void;
  success(text?: string): void;
  error(text?: string): void;
  warn(text?: string): void;
  info(text?: string): void;
  stop(): void;
}
```

## 🎯 Why Choose Vortex Spinner?

### vs. ora
```javascript
// ora - requires setup
const ora = require('ora');
const spinner = ora('Loading...').start();
spinner.succeed('Done!');

// Vortex - zero setup
import { loading } from 'vortex-spinner';
const loader = loading('Loading...');
loader.success('Done!');
```

### vs. cli-spinners
```javascript
// cli-spinners - manual configuration
const { Spinner } = require('cli-spinner');
const spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();

// Vortex - built-in functions
import { success } from 'vortex-spinner';
success('Processing complete!');
```

## 🚀 Performance

- **Startup Time**: < 1ms
- **Memory Usage**: < 2MB
- **Bundle Size**: 30.8 kB
- **Animation FPS**: 60 FPS
- **Zero Frame Artifacts**: Perfect single-line rendering

## 🔗 Links

- **npm Package**: https://www.npmjs.com/package/vortex-spinner
- **GitHub Repository**: https://github.com/devfaisee/Vortex
- **Documentation**: https://github.com/devfaisee/Vortex#readme
- **Issues**: https://github.com/devfaisee/Vortex/issues
- **Changelog**: https://github.com/devfaisee/Vortex/releases

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for better developer experience
- Built with TypeScript for type safety
- Optimized for modern JavaScript environments

---

**Made with ❤️ for developers who deserve beautiful loading indicators without the hassle.**

*Transform your loading experience today - because every developer deserves god-tier spinners! 🌀*