# `build`

## Results

**Projects with build target:** 143

**Legend:**

- optimization v1 === disable path aliases for tsc -p tsconfig.lib.json runs
- optimization v2 === enabling `incremental:true` for projects with solution configs. this will have probably no impact on `build` task but should speed up `type-check` as execution for tsconfig.lib.json should be already cached by `build` task which is pre-requirement of `type-check` task
- optimization v3 === just-tasks speed improvements (copy-compiled task speed boost)

| Run type (nx run-many build)         | time    | delta |
| ------------------------------------ | ------- | ----- |
| current / parallel 1                 | 22m 33s |       |
| with optimization v1 / parallel 1    | 20m 5s  | 11%   |
| with optimization v1+v2 / parallel 1 | 20m 33s | x     |
| with optimization v1+v3 / parallel 1 | 20m 27s | x     |
|                                      |         |       |
| current / parallel 8                 | 7m 49s  |       |
| with optimization v1 / parallel 8    | 7m 17s  | 7%    |

## Experiments

### Current task data

> yarn workspace @fluentui/react-button build
>
> build is executed via just-scripts

| command           | time         | delta | remarks                                                                                                                      |
| ----------------- | ------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| just-scripts      | 2-3s         | 25%   | 🔥 / invoking just tasks adds 2-3 seconds in comparison with running those by raw binaries !!!                               |
| copy-compiled     | 0.8s - 1.85s | 15%   | 🔥 / time spent here depends on amount of files and targets that exist (esm/cjs/amd)                                         |
| ts:compile        | 3.0s         | 25%   | invokes tsc 2-3 times (based on target spec)                                                                                 |
| ts:postprocess    | 0.0s         | 0%    | noop                                                                                                                         |
| babel:postprocess | 1.8s         | 14.7% | 🔥 / we do imperative source map creation (why?). Also same transform is executed twice , once for esm output , once for cjs |
| api-extractor     | 2.6s         | 21.3% | long time as expected as it needs to create TSC program similar to ts:compile + run rolluping                                |
|                   |              |       |                                                                                                                              |
| SUM               | 12.25s       |       |                                                                                                                              |

**Notes:**

just-scripts slow processing:

- invoking just adds 2-3 seconds to every task execution. I got the delta confirmation by running same task via native binaries "tsc && api-extractor" vs running those via "just"
- one of reasons why this is so slow is that every `just-scripts` needs to invoked `tsc` behind the scenes to compile all the custom code written in TS to JS. We have no control on how is that being compiled (for example ts-node allows us to use `swc` under the hood which makes TS->Js rather instant )
- what about using `.cache()` for `task()` ? it's a lie https://github.com/microsoft/just/issues/392

nx run-commands executor:

- whilst this is definitely not an 1:1 comparison with current just setup, it can give us at least nx slow-down numbers

**potential improvements:**

- just-scripts

  - use `swc:true` with ts-node (0.5s speed boost) - ts-node config is hardcoded and swc cannot be set
  - using just.config.js with `swc-node/register/register` (0.5 speed boost)

- copy-compiled:

  - use `parallel` (0.3s speed boost)
  - don't use getProjectMetadata (1.2s speed boost)

  | task name     | before | after | delta |
  | ------------- | ------ | ----- | ----- |
  | copy-compiled | 1.85s  | 0.02s | 99%   |
  | just-scripts  | 3s     | 2.5s  | 16.7% |

### disable path aliases for tsc -p tsconfig.lib.json

| Run type ( @fluentui/react-table build) | time | delta  |
| --------------------------------------- | ---- | ------ |
| current                                 | 20s  |        |
| with optimization v1                    | 12s  | 40% 🚅 |

**Summary:**

Delta varies up to 50% speed improvement for v9 packages

### enable incremental for TS

Having `incremental:true` will probably not provide any time benefits for actual `build` (tsc -p tsconfig.lib.json),
but should provide already cached execution for `type-check` task, which should re-use cache and run TSC program check only for other ts configs(spec/e2e/storybook)

