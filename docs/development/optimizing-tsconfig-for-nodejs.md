# Optimizing tsconfig.json for Node.js Projects

This guide shows how to configure TypeScript specifically for Node.js applications, excluding browser-specific features and enabling modern Node.js module resolution.

## Quick Summary

For a modern Node.js project, add these key settings to your tsconfig.json:

```json
{
    "compilerOptions": {
        "lib": ["ES2020"],
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "types": ["node", "jest"],
        "resolvePackageJsonExports": true,
        "resolvePackageJsonImports": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "build"]
}
```

## Step-by-Step Configuration

### 1. Exclude Browser Types

**Problem:** By default, TypeScript includes DOM types (Document, Window, etc.) which don't exist in Node.js.

**Solution:** Explicitly set the `lib` array to only include ES language features:

```json
{
    "compilerOptions": {
        "lib": ["ES2020"]
    }
}
```

**Result:**
- ✅ Code like `document.getElementById()` will now error (correct for Node.js)
- ✅ Only JavaScript language features are available
- ✅ Prevents accidental use of browser APIs

### 2. Only Include Node.js Type Definitions

**Problem:** TypeScript auto-includes all `@types/*` packages, including browser-related ones.

**Solution:** Explicitly specify which type packages to include:

```json
{
    "compilerOptions": {
        "types": ["node", "jest"]
    }
}
```

**Result:**
- ✅ Only Node.js and Jest types are available
- ✅ No accidental browser API usage
- ✅ Cleaner type resolution

### 3. Use Modern Node.js Module Resolution

**Problem:** The default `"moduleResolution": "node"` is legacy and doesn't support modern Node.js features.

**Solution:** Use `nodenext` for both module and moduleResolution:

```json
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext"
    }
}
```

**Requirements:**
- Both settings must match (both `nodenext` or both `node16`)
- Your `package.json` must have `"type": "module"` for ES modules

**Result:**
- ✅ Proper ESM support
- ✅ Respects Node.js module resolution algorithm
- ✅ Future-proof (evolves with Node.js)

### 4. Enable package.json Features

**Problem:** Modern Node.js uses `exports` and `imports` fields in package.json, but legacy TypeScript ignores them.

**Solution:** Enable these features explicitly:

```json
{
    "compilerOptions": {
        "resolvePackageJsonExports": true,
        "resolvePackageJsonImports": true
    }
}
```

**Note:** These require `moduleResolution: "nodenext"` to work.

**Result:**
- ✅ Respects package.json `exports` field (enforces package boundaries)
- ✅ Supports package.json `imports` field (internal package imports with `#` prefix)
- ✅ Better alignment with Node.js behavior

### 5. Explicit Include/Exclude

**Problem:** Without explicit configuration, TypeScript processes unnecessary files.

**Solution:** Explicitly define what to include and exclude:

```json
{
    "include": ["src/**/*"],
    "exclude": ["node_modules", "build"]
}
```

**Result:**
- ✅ Only processes source files
- ✅ Faster compilation
- ✅ Clearer project structure

## Complete Example

Here's a minimal Node.js-optimized configuration (add to your existing tsconfig.json):

```json
{
    "compilerOptions": {
        /* Language and Environment */
        "target": "es2020",
        "lib": ["ES2020"],

        /* Modules */
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "types": ["node", "jest"],
        "resolveJsonModule": true,
        "resolvePackageJsonExports": true,
        "resolvePackageJsonImports": true,

        /* Emit */
        "declaration": true,
        "sourceMap": true,
        "outDir": "./build",

        /* Interop Constraints */
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "build"]
}
```

## What Each Setting Does

### `lib: ["ES2020"]`
- Provides only ES2020 language features
- Excludes DOM, WebWorker, and other browser APIs
- Prevents accidental browser API usage

### `types: ["node", "jest"]`
- Only includes @types/node and @types/jest
- Prevents other @types packages from auto-loading
- Keeps type resolution focused on Node.js

### `module: "nodenext"`
- Generates modules compatible with modern Node.js
- Required when using `moduleResolution: "nodenext"`
- Supports both ESM and CommonJS based on file extension

### `moduleResolution: "nodenext"`
- Uses Node.js's latest module resolution algorithm
- Respects package.json `exports` and `imports` fields
- Future-proof (updates with Node.js evolution)

### `resolvePackageJsonExports: true`
- Honors the `exports` field in dependencies' package.json
- Enforces proper package boundaries
- More accurate to Node.js runtime behavior

### `resolvePackageJsonImports: true`
- Enables package.json `imports` field support
- Allows internal imports with `#` prefix
- Useful for path aliases within your package

### `include: ["src/**/*"]`
- Explicitly includes only source files
- Processes all files in src directory
- Clear project boundaries

### `exclude: ["node_modules", "build"]`
- Skips dependencies and build output
- Faster type checking
- Prevents duplicate processing

## Common Issues and Solutions

### Issue: "Option 'resolvePackageJsonExports' can only be used when..."

**Cause:** You're using `moduleResolution: "node"` (legacy mode).

**Solution:** Change to `moduleResolution: "nodenext"`:

```json
{
    "compilerOptions": {
        "moduleResolution": "nodenext"
    }
}
```

### Issue: "Option 'module' must be set to 'NodeNext' when..."

**Cause:** Module and moduleResolution don't match.

**Solution:** Both must be set to `nodenext`:

```json
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext"
    }
}
```

### Issue: Import errors after enabling `resolvePackageJsonExports`

**Cause:** Some packages use `exports` to hide internal modules.

**Solution:**
- This is correct behavior - you shouldn't import internal modules
- Update imports to use only exported paths
- If a package is broken, report the issue or find an alternative

## Default vs. Node.js-Optimized

### Default TypeScript (Before)

```json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "ESNext",
        "moduleResolution": "node"
    }
}
```

**Problems:**
- ❌ Includes DOM types (Document, Window, etc.)
- ❌ Auto-includes all @types packages
- ❌ Legacy module resolution
- ❌ Doesn't respect package.json exports/imports
- ❌ Processes all files including tests and build output

### Node.js-Optimized (After)

```json
{
    "compilerOptions": {
        "target": "es2020",
        "lib": ["ES2020"],
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "types": ["node", "jest"],
        "resolvePackageJsonExports": true,
        "resolvePackageJsonImports": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "build"]
}
```

**Benefits:**
- ✅ Node.js-only environment
- ✅ No browser APIs available
- ✅ Modern module resolution
- ✅ Respects package.json standards
- ✅ Only processes source files

## When to Use These Settings

**Use this configuration for:**
- Pure Node.js applications
- CLI tools
- Backend APIs
- Node.js services
- Libraries targeting Node.js

**Don't use this configuration for:**
- Frontend applications (React, Vue, Angular)
- Projects using bundlers (use `"moduleResolution": "bundler"` instead)
- Universal/isomorphic code that runs in both Node.js and browsers

## Testing Your Configuration

After applying these changes, verify everything works:

```bash
# Type check
pnpm run check

# Build
pnpm run build

# Run tests
pnpm test
```

If any step fails, review the error messages - they'll guide you to any remaining issues.

## Additional Resources

- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Node.js ES Modules](https://nodejs.org/api/esm.html)
- [Package.json Exports](https://nodejs.org/api/packages.html#exports)
- [TypeScript tsconfig Reference](https://www.typescriptlang.org/tsconfig)
