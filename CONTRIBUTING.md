# 🤝 Contributing to Vortex Spinner

Thank you for your interest in contributing to Vortex Spinner! We welcome contributions from developers of all skill levels.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to help us maintain a welcoming community.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git
- TypeScript knowledge (preferred)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/yourusername/vortex-spinner.git
cd vortex-spinner
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/originalowner/vortex-spinner.git
```

## 🛠️ Development Setup

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Run tests:

```bash
npm test
```

4. Start development mode:

```bash
npm run dev
```

## 📝 Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

- **Bug fixes** - Fix issues in existing code
- **New features** - Add new spinner animations or functionality
- **Documentation** - Improve docs, examples, or comments
- **Performance** - Optimize existing code
- **Tests** - Add or improve test coverage
- **Examples** - Create usage examples for different frameworks

### Before You Start

1. **Check existing issues** - Look for existing issues or discussions
2. **Create an issue** - For new features or significant changes
3. **Discuss first** - For major changes, discuss in an issue first
4. **Small PRs** - Keep pull requests focused and small when possible

## 🔄 Pull Request Process

### 1. Create a Branch

Create a descriptive branch name:

```bash
git checkout -b feature/add-new-spinner
git checkout -b fix/animation-glitch
git checkout -b docs/improve-readme
```

### 2. Make Changes

- Follow our [coding standards](#coding-standards)
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Commit Changes

Use conventional commit messages:

```bash
git commit -m "feat: add quantum spinner animation"
git commit -m "fix: resolve animation frame drops"
git commit -m "docs: update API documentation"
```

**Commit Types:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

### 4. Push and Create PR

```bash
git push origin your-branch-name
```

Then create a pull request on GitHub with:

- **Clear title** - Descriptive and concise
- **Detailed description** - What changes were made and why
- **Issue reference** - Link to related issues
- **Screenshots** - For visual changes (if applicable)
- **Testing notes** - How to test the changes

### 5. PR Review Process

- **Automated checks** - Ensure all CI checks pass
- **Code review** - Address feedback from maintainers
- **Testing** - Verify changes work as expected
- **Documentation** - Update docs if needed

## 🐛 Issue Guidelines

### Bug Reports

When reporting bugs, please include:

```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., Windows 10, macOS 12, Ubuntu 20.04]
- Node.js version: [e.g., 18.15.0]
- Terminal: [e.g., Windows Terminal, iTerm2]
- Package version: [e.g., 2.0.0]

**Additional Context**
Any other relevant information
```

### Feature Requests

For feature requests, please include:

```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## 🎨 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for object shapes
- Export types for public APIs

```typescript
// Good
interface SpinnerOptions {
  text: string;
  color?: ColorType;
  interval?: number;
}

// Avoid
function createSpinner(options: any): any {
  // ...
}
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

**Key principles:**
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic
- Follow existing code patterns
- Use consistent naming conventions

### File Structure

```
src/
├── core/           # Core spinner functionality
├── animations/     # Spinner animation definitions
├── builtin/        # Built-in loader functions
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── index.ts        # Main export file
```

### Naming Conventions

- **Files**: kebab-case (`spinner-animations.ts`)
- **Classes**: PascalCase (`VortexSpinner`)
- **Functions**: camelCase (`createSpinner`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_INTERVAL`)
- **Interfaces**: PascalCase (`SpinnerOptions`)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

```typescript
describe('Vortex Spinner', () => {
  it('should start and stop correctly', () => {
    const spinner = new Vortex({ text: 'Testing...' });
    
    expect(spinner.isSpinning).toBe(false);
    
    spinner.start();
    expect(spinner.isSpinning).toBe(true);
    
    spinner.stop();
    expect(spinner.isSpinning).toBe(false);
  });
});
```

### Test Categories

- **Unit tests** - Test individual functions/classes
- **Integration tests** - Test component interactions
- **Visual tests** - Test animation rendering
- **Performance tests** - Test performance characteristics

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Include usage examples in comments
- Document complex algorithms
- Keep comments up to date

```typescript
/**
 * Creates a new spinner with the specified options
 * @param options - Configuration options for the spinner
 * @returns A new Vortex spinner instance
 * @example
 * ```typescript
 * const spinner = new Vortex({
 *   text: 'Loading...',
 *   spinner: 'vortex'
 * });
 * ```
 */
export function createSpinner(options: SpinnerOptions): Vortex {
  // Implementation
}
```

### Documentation Updates

When making changes, update:

- README.md - For user-facing changes
- API.md - For API changes
- CHANGELOG.md - For all changes
- Code comments - For implementation changes

## 🚢 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0) - Breaking changes
- **MINOR** (0.x.0) - New features (backward compatible)
- **PATCH** (0.0.x) - Bug fixes (backward compatible)

### Release Checklist

1. **Update version** in package.json
2. **Update CHANGELOG.md** with new changes
3. **Run full test suite** and ensure all pass
4. **Build and test** the distribution
5. **Create release PR** with version bump
6. **Tag release** after merge
7. **Publish to npm** with proper tags

## 🏆 Recognition

Contributors will be recognized in:

- **CONTRIBUTORS.md** - List of all contributors
- **Release notes** - Major contributions highlighted
- **README.md** - Special thanks section

## 💬 Getting Help

If you need help:

1. **Check documentation** - README, API docs, examples
2. **Search issues** - Look for similar questions
3. **Create an issue** - Ask questions or report problems
4. **Join discussions** - Participate in GitHub Discussions

## 📞 Contact

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Email** - [maintainer@email.com] for security issues

## 🎯 Good First Issues

Look for issues labeled `good first issue` or `help wanted` to get started:

- Documentation improvements
- Adding new spinner animations
- Writing examples for different frameworks
- Improving error messages
- Adding tests

## 🙏 Thank You

Thank you for contributing to Vortex Spinner! Your contributions help make this project better for everyone.

---

**Happy coding! 🌀**