> NOTE: this uses already optimization v1 (disable path aliases for tsc -p tsconfig.lib.json)

| Run type ( @fluentui/react-table build & type-check)                       | time   | delta | remarks        |
| -------------------------------------------------------------------------- | ------ | ----- | -------------- |
| current                                                                    | 24.2s  |       |                |
| with optimization 1 (incremental:true)                                     | 21.9s  | 10%   | worth a shot ? |
| with optimization 2 (removing tsconfig.lib.json from references for tsc-b) | 22.5s  |       |                |
| with optimization 1+2                                                      | 21.39s |       |                |

**Summary:**

While delta per package seems good enough (10%) when executed on whole repo there are almost zero time execution benefits

**Update:** looks like the configuration was wrong previously. To be able to achieve caching for `tsconfig.lib.json` it needs to be invoked with same parameters as `generate-api` task which is `emitDeclarationOnly`. With that in place, `type-check` leverages cache from previously run `tsconfig.lib.json` and gives us approx 15% speed bump.

## Local

### Current

> - 145 projects have target:build

> parallel 1

total: 1353s / 22m 33s

> parallel 8

total: 469s / ~7m 49s

**result for `parallel 1`:**

> - parallel 1

Run 2:

```sh
nx run-many --target=build --skip-nx-cache

nx run @fluentui/react-conformance:build (6s)
nx run @fluentui/react-conformance-griffel:build (7s)
nx run @fluentui/set-version:build (4s)
nx run @fluentui/keyboard-keys:build (5s)
nx run @fluentui/react-utilities:build (8s)
nx run @fluentui/react-context-selector:build (7s)
nx run @fluentui/merge-styles:build (6s)
nx run @fluentui/jest-serializer-merge-styles:build (4s)
nx run @fluentui/react-aria:build (8s)
nx run @fluentui/example-data:build (5s)
nx run @fluentui/styles:build (5s)
nx run @fluentui/react-component-event-listener:build (5s)
nx run @fluentui/accessibility:build (6s)
nx run @fluentui/babel-preset-storybook-full-source:build (8s)
nx run @fluentui/test-utilities:build (5s)
nx run @fluentui/react-northstar-styles-renderer:build (6s)
nx run @fluentui/react-component-ref:build (8s)
nx run @fluentui/dom-utilities:build (6s)
nx run @fluentui/utilities:build (7s)
nx run @fluentui/theme:build (7s)
nx run @fluentui/style-utilities:build (7s)
nx run @fluentui/font-icons-mdl2:build (5s)
nx run @fluentui/foundation-legacy:build (8s)
nx run @fluentui/common-styles:build (3s)
nx run @fluentui/docs-components:build (5s)
nx run @fluentui/react-storybook-addon-codesandbox:build (5s)
nx run @fluentui/react-portal-compat-context:build (5s)
nx run @fluentui/a11y-testing:build (4s)
nx run @fluentui/scheme-utilities:build (5s)
nx run @fluentui/react-window-provider:build (6s)
nx run @fluentui/react-hooks:build (7s)
nx run @fluentui/date-time-utilities:build (5s)
nx run @fluentui/state:build (4s)
nx run @fluentui/react-northstar-fela-renderer:build (6s)
🔥🔥 nx run @fluentui/react-bindings:build (16s)
🔥 nx run @fluentui/react-icons-northstar:build (12s)
nx run @fluentui/public-docsite-setup:build (4s)
nx run @fluentui/react-file-type-icons:build (5s)
nx run @fluentui/tokens:build (6s)
nx run @fluentui/react-theme:build (5s)
nx run @fluentui/react-shared-contexts:build (6s)
nx run @fluentui/react-tabster:build (8s)
nx run @fluentui/react-label:build (8s)
nx run @fluentui/react-field:build (10s)
nx run @fluentui/react-portal:build (7s)
🔥 nx run @fluentui/react-button:build (12s)
nx run @fluentui/react-positioning:build (8s)
nx run @fluentui/react-popover:build (10s)
nx run @fluentui/react-provider:build (9s)
nx run @fluentui/react-badge:build (10s)
nx run @fluentui/react-radio:build (10s)
nx run @fluentui/react-tooltip:build (9s)
🔥 nx run @fluentui/react-avatar:build (13s)
nx run @fluentui/react-text:build (10s)
nx run @fluentui/react-divider:build (8s)
nx run @fluentui/react-spinbutton:build (10s)
nx run @fluentui/react-checkbox:build (10s)
nx run @fluentui/react-infobutton:build (11s)
🔥 nx run @fluentui/react-persona:build (12s)
nx run @fluentui/react-input:build (10s)
🔥🔥 nx run @fluentui/react-table:build (17s)
nx run @fluentui/react-storybook-addon:build (9s)
nx run @fluentui/react-image:build (8s)
nx run @fluentui/react-accordion:build (11s)
nx run @fluentui/react-link:build (9s)
nx run @fluentui/react-tabs:build (10s)
nx run @fluentui/react-spinner:build (9s)
nx run @fluentui/react-progress:build (9s)
nx run @fluentui/react-textarea:build (10s)
nx run @fluentui/react-select:build (10s)
nx run @fluentui/react-slider:build (10s)
nx run @fluentui/react-switch:build (10s)
nx run @fluentui/react-dialog:build (11s)
nx run @fluentui/react-card:build (10s)
🔥 nx run @fluentui/react-combobox:build (12s)
🔥 nx run @fluentui/react-menu:build (12s)
🔥 nx run @fluentui/react-toolbar:build (12s)
🔥 nx run @fluentui/react-alert:build (14s)
nx run @fluentui/keyboard-key:build (5s)
nx run @fluentui/react-focus:build (8s)
nx run @fluentui/webpack-utilities:build (4s)
🔥🔥 nx run @fluentui/react:build (19s)
nx run @fluentui/theme-samples:build (5s)
nx run @fluentui/azure-themes:build (6s)
nx run @fluentui/react-experiments:build (10s)
nx run @fluentui/storybook:build (5s)
nx run @fluentui/fluent2-theme:build (6s)
nx run @fluentui/react-component-nesting-registry:build (5s)
nx run @fluentui/priority-overflow:build (6s)
nx run @fluentui/react-proptypes:build (5s)
🔥🔥🔥 nx run @fluentui/react-northstar:build (25s)
🔥🔥 nx run @fluentui/code-sandbox:build (22s)
🔥🔥 nx run @fluentui/react-northstar-prototypes:build (16s)
nx run @fluentui/react-virtualizer:build (8s)
nx run @fluentui/react-overflow:build (7s)
🔥🔥🔥 nx run @fluentui/react-components:build (25s)
nx run @fluentui/monaco-editor:build (7s)
nx run @fluentui/react-monaco-editor:build (6s)
nx run @fluentui/react-docsite-components:build (8s)
nx run @fluentui/react-icon-provider:build (7s)
🔥🔥 nx run @fluentui/react-icons-mdl2:build (17s)
nx run @fluentui/react-charting:build (8s)
nx run @fluentui/react-cards:build (8s)
🔥🔥 nx run @fluentui/react-examples:build (15s)
nx run @fluentui/api-docs:build (3s)
nx run @fluentui/public-docsite-resources:build (6s)
nx run @fluentui/ability-attributes:build (5s)
nx run @fluentui/react-northstar-emotion-renderer:build (5s)
nx run @fluentui/react-telemetry:build (6s)
nx run @fluentui/react-builder:build (8s)
nx run @fluentui/digest:build (2s)
nx run @fluentui/global-context:build (7s)
🔥🔥 nx run @fluentui/react-migration-v0-v9:build (23s)
🔥🔥 nx run @fluentui/react-migration-v8-v9:build (21s)
nx run @fluentui/react-icons-mdl2-branded:build (7s)
nx run @fluentui/web-components:build (13s)
🔥🔥🔥🔥 nx run @fluentui/docs:build (44s)
nx run @fluentui/codemods:build (7s)
nx run @fluentui/my-lib:build (2s)
nx run @fluentui/react-avatar-context:build (5s)
nx run @fluentui/react-breadcrumb:build (8s)
nx run @fluentui/react-theme-sass:build (5s)
nx run @fluentui/react-drawer:build (9s)
nx run @fluentui/react-tags:build (8s)
nx run @fluentui/react-skeleton:build (9s)
🔥 nx run @fluentui/react-tree:build (14s)
nx run @fluentui/perf-test-react-components:build (11s)
🔥 nx run @fluentui/react-datepicker-compat:build (14s)
🔥🔥🔥 nx run @fluentui/vr-tests-react-components:build (26s) # build-storybook
nx run @fluentui/react-date-time:build (6s)
nx run @fluentui/perf-test:build (6s)
nx run @fluentui/local-sandbox:build (6s)
nx run @fluentui/projects-test:build (4s)
🔥🔥 nx run @fluentui/react-data-grid-react-window:build (15s)
🔥🔥 nx run @fluentui/react-portal-compat:build (19s)
🔥🔥 nx run @fluentui/theme-designer:build (22s)
🔥🔥🔥 nx run @fluentui/recipes-react-components:build (30s) # build-storybook
nx run @fluentui/ssr-tests-v9:build (11s)
nx run @fluentui/theming-designer:build (6s)
🔥🔥 nx run @fluentui/vr-tests:build (18s)
nx run @fluentui/ssr-tests:build (11s)
nx run @fluentui/perf-test-northstar:build (2s)
nx run @fluentui/babel-preset-global-context:build (8s)
nx run @fluentui/public-docsite-v9:build (7s)
🔥 nx run @fluentui/public-docsite:build (12s)
```

