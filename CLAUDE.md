# CLAUDE.md

This file provides context about the `@cubostuff/create-ts-project` repository for AI assistants
working with this codebase.

## Project Overview

**Name**: `@cubostuff/create-ts-project` **Version**: 1.1.0 **Purpose**: Boilerplate code to start a
TypeScript project for Node.js

This is a minimal TypeScript project template that provides a solid foundation for building Node.js
applications with modern tooling and best practices.

## Project Structure

```
create-ts-project/
├── src/                  # Source TypeScript files
│   ├── index.ts         # Main entry point (example usage)
│   ├── lib.ts           # Library code (example function)
│   └── lib.test.ts      # Jest tests
├── build/               # Compiled JavaScript output (generated)
├── .vscode/             # VSCode settings and configs
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript compiler configuration
├── jest.config.cjs      # Jest testing configuration
├── .prettierrc.json     # Prettier formatting configuration
├── eslint.config.js     # ESLint flat config (ESLint 9+)
├── CHANGELOG.md         # Project changelog
└── README.md            # User-facing documentation
```

## Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Language**: TypeScript 5.6+ (target: ES2020)
- **Module System**: ESNext with Node resolution
- **Package Manager**: pnpm
- **Testing**: Jest with ts-jest
- **Linting**: ESLint 9+ with flat config and TypeScript support (@cubostuff/eslint-config-ts)
- **Formatting**: Prettier
- **Build**: TypeScript compiler (tsc)
- **Dev Runner**: tsx for running TypeScript files directly

## Key Configuration Details

### TypeScript Configuration ([tsconfig.json](tsconfig.json))

- Target: ES2020 (supports BigInt and modern features)
- Module: ESNext with Node resolution
- Strict mode enabled
- Source maps with inline sources enabled
- Declaration files generated
- Output directory: `./build`

### Module System

- Uses ES Modules (`"type": "module"` in package.json)
- Entry point: `build/index.js`

### Jest Configuration

- Uses ts-jest preset
- Test pattern: `**/*.test.ts`
- Excludes: `node_modules`, `build`

## Development Workflow

### Installation

```bash
pnpm install
```

### Available Scripts

| Command                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `pnpm run dev`               | Run `src/index.ts` directly with tsx         |
| `pnpm run tsfile <FILE>`     | Run any TypeScript file directly with tsx    |
| `pnpm run check`             | Type check without emitting files            |
| `pnpm run lint`              | Lint code with ESLint                        |
| `pnpm run format`            | Format all files with Prettier               |
| `pnpm run formatfile <FILE>` | Format a specific file with Prettier         |
| `pnpm run test`              | Run Jest tests                               |
| `pnpm run build`             | Clean build directory and compile TypeScript |

### Full Validation Pipeline

Run all checks in sequence:

```bash
pnpm run check && pnpm run lint && pnpm run format && pnpm run test && pnpm run build
```

### Running TypeScript Files Directly

Run the main file:
```bash
pnpm run dev
```

Or run any TypeScript file:
```bash
pnpm run tsfile src/your-file.ts
```

### Debugging in VSCode

Use the
[JavaScript Debug Terminal](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal)
and run `pnpm run dev` or `pnpm run tsfile <FILE>`.

## Testing

- Framework: Jest
- Test files: `*.test.ts` in `src/`
- Watch mode: `pnpm test -- --watch`
- Example test: [src/lib.test.ts](src/lib.test.ts)

## Release Process

This project follows:

