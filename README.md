# README

## Npm scripts

```bash
# Check for typescript errors
pnpm run check
# lint the code using eslint
pnpm run lint
# format the code using prettier
pnpm run format
```

## Run a ts file

```bash
# Run a typescript file with source mas support:
node --experimental-specifier-resolution=node --enable-source-maps --loader ts-paths-esm-loader <file-path>
```