**slowest from 1st run (not CI=true set -> api-extractor uses declaration files for path-aliases in v9 packages):**

```sh
# NOTE: no CI=true used
nx run-many --target=build --skip-nx-cache

# wc
@fluentui/web-components:build (15s)

# v0
# no api-extractor used
@fluentui/react-icons-northstar:build (15s)
@fluentui/react-bindings:build (20s)
@fluentui/react-northstar-prototypes:build (21s)
@fluentui/code-sandbox:build (29s)
@fluentui/react-northstar:build (2m)

#  v8
@fluentui/react-experiments:build (12s)
@fluentui/ssr-tests:build (14s)
@fluentui/public-docsite:build (15s)
@fluentui/react-examples:build (18s)
@fluentui/vr-tests:build (18s)
@fluentui/react-icons-mdl2:build (20s)
@fluentui/react:build (24s)  # note: this is with using ts-solution configs ( without it would be around 30s)
@fluentui/docs:build (1m)
@fluentui/perf-test:build (2m)


# v9 ish
@fluentui/babel-preset-storybook-full-source:build (13s)

# v9
@fluentui/react-field:build (13s)
@fluentui/react-dialog:build (14s)
@fluentui/react-infobutton:build (15s)
@fluentui/react-combobox:build (15s)
@fluentui/react-toolbar:build (15s)
@fluentui/react-menu:build (16s)
@fluentui/react-button:build (16s)
@fluentui/react-avatar:build (16s)
@fluentui/react-persona:build (16s)
@fluentui/react-datepicker-compat:build (16s)
@fluentui/react-alert:build (17s)
@fluentui/react-tree:build (18s)
@fluentui/react-data-grid-react-window:build (19s)
@fluentui/react-table:build (21s)
@fluentui/react-portal-compat:build (22s)
@fluentui/react-migration-v8-v9:build (26s)
@fluentui/vr-tests-react-components:build (26s)
@fluentui/theme-designer:build (27s)
@fluentui/react-migration-v0-v9:build (28s)
@fluentui/react-components:build (30s)
@fluentui/recipes-react-components:build (33s)
```

