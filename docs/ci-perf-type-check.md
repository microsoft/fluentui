# `type-check`

## Results

**Projects with type-check:** 105

**Legend:**

- optimization === disable path aliases for `tsc -b` runs

| Run type                       | time    | delta    |
| ------------------------------ | ------- | -------- |
| current / parallel 1           | 16m 41s |          |
| with optimization / parallel 1 | 9m 57s  | 40,4% 🚅 |
|                                |         |          |
| current / parallel 8           | 3m 20s  |          |
| with optimization / parallel 8 | 2m 12s  | 34% 🚅   |

## Local

### current (no optimization)

> - type-check parallel 1
> - ? projects have target:type-check

total: 1001.36s / ~16m 41s

> type-check parallel 8

total: 200.00s / ~3m 20s

**result for `parallel 1`:**

```
nx run-many --target=type-check --skip-nx-cache

    ✔  nx run @fluentui/scripts-utils:type-check (2s)
    ✔  nx run @fluentui/scripts-monorepo:type-check (2s)
    ✔  nx run @fluentui/scripts-prettier:type-check (2s)
    ✔  nx run @fluentui/scripts-tasks:type-check (2s)
    ✔  nx run @fluentui/scripts-api-extractor:type-check (1s)
    ✔  nx run @fluentui/scripts-jest:type-check (2s)
    ✔  nx run @fluentui/keyboard-keys:type-check (999ms)
    ✔  nx run @fluentui/react-utilities:type-check (4s)
    ✔  nx run @fluentui/tokens:type-check (2s)
🔥    ✔  nx run @fluentui/react-theme:type-check (12s)
    ✔  nx run @fluentui/react-conformance-griffel:type-check (2s)
    ✔  nx run @fluentui/react-shared-contexts:type-check (996ms)
    ✔  nx run @fluentui/scripts-cypress:type-check (2s)
    ✔  nx run @fluentui/scripts-webpack:type-check (2s)
    ✔  nx run @fluentui/react-context-selector:type-check (3s)
    ✔  nx run @fluentui/react-tabster:type-check (3s)
    ✔  nx run @fluentui/react-portal-compat-context:type-check (1s)
    ✔  nx run @fluentui/scripts-puppeteer:type-check (2s)
    ✔  nx run @fluentui/scripts-projects-test:type-check (2s)
🔥    ✔  nx run @fluentui/react-label:type-check (14s)
    ✔  nx run @fluentui/scripts-babel:type-check (2s)
🔥    ✔  nx run @fluentui/react-field:type-check (14s)
🔥    ✔  nx run @fluentui/react-aria:type-check (13s)
    ✔  nx run @fluentui/scripts-gulp:type-check (3s)
🔥    ✔  nx run @fluentui/react-portal:type-check (15s)
    ✔  nx run @fluentui/react-positioning:type-check (3s)
🔥    ✔  nx run @fluentui/react-popover:type-check (16s)
🔥    ✔  nx run @fluentui/react-tooltip:type-check (14s)
🔥    ✔  nx run @fluentui/react-badge:type-check (14s)
🔥    ✔  nx run @fluentui/react-avatar:type-check (18s)
🔥    ✔  nx run @fluentui/react-button:type-check (15s)
🔥    ✔  nx run @fluentui/react-provider:type-check (14s)
🔥    ✔  nx run @fluentui/react-radio:type-check (14s)
🔥    ✔  nx run @fluentui/react-text:type-check (14s)
🔥    ✔  nx run @fluentui/react-infobutton:type-check (17s)
🔥    ✔  nx run @fluentui/react-spinbutton:type-check (14s)
🔥    ✔  nx run @fluentui/react-checkbox:type-check (14s)
🔥    ✔  nx run @fluentui/react-divider:type-check (14s)
🔥    ✔  nx run @fluentui/react-persona:type-check (15s)
🔥    ✔  nx run @fluentui/react-input:type-check (14s)
    ✔  nx run @fluentui/priority-overflow:type-check (2s)
🔥    ✔  nx run @fluentui/react-accordion:type-check (14s)
🔥    ✔  nx run @fluentui/react-combobox:type-check (15s)
🔥    ✔  nx run @fluentui/react-progress:type-check (14s)
🔥    ✔  nx run @fluentui/react-textarea:type-check (14s)
🔥    ✔  nx run @fluentui/react-spinner:type-check (14s)
🔥🔥    ✔  nx run @fluentui/react-toolbar:type-check (19s)
🔥🔥    ✔  nx run @fluentui/react-dialog:type-check (22s)
🔥    ✔  nx run @fluentui/react-select:type-check (14s)
🔥    ✔  nx run @fluentui/react-slider:type-check (14s)
🔥    ✔  nx run @fluentui/react-switch:type-check (14s)
🔥    ✔  nx run @fluentui/react-image:type-check (13s)
🔥🔥🔥    ✔  nx run @fluentui/react-table:type-check (29s)
🔥🔥    ✔  nx run @fluentui/react-card:type-check (20s)
🔥    ✔  nx run @fluentui/react-link:type-check (14s)
🔥    ✔  nx run @fluentui/react-menu:type-check (17s)
🔥    ✔  nx run @fluentui/react-tabs:type-check (15s)
🔥    ✔  nx run @fluentui/react-virtualizer:type-check (16s)
🔥    ✔  nx run @fluentui/react-overflow:type-check (16s)
🔥    ✔  nx run @fluentui/react-alert:type-check (13s)
🔥🔥🔥    ✔  nx run @fluentui/react-components:type-check (33s)
    ✔  nx run @fluentui/babel-preset-storybook-full-source:type-check (4s)
    ✔  nx run @fluentui/scripts-storybook:type-check (4s)
    ✔  nx run @fluentui/react-storybook-addon-codesandbox:type-check (2s)
🔥    ✔  nx run @fluentui/react-storybook-addon:type-check (14s)
    ✔  nx run @fluentui/scripts-github:type-check (2s)
🔥🔥🔥    ✔  nx run @fluentui/react-migration-v0-v9:type-check (33s)
🔥🔥🔥    ✔  nx run @fluentui/react-migration-v8-v9:type-check (32s)
    ✔  nx run @fluentui/global-context:type-check (5s)
🔥    ✔  nx run @fluentui/react-data-grid-react-window:type-check (14s)
    ✔  nx run @fluentui/babel-preset-global-context:type-check (6s)
🔥    ✔  nx run @fluentui/react-datepicker-compat:type-check (19s)
    ✔  nx run @fluentui/react-avatar-context:type-check (1s)
🔥    ✔  nx run @fluentui/react-portal-compat:type-check (18s)
    ✔  nx run @fluentui/react-breadcrumb:type-check (7s)
    ✔  nx run @fluentui/react-theme-sass:type-check (2s)
🔥    ✔  nx run @fluentui/react-skeleton:type-check (15s)
🔥🔥    ✔  nx run @fluentui/theme-designer:type-check (22s)
    ✔  nx run @fluentui/react-drawer:type-check (8s)
    ✔  nx run @fluentui/ts-minbar-test-react-components:type-check (2s)
    ✔  nx run @fluentui/react-tags:type-check (7s)
🔥🔥    ✔  nx run @fluentui/react-tree:type-check (22s)
🔥    ✔  nx run @fluentui/vr-tests-react-components:type-check (13s)
    ✔  nx run @fluentui/recipes-react-components:type-check (1s)
    ✔  nx run @fluentui/scripts-update-release-notes:type-check (2s)
    ✔  nx run @fluentui/ts-minbar-test-react:type-check (2s)
    ✔  nx run @fluentui/scripts-fluentui-publish:type-check (1s)
    ✔  nx run @fluentui/scripts-package-manager:type-check (2s)
    ✔  nx run @fluentui/react-18-tests-v8:type-check (2s)
    ✔  nx run @fluentui/react-18-tests-v9:type-check (2s)
    ✔  nx run @fluentui/cra-template:type-check (3s)
    ✔  nx run @fluentui/bundle-size:type-check (3s)
    ✔  nx run @fluentui/pr-deploy-site:type-check (3s)
    ✔  nx run @fluentui/scripts-lint-staged:type-check (2s)
    ✔  nx run @fluentui/scripts-generators:type-check (2s)
    ✔  nx run @fluentui/scripts-triage-bot:type-check (2s)
🔥🔥    ✔  nx run @fluentui/ssr-tests-v9:type-check (25s)
    ✔  nx run @fluentui/scripts-beachball:type-check (2s)
    ✔  nx run @fluentui/scripts-executors:type-check (3s)
🔥    ✔  nx run @fluentui/stress-test:type-check (13s)
    ✔  nx run @fluentui/scripts-dangerjs:type-check (2s)
    ✔  nx run @fluentui/scripts-ts-node:type-check (1s)
🔥    ✔  nx run @fluentui/vr-tests:type-check (10s)
    ✔  nx run @fluentui/typings:type-check (1s)
    ✔  nx run @fluentui/nx-workspace-tools:type-check (2s)
```

