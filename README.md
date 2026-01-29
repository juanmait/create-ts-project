# @cubostuff/create-ts-project

Boilerplate code to start a TypeScript project for Node.js with modern tooling and best practices.

## Features

- **TypeScript** with strict type checking
- **ESLint** 9+ with flat config format
- **Prettier** for code formatting
- **Jest** with ESM support for testing
- **tsx** for running TypeScript files directly
- Node.js-optimized TypeScript configuration (no DOM types)
- Enforced `import type` for type-only imports

## Installation

```bash
pnpm install
```

## Available Scripts

### Development

```bash
# Run src/index.ts directly with tsx
pnpm run dev

# Run any TypeScript file directly with tsx
pnpm run tsfile src/your-file.ts
```

### Type Checking

```bash
# Check for TypeScript errors without emitting files
pnpm run check
```

### Linting & Formatting

```bash
# Lint code with ESLint
pnpm run lint

# Format all files with Prettier
pnpm run format

# Format specific file(s) with Prettier
pnpm run formatfile src/index.ts
pnpm run formatfile "src/**/*.ts"
```

### Testing

```bash
# Run tests with Jest
pnpm test

# Run tests in watch mode
pnpm test -- --watch
```

### Building

```bash
# Compile TypeScript to JavaScript
pnpm run build
```

### Full Validation

Run all checks in sequence:

```bash
pnpm run check && pnpm run lint && pnpm run format && pnpm run test && pnpm run build
```

## Running TypeScript Files

This project uses [tsx](https://github.com/privatenumber/tsx) for running TypeScript files directly
without compilation.

```bash
# Run the main file
pnpm run dev

# Run any TypeScript file
pnpm run tsfile src/your-file.ts
```

## Debugging in VSCode

1. Open a
   [JavaScript Debug Terminal](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal)
2. Run your TypeScript file:
    ```bash
    pnpm run dev
    # or
    pnpm run tsfile src/your-file.ts
    ```

Breakpoints and source maps work automatically.

## Project Structure

```
create-ts-project/
├── src/                  # TypeScript source files
│   ├── index.ts         # Main entry point
│   └── lib.test.ts      # Jest tests
├── build/               # Compiled JavaScript output (generated)
├── tsconfig.json        # TypeScript configuration
├── jest.config.cjs      # Jest configuration
├── eslint.config.js     # ESLint flat config
├── .prettierrc.json     # Prettier configuration
└── package.json         # Package configuration
```

## TypeScript Configuration

This project is optimized for Node.js:

- **No DOM types**: Only ES2020 language features are available
- **Explicit type packages**: Only `@types/node` and `@types/jest` are included
- **Classic Node resolution**: No file extensions required in imports
- **Enforced type imports**: Uses `verbatimModuleSyntax` and ESLint to ensure `import type` for
  types

## Release Process

This project follows:

- [Conventional Commits](https://www.conventionalcommits.org)
- [Keep a Changelog](https://keepachangelog.com)
- [Semantic Versioning](https://semver.org)

### Standard Release

```bash
# Bump version (major, minor, or patch)
npm version minor

# Push changes and tags
git push && git push --tags
```

### Beta Release

```bash
# Create beta branch
git checkout -b "1.0.0-beta.3"

# Make and commit your changes
git add .
git commit -m "describe your latest changes"

# Set version, commit, and tag
npm version 1.0.0-beta.3

# Push to remote
git push -u origin 1.0.0-beta.3
```

## License

ISC
