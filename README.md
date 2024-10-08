# README

## Install

```bash
pnpm install
```

## Pnpm scripts

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

## Example run a typescript file:

```bash
# Run a typescript file with source maps support:
node --experimental-specifier-resolution=node --enable-source-maps --loader ts-paths-esm-loader src/index.ts
```

## Debug a typescript file in VSCode

Just run the same command above in a vscode [Javascript Debug Terminal]

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
# - creates a tag for the current version

git push && git push --tags
```

### Example beta

```bash
git checkout -b "1.0.0-beta.3"
git add .
git commit -m "describe your latest changes"

# - set the version in your package.json
# - commit this version bump
# - creates a tag for the new version
npm version 1.0.0-beta.3

# update remote
git push -u origin 1.0.0-beta.3
```

[Javascript Debug Terminal]:
    https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal
