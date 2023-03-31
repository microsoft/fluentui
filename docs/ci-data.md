# CI data (time metrics from running pipelines on whole monorepo)

**Legend:**

- optimization v1 => narrowing tsconfig for v9 `isConformance` / https://uifabric.visualstudio.com/fabricpublic/_build/results?buildId=291729&view=logs&j=4fecd60f-6595-5d51-257b-4743b034536f&t=0df5d56b-1f79-5ca2-2e20-703f84ecb970
- optimization v2 => removing runInBand,maxWorkers,coverage from jest execution in v0,v8 /

| CI Run (test,build,lint,type-check --all)                          | time    | remarks                                                  |
| ------------------------------------------------------------------ | ------- | -------------------------------------------------------- |
| NX test optimization v1                                            | 50m 14s |                                                          |
| Lage test optimization v1                                          | 49m 38s |                                                          |
| NX test optimization v2                                            | ?       |                                                          |
| Lage test optimization v2                                          | ?       |                                                          |
| NX with maxWorkers=4 (v0,v8)                                       | 42m 0s  |                                                          |
| Lage with maxWorkers=4 (v0,v8)                                     | 49m 0s  |                                                          |
| NX with maxWorkers=4 (v0,v8,v9)                                    | 38m 20s |                                                          |
| Lage with maxWorkers=4 (v0,v8,v9)                                  | 58m 0s  | 💀 pipeline reached 1 hour threshold                     |
| NX with maxWorkers=4 (v0,v8,v9) + ts-jest isolatedModules          | 37m 5s  | 🚅 (most effective testing perf optimizations)           |
| Lage with maxWorkers=4 (v0,v8,v9)+ ts-jest isolatedModules         | ??m 0s  | 💀 pipeline reached 1 hour threshold                     |
| ----                                                               |         | -------                                                  |
| NX (with test opt) + type-check optimization                       | 33m 35s | 🚅🚅🚅 (fastest !!!)                                     |
| Lage (with test opt) + type-check optimization                     | xxx     | 🚨 didn't finish - invalid targets dependency resolution |
| ----                                                               |         | -------                                                  |
| NX (with test opt) + type-check optimization + build optimization  | 34m 48s | data with rebase from master (+200 commits)              |
| Lage (with test opt) + type-check optimization+ build optimization | xxx     | 🚨 didn't finish - invalid targets dependency resolution |

# Optimizations

During analysis of our tasks/pipelines we found various opportunities how to improve our pipeline speeds to enable faster time do delivery.

Following Chapters contain most impactful findings with some amount of detail for how to enable them.

We were able to implement some of these suggestions during experimentation phase which gave us following worst case scenario pipeline durations.

