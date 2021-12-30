# RFC | Convergence Dev-stack/DX improvements

> _TS Path aliases, collocated storybook_

_List contributors to the proposal: @hotell, @craig12345, @ling1726, @JustSlone, @dzearing, @layershifter_

## Background

> based on [high level repo issues notes](https://hackmd.io/0TIUjU8_T1Ga2Wjez4IiSQ),

## Problem statement

Current state of development that we wanna improve:

1. need to build before run/test/demo

- go To redirects to ambient files

2. demos/examples dislocated from implementation (button demos live in react-examples package)

- `yarn start` magically boots server with demos, but dev has no idea where that comes from (devs that worked within this repo for some time may not have such a problem ofc)

## Detailed Design or Proposal

> 💡 **NOTE:** all proposed solutions will be applied only for convergence packages

### 1. need to build before run/test/lint/demo

**Current state:**

- N\* uses wepback aliases with lerna-alias
- OUIF uses yarn workspaces heavily (symlinks of build assets), thus after every modification outside the package that is being worked on, you need to manually rebuild to get latest changes.

**Solution proposal:**

- leverage TypeScript `path` aliases for convergence
  - will serve as one source of truth
  - will be leveraged consistently in our tooling
    - testing,
    - demos/storybook
    - bundling (TBA, we might not need to update how we bundle for this iteration)

> Rather then leveraging solutions that might feel appealing (like TS Project refs etc, lerna/yarn workspace symlinks), we can leverage battle tested solution that has been in place for quite some time, thus makes its adoption compatibility with 3rd party tooling straightforward.

**Example:**

- Visualization

<img src="https://user-images.githubusercontent.com/1223799/107652944-65d57100-6c81-11eb-9ba1-400a921f12e7.png" width="500" alt="TS config aliases config for converged components">

- Code

```json
// @file /tsconfig.base.json
//
// "root tsconfig" (intentionally not named as tsconfig.json, so editor/IDE will pick only tsconfig.json per package)
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

```json
// @file /packages/react-button/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "types": ["node", "jest"]
  },
  "include": ["src"]
}
```

- With `tsconfig.base.json` in place, we can leverage common oss tooling like [tsconfig-paths package](https://github.com/dividab/tsconfig-paths#readme) to leverage path aliases config within all other tools that we (may) use (jest,webpack,rollup,storybook...).
- any code change will instantly propagate to whole TS tree and tools that we use (no hard re-builds needed - things will change in memory)

### 2. demos/examples dislocated from implementation (button demos live in react-examples package)

**Current state:**

- we already use storybook, although all stories are dislocated and aggregated within `react-examples` package

**Solution proposal:**

- collocate stories with implementation
- enable both local and global stories development
  - local -> storybook config per package/`*.stories.*` per package/`yarn start` spins local storybook instance for inner loop
  - global -> root monorepo storybook instance that compiles all collocated stories - thus provides a complete overview

<img src="https://user-images.githubusercontent.com/1223799/107655270-afbf5680-6c83-11eb-996c-4abd22275cea.png" width="500" alt="global/local storybook config including jest and TS "/>

### Pros and Cons

**Pros:**

- already stated in Problem statement/Solution proposal

**Cons:**

- _NOTE:_ Following is not a Con in reality, but based on rich discussion I'm gonna explicitly mention this here.
  - To prevent introducing circular dependencies with collocated stories approach, our packages will not provide explicit `devDependencies` within its package.json for other packages used within story implementation. This dependency is not needed as it provides no value to consumer. Also TS path aliases will handle this behavior as main source of truth for resolving dep tree in Dev Mode.

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

NONE

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

NONE

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
