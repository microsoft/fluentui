# WIP | FUI Convergence - devstack/DX

> **tags:** pitch, convergence

> For instructions on shaping a project see here: [Shaping a Project](/kX02SXVbS6KzMOQd56i6Cg)
>
> Ported from [hackmd](https://hackmd.io/MiS9ISfjRXqmd6XmxpyMaA)

### Problem

Based on [high level repo issues notes](https://hackmd.io/0TIUjU8_T1Ga2Wjez4IiSQ), we need to address most crucial ones sooner than later to enable good enough DX for both inside/outside contributors.

> Good enough DX:
>
> - rapid feedback loop
> - one common way how to do/run things
> - docs (reflected within tooling -> `yarn test --help` should just work)

### Appetite

As an initial step lets focus on resolve following (smallest possible area):

1. need to build before run/test/demo
1. unified TSConfigs
1. unified way how to transpile javascript
1. solution for convergence/whole repo

### Solution

> show don't tell / TL;DR
> ![](https://i.imgur.com/bDwWu9v.png)

#### 1. need to build before run/test/lint/demo

Current state:

- N\* uses wepback aliases with lerna-alias
- OUIF uses yarn workspaces heavily (symlinks of build assets), thus after every modification outside the package that is being worked on, you need to manually rebuild to get latest changes.

Convergence proposal:

- define one source of truth for aliasing packages that can be leveraged consistently in all tooling (bundlers,testing,demos/storybook)

**👉 tsconfig path aliases + TS solution style configs**

Rather then leveraging solutions that might feel appealing (like TS Project refs etc, lerna/yarn workspace symlinks), we can leverage battle tested solution that has been in place for quite some time, thus makes its adoption compatibility with 3rd party toolign straightforward.

**Pre-requirements**

- typescript 3.9

**Example:**

> @file /tsconfig.base.json
> "root tsconfig" (intentionally not named as tsconfig.json, so editor/IDE will pick solution config per package)

```json
{
  "extends": "@fluentui/ts-config-common",
  "compilerOptions": {
    "lib": ["dom", "es2017", "dom.iterable"],
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@fluentui/react-button": ["packages/react-button/src/index.ts"],
      "@fluentui/react-hooks": ["packages/react-hooks/src/index.ts"]
      // other aliases...
    }
  }
}
```

> @file /packages/react-button/tsconfig.json
> root package tsconfig - [solution config style](https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/#solution-style-tsconfig)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "types": ["node", "jest"]
  },
  "include": [],
  "files": [],
  "references": [
    {
      // lib type config is used for all implementation files (ambient types generation)
      "path": "./tsconfig.lib.json"
    },
    {
      // spec type config is used for tests only, thus mitigates leaking globals into implementation etc. This is not used for prod builds
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

![solution TS config per environment resolution](https://i.imgur.com/U58q2Ed.png)

- solution config per package enables us to author different tsconfigs per environment (unit test env -> `tsconfig.spec.json` / implementation env -> `tsconfig.lib.json`), thus properly scoping type checker and other benefits.
- With `tsconfig.base.json` in place, we can leverage common oss tooling like [tsconfig-paths package](https://github.com/dividab/tsconfig-paths#readme) to leverage path aliases config within all other tools that we (may) use (jest,webpack,rollup,storybook...).
- any code change will instantly propagate to whole TS tree and tools that we use (no physicall rebuilds needed - things will change in memory)

#### 2. unified TSConfigs

Current state:

- N\* (TBA)
- OUIF (TBA)

Convergence proposal:

- based on #1 we can easily reflect TS solution style configs generation (lib/spec) within solid scaffolding tool.

**👉 common scaffolding tool**

Currently we are using Plop which is good enough for now.

Going forward I'd suggest to go with more robust well known tooling such as Angular Schematics/[Nx Devkit generators](https://nx.dev/latest/react/core-concepts/nx-devkit#generators) with various features:

- dry run mode
- undo/redo
- testable
- excellent DX for our consumers
- a robust way for gradual migration and authoring Codemods

**Pre-requirements**

- Plop (need to do more research about its capabilities)
- setting up [Nx](https://nx.dev/) within monorepo

#### 3. unified way how to transpile javascript

Current state:

- N\* uses babel for transpilation and TS for ambient types generation
- OUIF uses typescript for both transpilation and ambient types generation

Convergence proposal:

- based on common OSS practices in JS ecosystem, using babel as a main tool for transpiling is a common pattern, especially in React ecosystem as it comes with richer toolset and features set than TS. For example:
  - plugins
  - macros
  - babel is significantly faster
  - intelligent polyfiling by configuration - `@babel/preset-env` (TS needs imperative handling)

**👉 Babel for transpiling + TS for ambient types generation**

While using 1 tool tends to be more simple, having to use 2 tools for transpilation and type-checkin/generation is an acceptable tax for increased complexity. (there might be glitches from time to time - for example TS supports new ECMA features while babel needs to implement those and vice versa).

**Remarks:**
Going forward I'd recommend to experiment with [esbuild](https://esbuild.github.io/) which would drastically speed up whole transpilation pipeline

**Pre-requirements**

- [typescript 4.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#--incremental-with---noemit)
  - to leverage ambient declaration generation via incremental build with noEmit )

#### 4. solution for convergence/whole repo

Current state:

- TBA

Convergence proposal:

- all solutions proposed so far in this document can be applied on focused scope, which is the convergence initiative. Later on, we can gradually start migrating legacy "stack" to this new approach if needed.

**👉 adopt only for convergence**

### Risks (Rabbit holes)

- using non converged packages in converged (OUIF/N\*)

There might be some difficulties if this need occurs, although from my experience it should be relatively easy to tweak proposed solution to make things "just work".

- increased cold time runs

As everything will be driven by aliases, initial boot time for inner loop of particular package might take longer than before.

> This can be mitigated by having proper cache setup in place or even go beyond and have distributed computation caching in place ([NxDevtools](https://nx.dev/) supports this and it's free for open soure projects)

- occasionally blocked by TS or Babel

Time to time Babel can't keep up with TS feature releases or vice versa, thus we can get blocked if we'd like to start leveraging new lang features or some other functionality.

### Out of scope

- how to automate releases
- detailed scaffolding of converged components
- documentation of components
- how to apply/implement proposed solution for both legacy and converged components
