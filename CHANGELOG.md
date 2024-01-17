# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   upgrade dependencies
    ```
    @cubostuff/eslint-config-ts        ^0.1.0  →   ^1.0.0-beta.3
    @jest/types                       ^28.1.3  →   ^29.6.3
    @types/eslint                      ^8.4.5  →   ^8.56.2
    @types/jest                       ^28.1.6  →  ^29.5.11
    @types/node                       ^18.6.2  →  ^20.11.5
    @typescript-eslint/eslint-plugin  ^5.31.0  →   ^6.19.0
    @typescript-eslint/parser         ^5.31.0  →   ^6.19.0
    eslint                            ^8.20.0  →   ^8.56.0
    eslint-config-prettier             ^8.5.0  →    ^9.1.0
    eslint-plugin-import              ^2.26.0  →   ^2.29.1
    eslint-plugin-jest                ^26.6.0  →   ^27.6.3
    jest                              ^28.1.3  →   ^29.7.0
    prettier                           ^2.7.1  →    ^3.2.4
    ts-jest                           ^28.0.7  →   ^29.1.1
    ts-node                           ^10.9.1  →   ^10.9.2
    ts-paths-esm-loader                ^1.3.1  →    ^1.4.3
    tsconfig-paths                     ^4.0.0  →    ^4.2.0
    typescript                         ^4.7.4  →    ^5.3.3
    ```
-   install instructions in README
-   vscode debug instructions in README

## [0.3.0] - 2022-09-19

## Added

-   support typescript `resolveJsonModule`

## [0.2.1] - 2022-09-04

### Fixed

-   prettier ignore build folder
-   exclude build folder from tests

## [0.2.0] - 2022-08-19

## Added

-   Emit type declarations
-   Add package `build` script

## [0.1.1] - 2022-07-29

### Added

-   upgrade dependencies
    ```
    @types/jest                       ^28.1.5  →  ^28.1.6
    @types/node                       ^18.0.3  →  ^18.6.2
    @typescript-eslint/eslint-plugin  ^5.30.6  →  ^5.31.0
    @typescript-eslint/parser         ^5.30.6  →  ^5.31.0
    eslint                            ^8.19.0  →  ^8.20.0
    ts-jest                           ^28.0.6  →  ^28.0.7
    ts-node                           ^10.8.2  →  ^10.9.1
    ```
-   update package description
-   rename to `"@cubostuff/create-ts-project"`
-   support typescript target es2020 (allows BigInt)

## [0.1.0] - 2022-07-15

### Added

-   jest support
-   upgrade @cubostuff/eslint-config-ts
-   add ts node resolution `node`
-   add npm script `check`
-   support inline source maps

### Fixed

-   ignore pnpm warn UNMEET PEER DEPENDENCIES

## [0.0.2] - 2022-07-12

### Added

-   eslint config
-   ts-node vscode settings
-   `tsconfig.json` file
-   `CHANGELOG.md` file
-   prettier config files
-   package scripts `format` & `lint`
-   upgrade dependencies
    ```
    @cubostuff/eslint-config-ts        ^0.0.3  →   ^0.0.4
    @types/eslint                      ^8.4.2  →   ^8.4.5
    @typescript-eslint/eslint-plugin  ^5.23.0  →  ^5.30.6
    @typescript-eslint/parser         ^5.23.0  →  ^5.30.6
    eslint                            ^8.15.0  →  ^8.19.0
    prettier                           ^2.6.2  →   ^2.7.1
    typescript                         ^4.6.4  →   ^4.7.4
    ```