### Summary:

Disabling TS Path aliases for `tsc -b` execution reduces type-check time 4-5x !

@fluentui/react-migration-v8-v9 type-check / 32s -> 6s
@fluentui/react-dialog / 22s -> 6s

## Local (After improvements)

> custom type-check command in place that disables path aliases. relies on dts being generated prior to execution.

> type-check parallel 1

total: 597.71s / ~9m 57s

> type-check parallel 8

total: 132.00s / ~2m 12s

**result for `parallel 1`:**

```
nx run-many --target=type-check --skip-nx-cache

 ✔  nx run @fluentui/scripts-utils:type-check (1s)
    ✔  nx run @fluentui/scripts-monorepo:type-check (2s)
    ✔  nx run @fluentui/scripts-prettier:type-check (1s)
    ✔  nx run @fluentui/scripts-tasks:type-check (2s)
    ✔  nx run @fluentui/scripts-api-extractor:type-check (1s)
    ✔  nx run @fluentui/scripts-jest:type-check (2s)
    ✔  nx run @fluentui/keyboard-keys:type-check (4s)
    ✔  nx run @fluentui/react-utilities:type-check (7s)
    ✔  nx run @fluentui/tokens:type-check (4s)
    ✔  nx run @fluentui/react-theme:type-check (7s)
    ✔  nx run @fluentui/react-conformance-griffel:type-check (5s)
    ✔  nx run @fluentui/react-shared-contexts:type-check (4s)
    ✔  nx run @fluentui/scripts-cypress:type-check (1s)
    ✔  nx run @fluentui/scripts-webpack:type-check (1s)
    ✔  nx run @fluentui/react-context-selector:type-check (4s)
    ✔  nx run @fluentui/react-tabster:type-check (5s)
    ✔  nx run @fluentui/react-portal-compat-context:type-check (4s)
    ✔  nx run @fluentui/scripts-puppeteer:type-check (2s)
    ✔  nx run @fluentui/scripts-projects-test:type-check (1s)
    ✔  nx run @fluentui/react-label:type-check (7s)
    ✔  nx run @fluentui/scripts-babel:type-check (1s)
    ✔  nx run @fluentui/react-field:type-check (8s)
    ✔  nx run @fluentui/react-aria:type-check (7s)
    ✔  nx run @fluentui/scripts-gulp:type-check (1s)
    ✔  nx run @fluentui/react-portal:type-check (7s)
    ✔  nx run @fluentui/react-positioning:type-check (5s)
    ✔  nx run @fluentui/react-popover:type-check (8s)
    ✔  nx run @fluentui/react-tooltip:type-check (8s)
    ✔  nx run @fluentui/react-badge:type-check (8s)
    ✔  nx run @fluentui/react-avatar:type-check (11s)
    ✔  nx run @fluentui/react-button:type-check (11s)
    ✔  nx run @fluentui/react-provider:type-check (8s)
    ✔  nx run @fluentui/react-radio:type-check (9s)
    ✔  nx run @fluentui/react-text:type-check (9s)
    ✔  nx run @fluentui/react-infobutton:type-check (8s)
    ✔  nx run @fluentui/react-spinbutton:type-check (8s)
    ✔  nx run @fluentui/react-checkbox:type-check (8s)
    ✔  nx run @fluentui/react-divider:type-check (7s)
    ✔  nx run @fluentui/react-persona:type-check (7s)
    ✔  nx run @fluentui/react-input:type-check (8s)
    ✔  nx run @fluentui/priority-overflow:type-check (4s)
    ✔  nx run @fluentui/react-accordion:type-check (8s)
    ✔  nx run @fluentui/react-combobox:type-check (10s)
    ✔  nx run @fluentui/react-progress:type-check (7s)
    ✔  nx run @fluentui/react-textarea:type-check (7s)
    ✔  nx run @fluentui/react-spinner:type-check (8s)
    ✔  nx run @fluentui/react-toolbar:type-check (8s)
    ✔  nx run @fluentui/react-dialog:type-check (9s)
    ✔  nx run @fluentui/react-select:type-check (8s)
    ✔  nx run @fluentui/react-slider:type-check (7s)
    ✔  nx run @fluentui/react-switch:type-check (8s)
    ✔  nx run @fluentui/react-image:type-check (7s)
    ✔  nx run @fluentui/react-table:type-check (14s)
    ✔  nx run @fluentui/react-card:type-check (9s)
    ✔  nx run @fluentui/react-link:type-check (7s)
    ✔  nx run @fluentui/react-menu:type-check (10s)
    ✔  nx run @fluentui/react-tabs:type-check (9s)
    ✔  nx run @fluentui/react-virtualizer:type-check (7s)
    ✔  nx run @fluentui/react-overflow:type-check (7s)
    ✔  nx run @fluentui/react-alert:type-check (9s)
    ✔  nx run @fluentui/react-components:type-check (9s)
    ✔  nx run @fluentui/babel-preset-storybook-full-source:type-check (6s)
    ✔  nx run @fluentui/scripts-storybook:type-check (3s)
    ✔  nx run @fluentui/react-storybook-addon-codesandbox:type-check (4s)
    ✔  nx run @fluentui/react-storybook-addon:type-check (7s)
    ✔  nx run @fluentui/scripts-github:type-check (1s)
    ✔  nx run @fluentui/react-migration-v0-v9:type-check (11s)
    ✔  nx run @fluentui/react-migration-v8-v9:type-check (10s)
    ✔  nx run @fluentui/global-context:type-check (4s)
    ✔  nx run @fluentui/react-data-grid-react-window:type-check (7s)
    ✔  nx run @fluentui/babel-preset-global-context:type-check (7s)
    ✔  nx run @fluentui/react-datepicker-compat:type-check (8s)
    ✔  nx run @fluentui/react-avatar-context:type-check (3s)
    ✔  nx run @fluentui/react-portal-compat:type-check (5s)
    ✔  nx run @fluentui/react-breadcrumb:type-check (7s)
    ✔  nx run @fluentui/react-theme-sass:type-check (4s)
    ✔  nx run @fluentui/react-skeleton:type-check (7s)
    ✔  nx run @fluentui/theme-designer:type-check (9s)
    ✔  nx run @fluentui/react-drawer:type-check (7s)
    ✔  nx run @fluentui/ts-minbar-test-react-components:type-check (2s)
    ✔  nx run @fluentui/react-tags:type-check (6s)
    ✔  nx run @fluentui/react-tree:type-check (8s)
    ✔  nx run @fluentui/vr-tests-react-components:type-check (13s)
    ✔  nx run @fluentui/recipes-react-components:type-check (6s)
    ✔  nx run @fluentui/scripts-update-release-notes:type-check (1s)
    ✔  nx run @fluentui/ts-minbar-test-react:type-check (2s)
    ✔  nx run @fluentui/scripts-fluentui-publish:type-check (1s)
    ✔  nx run @fluentui/scripts-package-manager:type-check (949ms)
    ✔  nx run @fluentui/react-18-tests-v8:type-check (6s)
    ✔  nx run @fluentui/react-18-tests-v9:type-check (5s)
    ✔  nx run @fluentui/cra-template:type-check (2s)
    ✔  nx run @fluentui/bundle-size:type-check (2s)
    ✔  nx run @fluentui/pr-deploy-site:type-check (3s)
    ✔  nx run @fluentui/scripts-lint-staged:type-check (1s)
    ✔  nx run @fluentui/scripts-generators:type-check (2s)
    ✔  nx run @fluentui/scripts-triage-bot:type-check (2s)
    ✔  nx run @fluentui/ssr-tests-v9:type-check (10s)
    ✔  nx run @fluentui/scripts-beachball:type-check (2s)
    ✔  nx run @fluentui/scripts-executors:type-check (2s)
    ✔  nx run @fluentui/stress-test:type-check (13s)
    ✔  nx run @fluentui/scripts-dangerjs:type-check (1s)
    ✔  nx run @fluentui/scripts-ts-node:type-check (1s)
    ✔  nx run @fluentui/vr-tests:type-check (10s)
    ✔  nx run @fluentui/typings:type-check (1s)
    ✔  nx run @fluentui/nx-workspace-tools:type-check (2s)
```