### With optimization v1

> - disable TS path aliases for v9 builds

> parallel 1 / 1205s / (CI true/api-extractor won't use path aliases) / s

```sh
nx run @fluentui/react-conformance:build (6s)
nx run @fluentui/react-conformance-griffel:build (7s)
nx run @fluentui/set-version:build (5s)
nx run @fluentui/keyboard-keys:build (6s)
nx run @fluentui/react-utilities:build (8s)
nx run @fluentui/react-context-selector:build (6s)
nx run @fluentui/merge-styles:build (7s)
nx run @fluentui/jest-serializer-merge-styles:build (4s)
nx run @fluentui/react-aria:build (7s)
nx run @fluentui/example-data:build (5s)
nx run @fluentui/styles:build (6s)
nx run @fluentui/react-component-event-listener:build (5s)
nx run @fluentui/accessibility:build (6s)
nx run @fluentui/babel-preset-storybook-full-source:build (9s)
nx run @fluentui/test-utilities:build (5s)
nx run @fluentui/react-northstar-styles-renderer:build (6s)
nx run @fluentui/react-component-ref:build (8s)
nx run @fluentui/dom-utilities:build (6s)
nx run @fluentui/utilities:build (7s)
nx run @fluentui/theme:build (7s)
nx run @fluentui/style-utilities:build (7s)
nx run @fluentui/font-icons-mdl2:build (5s)
nx run @fluentui/foundation-legacy:build (8s)
nx run @fluentui/common-styles:build (3s)
nx run @fluentui/docs-components:build (6s)
nx run @fluentui/react-storybook-addon-codesandbox:build (5s)
nx run @fluentui/react-portal-compat-context:build (6s)
nx run @fluentui/a11y-testing:build (4s)
nx run @fluentui/scheme-utilities:build (6s)
nx run @fluentui/react-window-provider:build (7s)
nx run @fluentui/react-hooks:build (7s)
nx run @fluentui/date-time-utilities:build (5s)
nx run @fluentui/state:build (5s)
nx run @fluentui/react-northstar-fela-renderer:build (7s)
🔥🔥 nx run @fluentui/react-bindings:build (16s) # + build:component-info / 11s tsc (because tsc -b with lot of project references)
🔥 nx run @fluentui/react-icons-northstar:build (12s)
nx run @fluentui/public-docsite-setup:build (4s)
nx run @fluentui/react-file-type-icons:build (5s)
nx run @fluentui/tokens:build (6s)
nx run @fluentui/react-theme:build (5s)
nx run @fluentui/react-shared-contexts:build (7s)
nx run @fluentui/react-tabster:build (7s)
nx run @fluentui/react-label:build (7s)
nx run @fluentui/react-field:build (8s)
nx run @fluentui/react-portal:build (6s)
🔥 nx run @fluentui/react-button:build (11s)
nx run @fluentui/react-positioning:build (7s)
nx run @fluentui/react-popover:build (8s)
nx run @fluentui/react-provider:build (8s)
nx run @fluentui/react-badge:build (8s)
nx run @fluentui/react-radio:build (9s)
nx run @fluentui/react-tooltip:build (8s)
🔥 nx run @fluentui/react-avatar:build (11s)
nx run @fluentui/react-text:build (9s)
nx run @fluentui/react-divider:build (7s)
nx run @fluentui/react-spinbutton:build (8s)
nx run @fluentui/react-checkbox:build (9s)
nx run @fluentui/react-infobutton:build (9s)
nx run @fluentui/react-persona:build (8s)
nx run @fluentui/react-input:build (8s)
🔥 nx run @fluentui/react-table:build (13s)
nx run @fluentui/react-storybook-addon:build (6s)
nx run @fluentui/react-image:build (7s)
nx run @fluentui/react-accordion:build (9s)
nx run @fluentui/react-link:build (8s)
nx run @fluentui/react-tabs:build (8s)
nx run @fluentui/react-spinner:build (8s)
nx run @fluentui/react-progress:build (8s)
nx run @fluentui/react-textarea:build (8s)
nx run @fluentui/react-select:build (8s)
nx run @fluentui/react-slider:build (8s)
nx run @fluentui/react-switch:build (9s)
nx run @fluentui/react-dialog:build (10s)
nx run @fluentui/react-card:build (8s)
nx run @fluentui/react-combobox:build (10s)
🔥 nx run @fluentui/react-menu:build (11s)
nx run @fluentui/react-toolbar:build (8s)
nx run @fluentui/react-alert:build (10s)
nx run @fluentui/keyboard-key:build (6s)
nx run @fluentui/react-focus:build (8s)
nx run @fluentui/webpack-utilities:build (4s)
🔥🔥 nx run @fluentui/react:build (20s)
nx run @fluentui/theme-samples:build (6s)
nx run @fluentui/azure-themes:build (6s)
nx run @fluentui/react-experiments:build (10s)
nx run @fluentui/storybook:build (5s)
nx run @fluentui/fluent2-theme:build (6s)
nx run @fluentui/react-component-nesting-registry:build (5s)
nx run @fluentui/priority-overflow:build (5s)
nx run @fluentui/react-proptypes:build (5s)
🔥🔥🔥 nx run @fluentui/react-northstar:build (25s)
🔥🔥 nx run @fluentui/code-sandbox:build (23s) # has react-northstar and docs-components as project-references (slow TS)
🔥🔥 nx run @fluentui/react-northstar-prototypes:build (17s) # has react-northstar,icons etc as project-references (slow TS)
nx run @fluentui/react-virtualizer:build (7s)
nx run @fluentui/react-overflow:build (6s)
🔥 nx run @fluentui/react-components:build (12s)
nx run @fluentui/monaco-editor:build (7s)
nx run @fluentui/react-monaco-editor:build (6s)
nx run @fluentui/react-docsite-components:build (8s)
nx run @fluentui/react-icon-provider:build (7s)
🔥🔥 nx run @fluentui/react-icons-mdl2:build (17s) # tsc takes  13 seconds !!! if emitDeclaration only is used - reduced to 9 seconds
nx run @fluentui/react-charting:build (8s)
nx run @fluentui/react-cards:build (8s)
🔥🔥 nx run @fluentui/react-examples:build (15s)
nx run @fluentui/api-docs:build (4s)
nx run @fluentui/public-docsite-resources:build (6s)
nx run @fluentui/ability-attributes:build (5s)
nx run @fluentui/react-northstar-emotion-renderer:build (5s)
nx run @fluentui/react-telemetry:build (6s)
nx run @fluentui/react-builder:build (8s)
nx run @fluentui/digest:build (2s)
nx run @fluentui/global-context:build (6s)
🔥 nx run @fluentui/react-migration-v0-v9:build (12s)
nx run @fluentui/react-migration-v8-v9:build (11s)
nx run @fluentui/react-icons-mdl2-branded:build (7s)
🔥 nx run @fluentui/web-components:build (12s)
🔥🔥🔥🔥 nx run @fluentui/docs:build (42s) # webpack + component-info(react-docgen)
nx run @fluentui/codemods:build (7s)
nx run @fluentui/my-lib:build (2s)
nx run @fluentui/react-avatar-context:build (6s)
nx run @fluentui/react-breadcrumb:build (7s)
nx run @fluentui/react-theme-sass:build (5s)
nx run @fluentui/react-drawer:build (7s)
nx run @fluentui/react-tags:build (7s)
nx run @fluentui/react-skeleton:build (8s)
nx run @fluentui/react-tree:build (10s)
🔥 nx run @fluentui/perf-test-react-components:build (12s)
nx run @fluentui/react-datepicker-compat:build (11s)
🔥🔥 nx run @fluentui/vr-tests-react-components:build (24s) # build-storybook
nx run @fluentui/react-date-time:build (6s)
nx run @fluentui/perf-test:build (6s)
nx run @fluentui/local-sandbox:build (6s)
nx run @fluentui/projects-test:build (4s)
nx run @fluentui/react-data-grid-react-window:build (8s)
nx run @fluentui/react-portal-compat:build (6s)
nx run @fluentui/theme-designer:build (11s)
🔥🔥🔥 nx run @fluentui/recipes-react-components:build (28s) # build-storybook
nx run @fluentui/ssr-tests-v9:build (9s)
nx run @fluentui/theming-designer:build (6s)
🔥🔥 nx run @fluentui/vr-tests:build (17s) # build-storybook
nx run @fluentui/ssr-tests:build (11s)
nx run @fluentui/perf-test-northstar:build (1s)
nx run @fluentui/babel-preset-global-context:build (8s)
nx run @fluentui/public-docsite-v9:build (7s)
🔥 nx run @fluentui/public-docsite:build (12s)
```

## Using TS solution configs for v8,v0

### @fluentui/react

> tsc -p tsconfig.lib.json - means solution config style is used - ts include is narrowed down to impl files only (also stricter global typings)

| Run                                                              | time   | delta  | remarks                                          |
| ---------------------------------------------------------------- | ------ | ------ | ------------------------------------------------ |
| yarn workspace @fluentui/react tsc                               | 12s    |        |                                                  |
| yarn workspace @fluentui/react tsc -p tsconfig.lib.json          | 6.5s   | 46% 🚅 |                                                  |
| yarn workspace @fluentui/react tsc -b tsconfig.json              | 10.46s | 12.8%  | in reality we need -b exec with solution configs |
| ---                                                              |        |        |                                                  |
| yarn workspace @fluentui/utilities tsc                           | 3.10s  |        |                                                  |
| yarn workspace @fluentui/utilities tsc -p tsconfig.lib.json      | 2.59s  | 16%    |                                                  |
| ---                                                              |        |        |                                                  |
| yarn workspace @fluentui/react-examples tsc                      | 12.73s |        |                                                  |
| yarn workspace @fluentui/react-examples tsc -p tsconfig.lib.json | ?s     | ?%     |                                                  |
| ---                                                              |        |        |                                                  |
| yarn workspace @fluentui/react-charting tsc                      | 4.62s  |        |                                                  |
| yarn workspace @fluentui/react-charting tsc -p tsconfig.lib.json | ?s     | ?%     |                                                  |

**Summary (ts solution configs):**

Based on data metrics ts solution configs for old projects (v8) will give use approx 46% speed boost for `build` task.
Even better production file will be properly narrowed in sense of TSC context this giving us better/real state of ECMA features used in these old libraries.

**Various emit modes (with TS solution config)**

| Run: @fluentui/react tsc -p tsconfig.lib.json | time   | delta   |
| --------------------------------------------- | ------ | ------- |
| declaration: true                             | 10.24s |         |
| declaration: false (transpile only mode)      | 9.48s  |         |
| declaration: false (transpile only with swc)  | 0.3s   |         |
| emitDeclarationOnly: true                     | 7.51s  | % 26 🚅 |

**Summary (emit modes):**

Based on data metrics using swc for transpilation and tsc only for type declaration will give us approx 26% speed boost for `build` task. Besides of measured "time to run" metrics, using ts only for type declaration generation will also use less memory/CPU as we wont execute full TSC 3 times to produce both `js` and `.d.ts` output.

> TSC will be executed only once (also there is no difference between type declaration for different module formats), while swc 2(3 for amd) times (tsc --1-> es6 --2-> cjs --(3)-->amd).

### @fluentui/react-northstar

| Run: yarn workspace @fluentui/react-northstar tsc -b -f tsconfig.json | time | delta |
| --------------------------------------------------------------------- | ---- | ----- |
| current                                                               | 27s  |       |
| emitDeclarationOnly: true                                             | 26s  |       |
| narrowed `"include" in all packages`                                  | 25s  |       |
| narrowed `"include" in all packages` + emitDeclarationOnly            | 23s  |       |
