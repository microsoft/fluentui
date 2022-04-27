# RFC: Packaging for npm registry

---

_List contributors to the proposal here: @hotell_

## Summary

> #### 💡 NOTE: This proposal/guide applies only for vNext packages and libraries using new DX

## Problem statement

We ship unnecessary things to our consumers:

- story files
- source files
- various configurations and metadata
- all emitted type declaration files (`.d.ts`)
- others...

## Detailed Design or Proposal

> **💡 NOTE:** This proposal/guide applies only for vNext packages and libraries using new DX

This is a living document that will describe various proposals that all aim to improve following common goals:

- packaging size to npm registry
- faster install/over the wire transfer/less bytes
- faster packages consumption/processing by consumers
- better security for consumers
- clear defined public APIs boundaries
- better tree-shaking capabilities

### 1. `.npmignore` cleanup _(implemented)_

#### Problem statement

What we ship is driven by our current npm package setup, which looks like following:

**`<package>/.npmignore`**

```
*.api.json
*.config.js
*.log
*.nuspec
*.test.*
*.yml
.editorconfig
.eslintrc*
.eslintcache
.gitattributes
.gitignore
.vscode
coverage
dist/storybook
dist/*.stats.html
dist/*.stats.json
dist/demo
fabric-test*
gulpfile.js
images
index.html
jsconfig.json
node_modules
results
src/**/*
!src/**/examples/*.tsx
!src/**/docs/**/*.md
!src/**/*.types.ts
temp
tsconfig.json
tsd.json
tslint.json
typings
visualtests
```

> **NOTE:** data was acquired by running `npm pack --dry-run` in `packages/react-text`

**Packaged output:**

```
=== Tarball Details ===
name:          @fluentui/react-text
version:       9.0.0-alpha.0
package size:  564.2 kB
unpacked size: 2.2 MB
total files:   1008
```

With manually removed `.cache` folder:

```
=== Tarball Details ===
name:          @fluentui/react-text
version:       9.0.0-alpha.0
package size:  31.1 kB
unpacked size: 263.9 kB
total files:   518
```

> **NOTE:** The issue with `.cache` (Jest cache) was addressed separately by moving the cache under `<package root>/node_modules/.cache/jest`, following the convention used by other tools' caches.

#### Detailed Design or Proposal

update `.npmignore` to following setup:

**`<package>/.npmignore`**

```sh
.storybook/
.vscode/
bundle-size/
config/
coverage/
e2e/
etc/
node_modules/
src/
dist/types
temp/
__fixtures__
__mocks__
__tests__

*.api.json
*.log
*.spec.*
*.stories.*
*.test.*
*.yml

# config files
*config.*
*rc.*
.editorconfig
.eslint*
.git*
.prettierignore
```

> **NOTE:** data was acquired by running `npm pack --dry-run` in `packages/react-text`

**Packaged output:**

```
=== Tarball Details ===
name:          @fluentui/react-text
version:       9.0.0-alpha.0
package size:  24.7 kB
unpacked size: 172.8 kB
total files:   250
```

#### Pros

This approach significantly improves our current situation:

- simpler `npmignore` configuration / better maintenance
- only implementation is being shipped (no tests, stories)
- **52% less files**
- **21% smaller packed package size**

#### Cons

- none

#### Discarded Solutions

- using `"files"` withing `package.json`
  - doesn't support exclusion patterns
  - non explicit for human (if `files` property is used, some files will be automatically and always shipped)
  - 2 sources of "truth" (`.npmignore` and `files`)

### 2. shipping type declarations (TypeScript)

#### Problem statement

To be able to provide TypeScript support to our consumers we generate declaration files during `tsc` invocation.

These declaration files are:

1. generated side by side with implementation files
1. generated N times for N supported module loaders (for v9 N equals to 2 - esm and commonjs)

Aforementioned approach introduces 2 problems.

**Problem 1: generated side by side with implementation files**

- exposure of all package internals and structure and allows consumers to use **private APIs**
- exposure of all TypeScript constructs that might violate consumers TypeScript version restrictions
  - eg. internally in the package we use Template literal types that are not exposed to public API. If users depend on TS version that doesn't support this language feature they will get TS errors thus won't be able to ship code.

**Problem 2: generated N times for N supported module loaders**

- generated TypeScript declaration files don't emit different output based on different `module` field, thus this generation is redundant and provides no benefit.

_Example:_

_`module: CommonJs`_

```ts
import type { FunctionComponent } from 'react';
import { TextWrapperProps } from '../wrapper';
export declare const bodyClassName = 'fui-Body';
export declare const Body: FunctionComponent<TextWrapperProps>;
```

_`module: ESM`_

```ts
import type { FunctionComponent } from 'react';
import { TextWrapperProps } from '../wrapper';
export declare const bodyClassName = 'fui-Body';
export declare const Body: FunctionComponent<TextWrapperProps>;
```

#### Detailed Design or Proposal

**Problem 1 solution:**

- ship only [rolluped declaration files `.d.ts`](https://medium.com/@martin_hotell/typescript-library-tips-rollup-your-types-995153cc81c7) for all public API entrances. We can leverage already existing setup via api-extractor.

Execution flow will look like following:

![rolluping execution flow](https://miro.medium.com/max/1400/1*NGJGYhg9YFGu7vwU6a92cw.png)

New build output structure will look like following:

```sh
|- <package-name>/
|-  dist/
|-  |-  index.d.ts  # rolluped declaration file
|-  lib/  # module: ESNext
|-  |- *.js
|-  |- *.map.js
|-  lib-commonjs/ # module: CommonJS
|-  |- *.js
|-  |- *.map.js
|-  package.json
```

**Problem 2 solution:**

- run `declaration` generation only once during build.

#### Pros

- explicit public API contract
- opportunity to leverage TypeScript language constructs beyond consumers support
- less files shipped over network
- bit faster build process

#### Cons

- additional configuration to maintain within our legacy tool chain

### 3. shipping only rollup-ed(bundled) implementation files

> **NOTE:** to make this RFC more focused this will be covered in followup PR's if needed

#### Pros

- TBA

#### Cons

- TBA

### 4. package.json post-processing

> **NOTE:** to make this RFC more focused this will be covered in followup PR's if needed

#### Pros

- TBA

#### Cons

- TBA

## Open Issues

- https://github.com/microsoft/fluentui/issues/19042