## Leveraging `incremental`

| Run: yarn workspace @fluentui/react-table tsc -b                     | time                    | delta  |
| -------------------------------------------------------------------- | ----------------------- | ------ |
| current                                                              | 27.73s                  |        |
| with incremental: true / 1st(cold) run                               | 27.73s                  |        |
| with incremental: true / 2nd run                                     | 4.4s                    |        |
| --                                                                   |                         |        |
| current / (tsc -p tsconfig.lib + tsc -b tsconfig.json)               | (6.86s + 22.32s) 29.18s | 34%    |
| with incremental:true / (tsc -p tsconfig.lib + tsc -b tsconfig.json) | (6.83s + 18.07) 24.9s   | 15% 🚅 |

## Leveraging "build react-components first and remap path aliases to those d.ts"

_experiment:_ using path aliasing to .d.ts (not rolluped ones):

1. generate d.ts for react-components (vNext tagged libraries)
2. create path aliases configuration to point to those d.ts
3. run `type-check`

> what does "create path aliases configuration to point to those d.ts mean ?

```diff
- "@fluentui/babel-preset-global-context": ["packages/react-components/babel-preset-global-context/src/index.ts"],
+ "@fluentui/babel-preset-global-context": ["dist/out-tsc/types/packages/react-components/babel-preset-global-context/src/index.d.ts"],
```

| Run: yarn workspace @fluentui/react-table tsc -b | time   | delta  |
| ------------------------------------------------ | ------ | ------ |
| current                                          | 34.20s |        |
| with react-components remapped aliases to d/ts   | 10.88s | 32% 🚅 |
