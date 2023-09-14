# RFC: TS solution style config for vNext (per environment configs)

---

_List contributors to the proposal here: @hotell_

## Summary

> **💡 NOTE:**
>
> This is proposed changed only for vNext and packages that use new DX ( via ts config path aliases)

We successfully migrated vNext packages [to new DX (1 stage)](https://github.com/microsoft/fluentui/issues/18579), which leverages TS path aliases for improved DX and other benefits...

To continue with our journey to improved DX we need to address leaking global types and other related issues (caused by our current `tsconfig.json` config) for vNext packages.

## Problem statement

> see [Open Issues](#open-issues)

- leaking global types
- invalid type checking (TS is not following proper `target` and `lib`)
- various contexts/scopes addressed via 1 config file
- shipping files besides implementation to npm, thus exposing "private" APIs (handled via .npmignore for now)

## Detailed Design or Proposal

Using [TS solution style config](https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/#solution-style-tsconfig) / per environment configuration, for vNext/packages that use new DX.

### Pre-requirements

- vNext packages migrated to new DX (1st stage) https://github.com/microsoft/fluentui/issues/18579

### Detailed design/Implementation

- ![Configuration and file types processing](https://user-images.githubusercontent.com/1223799/126519445-8c215488-e568-4f88-b37d-b99b4d80f418.png)
- ![CI build execution](https://user-images.githubusercontent.com/1223799/126519538-c0794d3b-1199-4e49-8ca8-36deeb09be57.png)

#### `<package-name>/tsconfig.json` - solution config file

- main package TS config consumed by TSC Language Server
- on CI we gonna trigger `nx run <project-name>:type-check` (already happening for `/test`), which will type check properly everything in your package.
  - under the hood we'll run TS in build mode: `tsc --build`

**Example:**

```jsonc
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    // by default we gonna use tsc for type checking only
    "noEmit": true
    //...
  },
  "include": [],
  "files": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    },
    {
      "path": "./storybook/tsconfig.json"
    }
  ]
}
```

#### `<package-name>/tsconfig.lib.json`

- config used for production builds

**Example:**

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "outDir": "./dist",
    // properly scoped globals and environment
    "types": [],
    // enable transpilation and declaration files generation only for implementation files
    "noEmit": false,
    "declaration": true
  },
  "exclude": ["**/*.spec.ts", "**/*.test.ts", "**/*.stories.tsx"],
  "include": ["**/*.ts", "**/*.tsx"]
}
```

#### `<package-name>/tsconfig.spec.json`

- config used for tests

**Example:**

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "module": "commonjs",
    // properly scoped globals and environment - note that extra 'jest'
    "types": ["jest", "node"]
  },
  "include": ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx", "**/*.d.ts"]
}
```

#### `<package-name>/.storybook/tsconfig.json`

- config used for storybook stories

**Example:**

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "",
    "checkJs": true
  },
  "exclude": ["../**/*.spec.ts", "../**/*.spec.js", "../**/*.spec.tsx", "../**/*.spec.jsx"],
  "include": [
    "../src/**/*",
    // this is only to type check SB config files
    "./*.js"
  ]
}
```

#### Eslint setup

- we'll need to adjust eslint to properly consume our configs

### `<package-name>/.eslintrc.json`

```jsonc
{
  "extends": ["@fluentui/eslint-plugin/react"],
  "parserOptions": {
    // this will speed up linting up to 40%
    "tsconfigRootDir": "path/to/<package-name>",
    // we need to specify our environment configs (will be removed once typescript-eslint properly supports project references)
    // tsc program will be created accordingly per environment/scope
    "project": [
      // includes tsconfig.lib.json and tsconfig.spec.json
      "path/to/<package-name>/tsconfig.*?.json",
      // includes storybook config
      "path/to/<package-name>/.storybook/tsconfig.json"
    ]
  },
  "rules": {
    // ...
  }
}
```

#### Build setup

- we'll need to adjust current build setup to accommodate our changes

`just-scripts` doesn't support TypeScript `build` mode, so we'll need to provide another solution.

**Possible Solutions:**

- `run-command` nx executor that will contain all required commands
- custom nx executor that will encapsulate manually written commands in previous bullet point

### Pros and Cons

#### Pros

- no global type leaks
- excellent type safety
  - TS properly notifies consumers if they use non supported language features in particular environment
- we ship only implementation to npm
- faster TS (CI/Local) (solution files + references can use incremental builds)
  - in general various advantages provided by TS `build` mode
- consequence of this proposal:
  - more straightforward `build` task execution with less abstraction

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

#### Cons

- more boilerplate for eslint
  - will be mitigated via generators and automation
- increased files count caused by multiple tsconfigs (I don't consider this a con, but some folks might)

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

- NONE

## Open Issues

- https://github.com/microsoft/fluentui/issues/17101
- ~https://github.com/microsoft/fluentui/issues/19042~
  - temporarily solved by ignoring files via .npmignore (which is not the appropriate way, as there are still typing/env clashes)
