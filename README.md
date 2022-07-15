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

```bash
npm version minor
# options (major, minor, or patch)
# - increments the version your package.json based on the type of the change
# - commits this version bump
# - creates a tag for the current release
git push && git push --tags
```