> **Note:**
>
> With improvements also uses Node 16, which is more subtle to OOM/unhandled promise rejections (initially we weren't able to make it pass until we landed some of optimizations described in this document)

| CI Run (test,build,lint,type-check --all) | time | failure rate (Timeout/OOM) |
| ----------------------------------------- | ---- | -------------------------- |
| current                                   | 40m  | 50%                        |
| with improvements                         | 30m  | 0%                         |

## Stop using TS path aliases on CI

Using TS path aliases provides excellent DX and blazing fast Application Bundling speeds with tools like swc or esbuild.

For running `type-check` and d.ts emit within our codebase it inflicts huge performance penalty, as TSC needs to traverse and parse all the paths on every run.

For `type-check` in particular, which is used by running `tsc -b` on ts solution configuration per project, the performance penalty is the biggest.

By stopping using path aliases on CI for type-checks we will get 40% speed bumps for type-checking !

**Speed metrics:**

| Run type                       | time    | delta    |
| ------------------------------ | ------- | -------- |
| current / parallel 1           | 16m 41s |          |
| with optimization / parallel 1 | 9m 57s  | 40,4% 🚅 |
|                                |         |          |
| current / parallel 8           | 3m 20s  |          |
| with optimization / parallel 8 | 2m 12s  | 34% 🚅   |

### Blockers:

#### Storybook Stories

Because our approach to stories we create circular dependency between packages.

_Example:_

`react-table` stories import from `react-data-grid-react-window`, while `react-data-grid-react-window` production code imports from `react-table`.

```
react-table <--->  react-data-grid-react-window
```

This makes it impossible to implement turning off path aliases for type-checks on CI, because following task relationship will not work:

`generate-api` --> `type-check`

#### Possible solutions (Storybook Stories)

**1. lets keep things as is - having the per penalty increased with every new line of code**

**2. make stories separate packages**

```diff
+react-text-stories/
+  |- .storybook
+  |- src
+  |- package.json
+  |- project.json
react-text/
-  |- .storybook/
-  |- stories/
   |- src/
   |- package.json
   |- project.json
```

**3. make stories separate packages - via nx "hack"**

```diff
react-text/
   |- .storybook/
   |- stories/
+     |- package.json
+     |- project.json
   |- src/
   |- package.json
   |- project.json
```

This approach might be a ticking bomb as we are approaching a package within package (regarding resolution algorithms and tools).

Clean approach would be to restructure folder structure to following:

```sh
react-text/
   |- stories/
      |- .storybook/
      |- src/
      |- package.json
      |- project.json
      |- tsconfig.json
   |- impl/
      |- src/
      |- package.json
      |- project.json
      |- tsconfig.json
      |- tsconfig.lib.json
      |- tsconfig.spec.json
      |- tsconfig.cy.json
    |- impl/
```

**4. generate dts manually before running `type-check` on CI**

Before `type-check` pipeline is run we manually generate type declaration for all v9 packages present in stories.

_Simplified flow:_

- `tsc -p tsconfig.lib.json` within `react-components`
- parse story files to create import Map and run `tsc -p tsconfig.lib.json` on those dependencies that exist in stories but are not part of `react-components` suite
- create temporary `tsconfig.base.dts.json` that will map to `.d.ts` path aliases instead of `.ts` source files
- start `type-check` pipeline

## Enable `incremental` for TS solution configs + `emitDeclarationOnly`

By enabling `incremental:true` for projects that use TS Solution configs, we will get around 15% perf boost.

This improvement will be leveraged on [`type-check` --depends on--> `generate-api`] task execution relationship,
where `type-check` will leverage incremental emit metadata from running `tsc -p tsconfig.lib.json (part of generate api)`.

**Speed metrics:**

| Run: yarn workspace @fluentui/react-table tsc -b                     | time                    | delta  |
| -------------------------------------------------------------------- | ----------------------- | ------ |
| current                                                              | 27.73s                  |        |
| with incremental: true / 1st(cold) run                               | 27.73s                  |        |
| with incremental: true / 2nd run                                     | 4.4s                    |        |
| --                                                                   |                         |        |
| current / (tsc -p tsconfig.lib + tsc -b tsconfig.json)               | (6.86s + 22.32s) 29.18s |        |
| with incremental:true / (tsc -p tsconfig.lib + tsc -b tsconfig.json) | (6.83s + 18.07) 24.9s   | 15% 🚅 |

## Migrate react(v8) to TS solution configs

Besides small speed benefits, using solution configs will provide additional ones like:

- mitigate any type globals leaks
- narrows down dep tree of files for both build and test execution that will give us around 5% speed boost
- lower memory pressure on conformance tests

**Speed metrics:**

| command: `@fluentui/react test --no-cache --runInBand` | time | delta | remarks |
| ------------------------------------------------------ | ---- | ----- | ------- |
| ts-jest (current state)                                | 281s | BASE  |         |
| ts-jest + tsconfig.spec.json config + target: ES2019   | 270s | 4%    |         |

## Emit declarations only - react-northstar

v0 uses solely babel for transpilation thus tsc is doing unnecessary work. TSC should generate only declaration files. This will give use approx 10% speed bump.

## Jest Test transform tweaks

- use `@swc/jest` for v9 - this will give us up to 10% speed boost
- use ts-jest with `isolatedModules` for v8
  - v8 explodes with swc/jest - additional work needed

**Speed metrics:**

| command: `@fluentui/react test --no-cache --runInBand` | time | delta | remarks |
| ------------------------------------------------------ | ---- | ----- | ------- |
| ts-jest (current state)                                | 281s | BASE  |         |
| ts-jest + `isolatedModules:true`                       | 260s | 7%    |         |

## stop running Code Coverage on CI

Slows test execution up to 10% (present in react-northstar)

| Run type        | time  | command                                                                    |
| --------------- | ----- | -------------------------------------------------------------------------- |
| current         | 382 s | `gulp test --config ./jest.config.js --coverage --maxWorkers=2 --no-cache` |
| without codecov | 340 s | `gulp test --config ./jest.config.js --maxWorkers=2                        |

## Tests memory leaks

Both v0 and v8 tests contain memory leaks and consume above **2GB of memory per test** !!!

> discovered while executing via raw `jest` instead `gulp`

```
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
```

By cleaning up those tests to not leak / not drastically add memory heap, we could make them run faster as is and enable full `maxWorkers` count (we use 8 core CPUs on CI) which would drastically cut time execution.

**Speed metrics:**

| Run type (node --expose-gc ../../node_modules/.bin/jest --runInBand --logHeapUsage --no-cache ) | max heap size (MB) | delta |
| ----------------------------------------------------------------------------------------------- | ------------------ | ----- |
| conformance                                                                                     | 2029 MB            |       |
| no conformance                                                                                  | 1819 MB            |       |
| fixed leaks attempt 1 + conformance                                                             | 1954 MB            | 4%    |
| fixed leaks attempt 1 + no conformance                                                          | 1618 MB            | 11%   |

## Components Conformance Tests

**Speed metrics::**

_Legend:_

- optimization v1 = fixing react-conformance to consume tsconfig.lib.json for ts solution projects
- optimization v2 = removing creation of TS Program via `ts.createProgram()`.
  - > Note: with optimization v2, optimization v1 is not needed as that's logic is not invoked

| command: `yarn workspace @fluentui/react-text --no-cache --runInBand` | time  | delta | remarks |
| --------------------------------------------------------------------- | ----- | ----- | ------- |
| 1) ts-jest (current state)                                            | 69s   | BASE  |         |
| 2) optimization v1 + ts-jest                                          | 37.43 | 46%   |         |
| 3) optimization v1 + swc                                              | 28.79 | 58%   |         |
| 4) optimization v2 + ts-jest                                          | 20.16 | 71%   |         |
| 5) optimization v2 + swc                                              | 15.10 | 78%   |         |

**Summary:**

From the performance metrics 4th and 5th approach is clear winner in terms of performance.
🥶 Unfortunately, that approach (nor 4 nor 5) cannot be possible achieved with current conformance architecture.

Why?

Because of jest architecture - every test is executed in separate sandbox and executed in parallel( runInBand wont solve anything), thus we cannot cache anything per test scenario (in our case TS program instance) on global level (only serializable data via globalConfig hook).
What's the issue with TS program ? it is re-created on every test for exactly same set of compiler options and files. This has also implication where "bigger codebase of package" === "longer time to execute"

### narrow down TS program

For v9 we use TS path aliases. react-conformance will consume those solution config which cause to load huge trees of programs that inflict big perf slowdown.

We can consume `tsconfig.lib.json` for ts solution projects which will gain us **45% speed boost**

### mitigate need of TS program use

We can do partial rewrite of react-conformance to create TS program via ` removing creation of TS Program via ``ts.createProgram() ` only when necessary (lazily). With that we can get up to 70% speed boost case ( depends on usage of conformance test scenarios )

### architecture rewrite

Our UI controls conformance architecture inflicts one of the the biggest performance impacts (bottleneck). It needs to be rewritten in a way where TS program are created only once - a set of Eslint rules is excellent candidate for this.

## Task runner/s change

Replace gulp and just with nx executors/native node scripts.

Every gulp and just execution takes 2-3 seconds.

> lets say we have 150 projects in monorepo, every project has 4 tasks. If run everything in series only the task runner boot will take 30 minutes (150 x 4 x 3) 🥶

**Example:**

running `yarn workspace @fluentui/react-button build`:

> `build` is executed via just-scripts

| command/task      | time         | delta | remarks                                                                                                                      |
| ----------------- | ------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| just-scripts      | 2-3s         | 25%   | 🔥 / invoking just tasks adds 2-3 seconds in comparison with running those by raw binaries !!!                               |
| copy-compiled     | 0.8s - 1.85s | 15%   | 🔥 / time spent here depends on amount of files and targets that exist (esm/cjs/amd)                                         |
| ts:compile        | 3.0s         | 25%   | invokes tsc 2-3 times (based on target spec)                                                                                 |
| ts:postprocess    | 0.0s         | 0%    | noop                                                                                                                         |
| babel:postprocess | 1.8s         | 14.7% | 🔥 / we do imperative source map creation (why?). Also same transform is executed twice , once for esm output , once for cjs |
| api-extractor     | 2.6s         | 21.3% | long time as expected as it needs to create TSC program similar to ts:compile + run rolluping                                |
|                   |              |       |                                                                                                                              |
| SUM               | 12.25s       |       |                                                                                                                              |

## `e2e` target leveraging TS path aliases for bundling

> TL;DR enable pathAliases processed via esbuild/swc to run e2e without need to build anything. Speed bumps up to 60%

ATM e2e task execution is mixed with bundle and deploy in 1 job. We have setup already in place where we don't need to physically trigger `build` nor `bundle` tasks for `e2e` execution, thus decouple these jobs.

By doing that we can get following speed improvements:

| command: `nx run-many --target=e2e --skip-cache` | time                       | delta | remarks |
| ------------------------------------------------ | -------------------------- | ----- | ------- |
| current                                          | 13m 16s(bundle) + 6m (e2e) | BASE  |         |
| with path aliases                                | 6m 41s (bundle + e2e)      | 65%   |         |

**Solution Suggestion:**

1. Decouple existing `Deploy & E2E` pipeline
2. enable ts path aliases bundling for all e2e and make it part of main (build,test,lint job)

## apps `build` target change

most of application that live within `apps` leverage path aliases with esbuild/swc.

Using that setup for bundling is more than 50% faster then using incremental build based on our repo dependency tree.

**Solution Suggestion:**

We could rename target `build` to `bundle-app`. This would stop triggering `build` on every package on every PR/Release.

## Decoupling dependency tree

Mitigate v8 dependency tree creep which triggers literally all v8 packages "re-builds" on any change (v9)

> TBA: more research needed
>
> partially fixed: https://github.com/microsoft/fluentui/pull/27334

## Enable caching/distributed caching

we execute `build` task multiple times on every separate pipeline. This adds around 4 minutes to every pipeline we ran.

**Solution Suggestion:**

1. using caching would completely mitigate this
2. aggregating everything to 1 pipeline ( no caching needed )

- pros: easy to setup and maintenance/reasoning about for devs what is happening.
- cons: "main build" pipeline would block other pipelines, thus all checks might take longer total time then being executed in parallel

## Cache node_modules (yarn install)

`yarn install` takes significant amount for every pipeline job (up to 1m 30s).

> ATM: we have 2 + 5 + 4 + 3 (14 jobs x 1.5 minutes = 21 minutes of `yarn install` 🥶 x number of PR re-runs on daily basis )

**Solution Suggestion:**

This is a low hanging fruit that can be improved by caching node_modules for `yarn install` (from 2 minutes to 5 seconds)

## Improve master pipeline

On every PR merge (push to master), we run pipelines on default branch (master), which triggers `lint,build,test,type-check` on whole monorepo.

metrics of this approach:

- this has around 56% success rate
- it takes up to 57 minutes (if successful)

**Solution Suggestion:**

There is no need real need to run everything on every push to master.

We should run pipelines only against latest successful merge commit.

`yarn nx affected --targets=build,lint,type-check,test --base=LAST_SUCCESSFUL_SHA --head=HEAD`

# Actionable

- implement proposed suggestions
- create tools to will guard our pipelines to run into these issues again in the future