- [Conventional Commits](https://www.conventionalcommits.org)
- [Keep a Changelog](https://keepachangelog.com)
- [Semantic Versioning](https://semver.org)

### Standard Release

```bash
npm version [major|minor|patch]  # Bumps version, commits, and creates tag
git push && git push --tags
```

### Beta Release

```bash
git checkout -b "1.0.0-beta.3"
git add .
git commit -m "describe your latest changes"
npm version 1.0.0-beta.3
git push -u origin 1.0.0-beta.3
```

### Updating the CHANGELOG

All changes should be documented in [CHANGELOG.md](CHANGELOG.md) following the [Keep a Changelog](https://keepachangelog.com) format.

**When to update:**
- After making any significant changes to the codebase
- Before creating a new release
- When updating dependencies

**How to update:**

1. Add entries under the `## [Unreleased]` section
2. Use appropriate subsections:
   - `### Added` - New features
   - `### Changed` - Changes in existing functionality
   - `### Deprecated` - Soon-to-be removed features
   - `### Removed` - Removed features
   - `### Fixed` - Bug fixes
   - `### Security` - Security fixes

3. For dependency upgrades, use this format:
   ```
   ### Changed

   - Upgrade dependencies:
       ```
       package-name           ^1.0.0  →   ^2.0.0
       another-package        ^3.5.0  →   ^4.1.0
       ```
   ```

4. Be descriptive but concise:
   - Good: "Migrate from ESLint legacy config to flat config format"
   - Bad: "Update ESLint"

5. When releasing, move the `[Unreleased]` entries to a new version section with the date

**Example:**
```markdown
## [Unreleased]

### Changed

- Migrate from ESLint legacy config to flat config format
- Upgrade dependencies:
    ```
    eslint   ^8.57.0  →  ^9.39.2
    ```

### Removed

- Delete `.eslintignore` file (replaced by `ignores` property)

### Fixed

- Fixed example test at `src/lib.test.ts`
```

## Code Style and Conventions

- **ESLint**: Uses ESLint 9+ flat config format with `@cubostuff/eslint-config-ts` and Prettier compatibility
- **Config File**: [eslint.config.js](eslint.config.js) (flat config format)
- **Prettier**: Configured via [.prettierrc.json](.prettierrc.json)
- **Import Style**: ES6 imports/exports
- **File Extensions**: `.ts` for source, imports don't require extensions

## Common Patterns

### Adding New Functionality

1. Create/modify files in `src/`
2. Add corresponding tests in `*.test.ts` files
3. Format modified files with `pnpm run formatfile <FILE>` (or `pnpm run format` for all files)
4. Run `pnpm run check` to verify types
5. Run `pnpm test` to verify tests pass
6. Run `pnpm run lint` to check code quality
7. Build with `pnpm run build`

### Modifying Tests

- Test files use Jest's `describe` and `it` blocks
- Matchers: Standard Jest matchers (`.toBe()`, `.toEqual()`, etc.)
- Current test implementation has a bug: expects "Hello Juan!" but function returns "Hola Juan!"

### Formatting Files After Modification

After creating or modifying files, you should format them with Prettier:

**For individual files (recommended for targeted changes):**
```bash
pnpm run formatfile <FILE>
```

Example:
```bash
pnpm run formatfile src/index.ts
pnpm run formatfile package.json
```

**For the entire project (use when many files changed):**
```bash
pnpm run format
```

Note: Running `pnpm run format` formats all files in the project, which may be overkill if you only modified a handful of files. Use `formatfile` for targeted formatting.

## Important Notes

1. **ES Modules**: This project uses ES Modules exclusively. Use `import`/`export` syntax.
2. **Build Output**: The `build/` directory is generated and should not be edited directly.
3. **Type Declarations**: `.d.ts` files are automatically generated during build.
4. **Source Maps**: Inline source maps are enabled for better debugging.
5. **Strict TypeScript**: All strict type checking options are enabled.

## File Ownership

- **User-facing docs**: [README.md](README.md)
- **AI context**: This file (CLAUDE.md)
- **Change history**: [CHANGELOG.md](CHANGELOG.md)

## Dependencies

All dependencies are devDependencies since this is a boilerplate/template project. Key dependencies:

- TypeScript and @types packages
- ESLint 9+ with flat config and TypeScript support
- Jest with ts-jest
- Prettier
- tsx for running TypeScript files directly

## When Working with This Codebase

- Always run type checking before committing
- Follow the existing test patterns in [src/lib.test.ts](src/lib.test.ts)
- Update [CHANGELOG.md](CHANGELOG.md) following Keep a Changelog format when making changes
- Update this file (CLAUDE.md) when making significant changes that affect:
  - Project structure
  - Available scripts
  - Development workflow
  - Key technologies or dependencies
  - Configuration files
- Maintain ES Module compatibility
- Keep the boilerplate minimal and focused
