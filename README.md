# README

## Npm scripts

```bash
# Check for typescript errors
pnpm run check
# lint the code using eslint
pnpm run lint
# format the code using prettier
pnpm run format
# run tests using jest
pnpm run test
# build the project
pnpm run build

# run all
pnpm run check && pnpm run lint && pnpm run format && pnpm run test && pnpm run build

# run tests using jest in watch mode
pnpm run test --watch
pnpm test -- --watch
```

## Run a ts file

```bash
# Run a typescript file with source mas support:
node --experimental-specifier-resolution=node --enable-source-maps --loader ts-paths-esm-loader <file-path>
```

## Release

Make sure to check this links:

-   https://www.conventionalcommits.org
-   https://keepachangelog.com
-   https://semver.org

### Example

```bash
# options (major, minor, or patch)
npm version minor
# - increments the version your package.json based on the type of the change
# - commits this version bump
# - creates a tag for the current release
git push && git push --tags
```
