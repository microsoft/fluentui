## test

## Results

**Projects with test target:** 150

| Run type                                                                                                        | time    | delta | remarks |
| --------------------------------------------------------------------------------------------------------------- | ------- | ----- | ------- |
| 1. nx run-many --target=test --parallel=4                                                                       | 26m 9s  |       |         |
| 2. nx run-many --target=test --parallel=8 --maxWorkers=4                                                        | 23m 34s |       | 🚅      |
| 3. nx run-many --target=test --parallel=8 --maxWorkers=2                                                        | 25m 34s |       |         |
| 4. nx run-many --target=test --parallel=8 --maxWorkers=4 && v9 jest has maxWorkers=4                            | 29m 11s |       |         |
| 5. nx run-many --target=test --parallel=8 --maxWorkers=4 && v9 jest has maxWorkers=4 && ts-jest isolatedModules | 31m 56s |       |         |

(5.) - this doesn't make any sense, the test time should have been the same as the fastest or even faster (23m)

### Local

> - parallel 1, maxWorkers=default
> - ? projects have target:test

```
nx run-many --target=test --skip-nx-cache

✔  nx run @fluentui/scripts-utils:test (2s)
✔  nx run @fluentui/scripts-monorepo:test (2s)
✔  nx run @fluentui/scripts-prettier:test (1s)
✔  nx run @fluentui/eslint-plugin:test (4s)
✔  nx run @fluentui/scripts-tasks:test (3s)
✔  nx run @fluentui/scripts-api-extractor:test (2s)
✔  nx run @fluentui/scripts-jest:test (3s)
✔  nx run @fluentui/react-conformance:test (20s)
✔  nx run @fluentui/keyboard-keys:test (2s)
✔  nx run @fluentui/react-utilities:test (3s)
✔  nx run @fluentui/tokens:test (3s)
✔  nx run @fluentui/react-theme:test (2s)
✔  nx run @fluentui/set-version:test (3s)
✔  nx run @fluentui/react-conformance-griffel:test (2s)
✔  nx run @fluentui/react-shared-contexts:test (2s)
✔  nx run @fluentui/dom-utilities:test (6s)
✔  nx run @fluentui/scripts-cypress:test (2s)
✔  nx run @fluentui/scripts-webpack:test (2s)
✔  nx run @fluentui/react-context-selector:test (3s)
✔  nx run @fluentui/react-tabster:test (2s)
✔  nx run @fluentui/test-utilities:test (6s)
✔  nx run @fluentui/merge-styles:test (8s)
✔  nx run @fluentui/jest-serializer-merge-styles:test (6s)
✔  nx run @fluentui/react-portal-compat-context:test (2s)
✔  nx run @fluentui/utilities:test (10s)
✔  nx run @fluentui/scripts-puppeteer:test (2s)
✔  nx run @fluentui/theme:test (7s)
✔  nx run @fluentui/style-utilities:test (6s)
✔  nx run @fluentui/scripts-projects-test:test (2s)
✔  nx run @fluentui/react-label:test (3s)
✔  nx run @fluentui/scripts-babel:test (2s)
✔  nx run @fluentui/react-field:test (5s)
✔  nx run @fluentui/react-aria:test (3s)
✔  nx run @fluentui/scripts-gulp:test (2s)
✔  nx run @fluentui/react-portal:test (4s)
✔  nx run @fluentui/react-window-provider:test (6s)
✔  nx run @fluentui/keyboard-key:test (5s)
✔  nx run @fluentui/react-positioning:test (4s)
✔  nx run @fluentui/date-time-utilities:test (7s)
✔  nx run @fluentui/foundation-legacy:test (7s)
✔  nx run @fluentui/font-icons-mdl2:test (3s)
✔  nx run @fluentui/example-data:test (3s)
✔  nx run @fluentui/react-focus:test (8s)
✔  nx run @fluentui/react-hooks:test (8s)
🔥 ✔  nx run @fluentui/react:test (1m)
✔  nx run @fluentui/react-popover:test (5s)
✔  nx run @fluentui/react-tooltip:test (3s)
✔  nx run @fluentui/react-badge:test (5s)
✔  nx run @fluentui/styles:test (8s)
✔  nx run @fluentui/react-avatar:test (6s)
✔  nx run @fluentui/react-button:test (7s)
✔  nx run @fluentui/react-component-event-listener:test (7s)
✔  nx run @fluentui/react-northstar-fela-renderer:test (7s)
✔  nx run @fluentui/react-component-ref:test (7s)
✔  nx run @fluentui/accessibility:test (10s)
✔  nx run @fluentui/react-provider:test (5s)
✔  nx run @fluentui/react-radio:test (6s)
✔  nx run @fluentui/react-text:test (10s)
✔  nx run @fluentui/react-bindings:test (13s)
✔  nx run @fluentui/react-infobutton:test (5s)
✔  nx run @fluentui/react-spinbutton:test (6s)
✔  nx run @fluentui/react-checkbox:test (5s)
✔  nx run @fluentui/react-divider:test (4s)
✔  nx run @fluentui/react-persona:test (5s)
✔  nx run @fluentui/react-input:test (4s)
✔  nx run @fluentui/react-component-nesting-registry:test (6s)
✔  nx run @fluentui/priority-overflow:test (3s)
✔  nx run @fluentui/react-accordion:test (7s)
✔  nx run @fluentui/react-combobox:test (9s)
✔  nx run @fluentui/react-progress:test (5s)
✔  nx run @fluentui/react-textarea:test (5s)
✔  nx run @fluentui/react-icons-northstar:test (13s)
✔  nx run @fluentui/react-spinner:test (4s)
✔  nx run @fluentui/react-toolbar:test (8s)
✔  nx run @fluentui/react-dialog:test (8s)
✔  nx run @fluentui/react-select:test (6s)
✔  nx run @fluentui/react-slider:test (5s)
✔  nx run @fluentui/react-switch:test (5s)
✔  nx run @fluentui/react-image:test (4s)
✔  nx run @fluentui/react-table:test (13s)
✔  nx run @fluentui/react-card:test (4s)
✔  nx run @fluentui/react-link:test (4s)
✔  nx run @fluentui/react-menu:test (10s)
✔  nx run @fluentui/react-tabs:test (5s)
✔  nx run @fluentui/react-proptypes:test (7s)
✔  nx run @fluentui/react-virtualizer:test (2s)
✔  nx run @fluentui/react-overflow:test (3s)
🔥 ✔  nx run @fluentui/react-alert:test (17m) 🚨🚨🚨 / takes 8s when run independently
🔥 ✔  nx run @fluentui/react-northstar:test (5m)
✔  nx run @fluentui/react-components:test (8s)
✔  nx run @fluentui/babel-preset-storybook-full-source:test (6s)
✔  nx run @fluentui/scripts-storybook:test (14s)
✔  nx run @fluentui/react-icon-provider:test (10s)
✔  nx run @fluentui/react-monaco-editor:test (11s)
🔥 ✔  nx run @fluentui/react-icons-mdl2:test (16m) 🚨🚨🚨 / takes 20s when run independently
✔  nx run @fluentui/react-docsite-components:test (7s)
✔  nx run @fluentui/react-experiments:test (8s)
✔  nx run @fluentui/react-storybook-addon-codesandbox:test (2s)
✔  nx run @fluentui/react-file-type-icons:test (6s)
✔  nx run @fluentui/react-charting:test (13s)
✔  nx run @fluentui/react-cards:test (6s)
✔  nx run @fluentui/react-storybook-addon:test (2s)
✔  nx run @fluentui/api-docs:test (3s)
✔  nx run @fluentui/react-northstar-emotion-renderer:test (7s)
🔥 ✔  nx run @fluentui/react-builder:test (17s)
✔  nx run @fluentui/scripts-github:test (2s)
✔  nx run @fluentui/react-migration-v0-v9:test (9s)
✔  nx run @fluentui/react-migration-v8-v9:test (2s)
✔  nx run @fluentui/global-context:test (3s)
✔  nx run @fluentui/digest:test (1s)
✔  nx run @fluentui/web-components:test (6s)
✔  nx run @fluentui/react-data-grid-react-window:test (2s)
✔  nx run @fluentui/babel-preset-global-context:test (2s)
✔  nx run @fluentui/react-datepicker-compat:test (2s)
✔  nx run @fluentui/react-avatar-context:test (1s)
✔  nx run @fluentui/react-portal-compat:test (3s)
✔  nx run @fluentui/react-breadcrumb:test (3s)
✔  nx run @fluentui/react-theme-sass:test (2s)
✔  nx run @fluentui/react-skeleton:test (4s)
✔  nx run @fluentui/theme-designer:test (2s)
✔  nx run @fluentui/react-drawer:test (3s)
✔  nx run @fluentui/perf-test-northstar:test (1s)
🔥 ✔  nx run @fluentui/ts-minbar-test-react-components:test (36s)
✔  nx run @fluentui/react-tags:test (4s)
✔  nx run @fluentui/react-tree:test (6s)
✔  nx run @fluentui/circulars-test:test (6s)
🔥 ✔  nx run @fluentui/projects-test:test (5m)
✔  nx run @fluentui/vr-tests-react-components:test (8s)
✔  nx run @fluentui/scripts-update-release-notes:test (2s)
🔥 ✔  nx run @fluentui/ts-minbar-test-react:test (42s)
✔  nx run @fluentui/scripts-fluentui-publish:test (1s)
✔  nx run @fluentui/scripts-package-manager:test (2s)
✔  nx run @fluentui/react-18-tests-v8:test (3s)
✔  nx run @fluentui/react-18-tests-v9:test (4s)
✔  nx run @fluentui/theming-designer:test (3s)
🔥 ✔  nx run @fluentui/cra-template:test (2m)
✔  nx run @fluentui/bundle-size:test (3s)
✔  nx run @fluentui/public-docsite:test (4s)
✔  nx run @fluentui/scripts-lint-staged:test (2s)
✔  nx run @fluentui/scripts-generators:test (3s)
✔  nx run @fluentui/scripts-triage-bot:test (3s)
✔  nx run @fluentui/ssr-tests-v9:test (9s)
🔥 ✔  nx run @fluentui/codemods:test (20s)
✔  nx run @fluentui/scripts-beachball:test (11s)
✔  nx run @fluentui/scripts-executors:test (3s)
✔  nx run @fluentui/scripts-dangerjs:test (1s)
✔  nx run @fluentui/my-lib:test (3s)
✔  nx run @fluentui/scripts-ts-node:test (1s)
✔  nx run @fluentui/ssr-tests:test (6s)
✔  nx run @fluentui/nx-workspace-tools:test (3s)
```

## whole pipeline with test optimization v1

**Total:** lage test / 33m 37.51s

```
lage build test lint type-check


@fluentui/pr-deploy-site lint ✔️ done  - 4.16s

@fluentui/digest build ✔️ done  - 6.06s

@fluentui/public-docsite-resources lint ✔️ done  - 9.54s

@fluentui/perf-test-react-components lint ✔️ done  - 15.36s

@fluentui/perf-test lint ✔️ done  - 16.57s

@fluentui/public-docsite-v9 lint ✔️ done  - 15.91s

@fluentui/public-docsite lint ✔️ done  - 24.72s

@fluentui/react-18-tests-v8 lint ✔️ done  - 19.86s

@fluentui/react-18-tests-v9 lint ✔️ done  - 22.72s

@fluentui/recipes-react-components lint ✔️ done  - 17.12s

@fluentui/theming-designer lint ✔️ done  - 15.28s

@fluentui/ssr-tests-v9 lint ✔️ done  - 24.02s

@fluentui/vr-tests lint ✔️ done  - 17.50s

@fluentui/api-docs lint ✔️ done  - 10.71s

@fluentui/a11y-testing lint ✔️ done  - 11.03s

@fluentui/bundle-size lint ✔️ done  - 4.70s

@fluentui/vr-tests-react-components lint ✔️ done  - 19.54s

@fluentui/web-components build ✔️ done  - 49.87s

@fluentui/azure-themes lint ✔️ done  - 17.53s

@fluentui/cra-template lint ✔️ done  - 9.87s

@fluentui/dom-utilities lint ✔️ done  - 9.40s

@fluentui/date-time-utilities lint ✔️ done  - 11.81s

@fluentui/eslint-plugin lint ✔️ done  - 11.24s

@fluentui/codemods lint ✔️ done  - 15.00s

@fluentui/example-data lint ✔️ done  - 8.91s

@fluentui/font-icons-mdl2 lint ✔️ done  - 9.51s

@fluentui/jest-serializer-merge-styles lint ✔️ done  - 7.92s

@fluentui/keyboard-key lint ✔️ done  - 9.17s

@fluentui/monaco-editor lint ✔️ done  - 8.44s

@fluentui/fluent2-theme lint ✔️ done  - 14.20s

@fluentui/foundation-legacy lint ✔️ done  - 13.36s

@fluentui/merge-styles lint ✔️ done  - 11.72s

@fluentui/public-docsite-setup lint ✔️ done  - 11.68s

@fluentui/react-cards lint ✔️ done  - 11.01s

@fluentui/react-date-time lint ✔️ done  - 8.83s

@fluentui/react-conformance lint ✔️ done  - 12.43s

@fluentui/react-docsite-components lint ✔️ done  - 16.28s

@fluentui/react-file-type-icons lint ✔️ done  - 10.37s

@fluentui/react-charting lint ✔️ done  - 25.96s

@fluentui/react-focus lint ✔️ done  - 14.40s

@fluentui/react-icon-provider lint ✔️ done  - 10.60s

@fluentui/react-hooks lint ✔️ done  - 13.27s

@fluentui/react-experiments lint ✔️ done  - 24.46s

@fluentui/react-window-provider lint ✔️ done  - 9.54s

@fluentui/react-monaco-editor lint ✔️ done  - 13.97s

@fluentui/react-icons-mdl2-branded lint ✔️ done  - 19.13s

@fluentui/scheme-utilities lint ✔️ done  - 12.71s

@fluentui/set-version lint ✔️ done  - 8.66s

@fluentui/storybook lint ✔️ done  - 8.96s

@fluentui/test-utilities lint ✔️ done  - 8.87s

@fluentui/style-utilities lint ✔️ done  - 10.20s

@fluentui/theme lint ✔️ done  - 9.71s

@fluentui/web-components lint ✔️ done  - 5.82s

@fluentui/theme-samples lint ✔️ done  - 12.39s

🔥 @fluentui/react lint ✔️ done  - 1m 11.98s

@fluentui/tokens lint ✔️ done  - 12.34s

🔥 @fluentui/react-examples lint ✔️ done  - 1m 7.04s

@fluentui/react-icons-mdl2 lint ✔️ done  - 49.12s

@fluentui/utilities lint ✔️ done  - 19.85s

@fluentui/webpack-utilities lint ✔️ done  - 11.61s

@fluentui/global-context lint ✔️ done  - 14.14s

@fluentui/babel-preset-storybook-full-source lint ✔️ done  - 14.88s

@fluentui/keyboard-keys lint ✔️ done  - 9.24s

@fluentui/priority-overflow lint ✔️ done  - 11.00s

@fluentui/babel-preset-global-context lint ✔️ done  - 21.04s

@fluentui/react-avatar-context lint ✔️ done  - 8.19s

@fluentui/react-aria lint ✔️ done  - 21.28s

@fluentui/react-breadcrumb lint ✔️ done  - 18.00s

@fluentui/react-accordion lint ✔️ done  - 29.74s

@fluentui/react-alert lint ✔️ done  - 30.83s

@fluentui/react-badge lint ✔️ done  - 27.50s

@fluentui/react-avatar lint ✔️ done  - 42.07s

@fluentui/react-conformance-griffel lint ✔️ done  - 13.41s

@fluentui/react-button lint ✔️ done  - 39.23s

@fluentui/react-card lint ✔️ done  - 32.90s

@fluentui/react-checkbox lint ✔️ done  - 31.50s

@fluentui/react-context-selector lint ✔️ done  - 12.65s

@fluentui/react-combobox lint ✔️ done  - 37.18s

@fluentui/react-data-grid-react-window lint ✔️ done  - 18.97s

@fluentui/react-components lint ✔️ done  - 43.98s

@fluentui/react-drawer lint ✔️ done  - 18.69s

@fluentui/react-divider lint ✔️ done  - 22.92s

@fluentui/react-datepicker-compat lint ✔️ done  - 32.67s

@fluentui/react-image lint ✔️ done  - 21.97s

@fluentui/react-field lint ✔️ done  - 29.97s

@fluentui/react-dialog lint ✔️ done  - 38.31s

@fluentui/react-infobutton lint ✔️ done  - 30.33s

@fluentui/react-label lint ✔️ done  - 22.84s

@fluentui/react-input lint ✔️ done  - 26.65s

@fluentui/react-link lint ✔️ done  - 23.24s

@fluentui/react-overflow lint ✔️ done  - 25.69s

@fluentui/react-portal lint ✔️ done  - 22.86s

@fluentui/react-popover lint ✔️ done  - 28.35s

@fluentui/react-menu lint ✔️ done  - 44.12s

@fluentui/react-persona lint ✔️ done  - 31.08s

@fluentui/react-migration-v0-v9 lint ✔️ done  - 42.53s

@fluentui/react-migration-v8-v9 lint ✔️ done  - 41.32s

@fluentui/react-portal-compat-context lint ✔️ done  - 9.03s

@fluentui/react-positioning lint ✔️ done  - 13.75s

@fluentui/react-shared-contexts lint ✔️ done  - 10.09s

@fluentui/react-portal-compat lint ✔️ done  - 25.77s

@fluentui/react-progress lint ✔️ done  - 24.65s

@fluentui/react-provider lint ✔️ done  - 23.52s

@fluentui/react-select lint ✔️ done  - 29.15s

@fluentui/react-radio lint ✔️ done  - 31.63s

@fluentui/react-skeleton lint ✔️ done  - 22.96s

@fluentui/react-slider lint ✔️ done  - 26.11s

@fluentui/react-storybook-addon-codesandbox lint ✔️ done  - 11.55s

@fluentui/react-storybook-addon lint ✔️ done  - 20.26s

@fluentui/react-spinner lint ✔️ done  - 24.68s

@fluentui/react-spinbutton lint ✔️ done  - 29.98s

@fluentui/react-tabster lint ✔️ done  - 15.49s

@fluentui/react-tags lint ✔️ done  - 18.49s

@fluentui/react-switch lint ✔️ done  - 29.47s

@fluentui/react-theme-sass lint ✔️ done  - 8.06s

@fluentui/react-tabs lint ✔️ done  - 31.66s

@fluentui/react-text lint ✔️ done  - 26.05s

@fluentui/react-textarea lint ✔️ done  - 25.95s

@fluentui/react-theme lint ✔️ done  - 19.51s

@fluentui/react-utilities lint ✔️ done  - 17.76s

@fluentui/react-table lint ✔️ done  - 57.84s

@fluentui/react-tooltip lint ✔️ done  - 24.13s

@fluentui/scripts-api-extractor lint ✔️ done  - 3.64s

@fluentui/react-toolbar lint ✔️ done  - 34.81s

@fluentui/react-virtualizer lint ✔️ done  - 22.23s

@fluentui/scripts-babel lint ✔️ done  - 5.99s

@fluentui/scripts-cypress lint ✔️ done  - 6.65s

@fluentui/scripts-beachball lint ✔️ done  - 10.01s

@fluentui/scripts-fluentui-publish lint ✔️ done  - 6.20s

@fluentui/scripts-dangerjs lint ✔️ done  - 7.81s

@fluentui/react-tree lint ✔️ done  - 32.97s

@fluentui/theme-designer lint ✔️ done  - 28.71s

@fluentui/scripts-executors lint ✔️ done  - 9.93s

@fluentui/scripts-lint-staged lint ✔️ done  - 3.29s

@fluentui/scripts-github lint ✔️ done  - 5.92s

@fluentui/scripts-package-manager lint ✔️ done  - 3.28s

@fluentui/scripts-generators lint ✔️ done  - 9.36s

@fluentui/scripts-jest lint ✔️ done  - 7.91s

@fluentui/scripts-monorepo lint ✔️ done  - 7.51s

@fluentui/scripts-prettier lint ✔️ done  - 5.53s

@fluentui/scripts-projects-test lint ✔️ done  - 6.60s

@fluentui/scripts-gulp lint ✔️ done  - 13.24s

@fluentui/scripts-ts-node lint ✔️ done  - 3.28s

@fluentui/scripts-puppeteer lint ✔️ done  - 6.86s

@fluentui/scripts-storybook lint ✔️ done  - 8.03s

@fluentui/scripts-triage-bot lint ✔️ done  - 7.84s

@fluentui/scripts-utils lint ✔️ done  - 5.32s

@fluentui/code-sandbox lint ✔️ done  - 3.79s

@fluentui/scripts-tasks lint ✔️ done  - 10.03s

@fluentui/scripts-webpack lint ✔️ done  - 5.98s

@fluentui/scripts-update-release-notes lint ✔️ done  - 7.92s

@fluentui/projects-test lint ✔️ done  - 1.58s

@fluentui/accessibility lint ✔️ done  - 7.59s

@fluentui/perf lint ✔️ done  - 3.75s

@fluentui/docs-components lint ✔️ done  - 4.51s

@fluentui/react-component-event-listener lint ✔️ done  - 3.32s

@fluentui/e2e lint ✔️ done  - 6.30s

@fluentui/react-component-nesting-registry lint ✔️ done  - 3.63s

@fluentui/react-component-ref lint ✔️ done  - 3.93s

@fluentui/react-builder lint ✔️ done  - 6.70s

@fluentui/react-bindings lint ✔️ done  - 8.17s

@fluentui/react-northstar-emotion-renderer lint ✔️ done  - 3.83s

@fluentui/react-northstar-fela-renderer lint ✔️ done  - 4.27s

@fluentui/react-northstar-styles-renderer lint ✔️ done  - 3.46s

@fluentui/react-icons-northstar lint ✔️ done  - 9.09s

@fluentui/react-proptypes lint ✔️ done  - 3.75s

@fluentui/react-telemetry lint ✔️ done  - 4.05s

@fluentui/state lint ✔️ done  - 3.71s

@fluentui/react-northstar-prototypes lint ✔️ done  - 10.37s

@fluentui/styles lint ✔️ done  - 4.82s

@fluentui/bundle-size test ✔️ done  - 5.42s

@fluentui/scripts-api-extractor test ✔️ done  - 2.70s

@fluentui/bundle-size type-check ✔️ done  - 7.48s

@fluentui/scripts-api-extractor type-check ✔️ done  - 3.16s

@fluentui/nx-workspace-tools lint ✔️ done  - 14.01s

@fluentui/scripts-babel test ✔️ done  - 2.38s

@fluentui/scripts-cypress test ✔️ done  - 2.64s

@fluentui/scripts-babel type-check ✔️ done  - 3.89s

@fluentui/eslint-plugin test ✔️ done  - 12.44s

@fluentui/scripts-cypress type-check ✔️ done  - 4.09s

@fluentui/scripts-github test ✔️ done  - 2.10s

@fluentui/scripts-package-manager test ✔️ done  - 2.02s

@fluentui/scripts-github type-check ✔️ done  - 3.35s

@fluentui/scripts-package-manager type-check ✔️ done  - 2.89s

@fluentui/scripts-puppeteer type-check ✔️ done  - 3.60s

@fluentui/scripts-ts-node test ✔️ done  - 2.23s

@fluentui/scripts-triage-bot type-check ✔️ done  - 4.09s

@fluentui/scripts-ts-node type-check ✔️ done  - 1.15s

@fluentui/docs lint ✔️ done  - 43.39s

@fluentui/scripts-puppeteer test ✔️ done  - 8.55s

@fluentui/scripts-utils test ✔️ done  - 2.25s

@fluentui/react-northstar lint ✔️ done  - 36.87s

@fluentui/scripts-triage-bot test ✔️ done  - 8.31s

@fluentui/typings type-check ✔️ done  - 1.13s

@fluentui/scripts-utils type-check ✔️ done  - 2.85s

@fluentui/digest test ✔️ done  - 1.76s

@fluentui/scripts-update-release-notes test ✔️ done  - 2.27s

@fluentui/scripts-update-release-notes type-check ✔️ done  - 6.13s

@fluentui/scripts-monorepo type-check ✔️ done  - 6.56s

@fluentui/scripts-monorepo test ✔️ done  - 11.88s

@fluentui/nx-workspace-tools type-check ✔️ done  - 15.64s

@fluentui/scripts-dangerjs test ✔️ done  - 4.78s

@fluentui/scripts-beachball type-check ✔️ done  - 10.25s

@fluentui/scripts-fluentui-publish test ✔️ done  - 3.15s

@fluentui/scripts-fluentui-publish type-check ✔️ done  - 1.89s

@fluentui/scripts-dangerjs type-check ✔️ done  - 8.39s

@fluentui/nx-workspace-tools test ✔️ done  - 24.48s

@fluentui/scripts-lint-staged test ✔️ done  - 1.99s

@fluentui/scripts-jest type-check ✔️ done  - 4.86s

@fluentui/scripts-beachball test ✔️ done  - 20.32s

@fluentui/scripts-prettier test ✔️ done  - 2.05s

@fluentui/scripts-lint-staged type-check ✔️ done  - 3.89s

@fluentui/scripts-projects-test test ✔️ done  - 2.33s

@fluentui/scripts-webpack test ✔️ done  - 2.23s

@fluentui/scripts-prettier type-check ✔️ done  - 3.58s

@fluentui/scripts-jest test ✔️ done  - 10.07s

@fluentui/scripts-projects-test type-check ✔️ done  - 4.21s

@fluentui/scripts-webpack type-check ✔️ done  - 3.71s

@fluentui/scripts-executors type-check ✔️ done  - 5.02s

@fluentui/scripts-executors test ✔️ done  - 8.17s

@fluentui/a11y-testing build ✔️ done  - 6.74s

@fluentui/api-docs build ✔️ done  - 6.65s

@fluentui/public-docsite-setup build ✔️ done  - 7.12s

@fluentui/example-data build ✔️ done  - 11.07s

@fluentui/codemods build ✔️ done  - 15.30s

@fluentui/web-components test ✔️ done  - 48.68s

@fluentui/keyboard-key build ✔️ done  - 12.57s

@fluentui/set-version build ✔️ done  - 9.30s

@fluentui/monaco-editor build ✔️ done  - 22.28s

@fluentui/webpack-utilities build ✔️ done  - 10.78s

@fluentui/react-conformance build ✔️ done  - 16.76s

@fluentui/test-utilities build ✔️ done  - 14.05s

@fluentui/tokens build ✔️ done  - 14.13s

@fluentui/keyboard-keys build ✔️ done  - 12.23s

@fluentui/priority-overflow build ✔️ done  - 11.63s

@fluentui/react-storybook-addon-codesandbox build ✔️ done  - 12.96s

@fluentui/react-portal-compat-context build ✔️ done  - 13.81s

@fluentui/babel-preset-global-context build ✔️ done  - 23.53s

@fluentui/scripts-tasks type-check ✔️ done  - 6.78s

@fluentui/scripts-generators type-check ✔️ done  - 7.40s

@fluentui/scripts-tasks test ✔️ done  - 11.15s

@fluentui/babel-preset-storybook-full-source build ✔️ done  - 24.69s

@fluentui/scripts-generators test ✔️ done  - 10.34s

@fluentui/ability-attributes build ✔️ done  - 18.36s

@fluentui/accessibility build ✔️ done  - 21.61s

@fluentui/react-component-event-listener build ✔️ done  - 17.47s

@fluentui/react-component-nesting-registry build ✔️ done  - 17.41s

@fluentui/docs-components build ✔️ done  - 19.52s

@fluentui/scripts-gulp test ✔️ done  - 2.21s

@fluentui/react-component-ref build ✔️ done  - 25.57s

@fluentui/pr-deploy-site type-check ✔️ done  - 8.36s

@fluentui/react-proptypes build ✔️ done  - 16.07s

@fluentui/scripts-gulp type-check ✔️ done  - 11.21s

@fluentui/state build ✔️ done  - 13.50s

@fluentui/api-docs test ✔️ done  - 4.70s

@fluentui/styles build ✔️ done  - 15.36s

@fluentui/example-data test ✔️ done  - 4.70s

@fluentui/set-version test ✔️ done  - 4.42s

@fluentui/keyboard-key test ✔️ done  - 9.54s

@fluentui/date-time-utilities build ✔️ done  - 12.54s

@fluentui/dom-utilities build ✔️ done  - 14.11s

@fluentui/react-conformance-griffel build ✔️ done  - 11.59s

@fluentui/merge-styles build ✔️ done  - 16.77s

@fluentui/test-utilities test ✔️ done  - 11.81s

@fluentui/tokens test ✔️ done  - 9.44s

@fluentui/react-theme build ✔️ done  - 12.92s

@fluentui/react-window-provider build ✔️ done  - 19.10s

@fluentui/tokens type-check ✔️ done  - 4.82s

🔥 @fluentui/react-northstar build:info ✔️ done  - 2m 54.71s

@fluentui/keyboard-keys test ✔️ done  - 2.07s

@fluentui/keyboard-keys type-check ✔️ done  - 2.52s

@fluentui/priority-overflow test ✔️ done  - 3.28s

@fluentui/priority-overflow type-check ✔️ done  - 4.07s

@fluentui/react-storybook-addon-codesandbox test ✔️ done  - 3.47s

@fluentui/react-portal-compat-context test ✔️ done  - 2.30s

@fluentui/react-storybook-addon-codesandbox type-check ✔️ done  - 4.93s

@fluentui/react-portal-compat-context type-check ✔️ done  - 2.89s

@fluentui/babel-preset-global-context test ✔️ done  - 4.66s

@fluentui/babel-preset-storybook-full-source test ✔️ done  - 5.59s

@fluentui/react-utilities build ✔️ done  - 21.67s

@fluentui/babel-preset-storybook-full-source type-check ✔️ done  - 12.84s

@fluentui/react-component-event-listener test ✔️ done  - 9.87s

@fluentui/babel-preset-global-context type-check ✔️ done  - 18.08s

@fluentui/react-component-nesting-registry test ✔️ done  - 9.34s

@fluentui/react-component-ref test ✔️ done  - 11.30s

@fluentui/accessibility test ✔️ done  - 24.39s

@fluentui/react-proptypes test ✔️ done  - 11.22s

🔥 @fluentui/react-conformance test ✔️ done  - 1m 0.92s

@fluentui/react-conformance-griffel test ✔️ done  - 4.75s

@fluentui/styles test ✔️ done  - 14.92s

@fluentui/dom-utilities test ✔️ done  - 10.17s

@fluentui/react-conformance-griffel type-check ✔️ done  - 7.27s

@fluentui/react-northstar-styles-renderer build ✔️ done  - 21.02s

@fluentui/date-time-utilities test ✔️ done  - 15.14s

@fluentui/react-theme test ✔️ done  - 2.06s

@fluentui/jest-serializer-merge-styles build ✔️ done  - 9.47s

@fluentui/react-theme-sass build ✔️ done  - 10.94s

@fluentui/react-window-provider test ✔️ done  - 10.93s

@fluentui/merge-styles test ✔️ done  - 16.64s

@fluentui/react-shared-contexts build ✔️ done  - 16.16s

@fluentui/scripts-storybook test ✔️ done  - 18.10s

@fluentui/react-avatar-context build ✔️ done  - 12.80s

@fluentui/scripts-storybook type-check ✔️ done  - 16.16s

🔥 @fluentui/codemods test ✔️ done  - 1m 49.51s

@fluentui/react-aria build ✔️ done  - 27.17s

@fluentui/react-breadcrumb build ✔️ done  - 26.26s

@fluentui/react-context-selector build ✔️ done  - 22.54s

@fluentui/react-utilities test ✔️ done  - 8.97s

@fluentui/react-theme type-check ✔️ done  - 52.13s

@fluentui/react-image build ✔️ done  - 30.98s

@fluentui/react-tags build ✔️ done  - 28.94s

@fluentui/react-drawer build ✔️ done  - 33.23s

@fluentui/react-virtualizer build ✔️ done  - 27.25s

@fluentui/react-utilities type-check ✔️ done  - 16.28s

@fluentui/jest-serializer-merge-styles test ✔️ done  - 10.89s

@fluentui/react-theme-sass test ✔️ done  - 4.63s

@fluentui/react-theme-sass type-check ✔️ done  - 5.20s

@fluentui/react-text build ✔️ done  - 35.31s

@fluentui/react-northstar-emotion-renderer build ✔️ done  - 23.94s

@fluentui/utilities build ✔️ done  - 23.30s

@fluentui/react-northstar-fela-renderer build ✔️ done  - 27.40s

@fluentui/react-shared-contexts test ✔️ done  - 3.55s

@fluentui/react-avatar-context test ✔️ done  - 4.52s

@fluentui/react-shared-contexts type-check ✔️ done  - 6.80s

@fluentui/react-avatar-context type-check ✔️ done  - 3.21s

@fluentui/react-aria test ✔️ done  - 6.14s

@fluentui/react-positioning build ✔️ done  - 27.84s

@fluentui/react-divider build ✔️ done  - 29.87s

@fluentui/react-label build ✔️ done  - 29.05s

@fluentui/react-tabster build ✔️ done  - 26.98s

@fluentui/react-badge build ✔️ done  - 34.76s

@fluentui/react-breadcrumb test ✔️ done  - 7.59s

@fluentui/react-context-selector test ✔️ done  - 5.20s

@fluentui/react-image test ✔️ done  - 8.87s

@fluentui/react-context-selector type-check ✔️ done  - 15.02s

@fluentui/react-tags test ✔️ done  - 10.09s

@fluentui/react-overflow build ✔️ done  - 22.82s

@fluentui/global-context build ✔️ done  - 24.50s

@fluentui/react-breadcrumb type-check ✔️ done  - 26.55s

@fluentui/react-virtualizer test ✔️ done  - 3.84s

@fluentui/react-drawer test ✔️ done  - 7.41s

@fluentui/react-tags type-check ✔️ done  - 33.51s

🔥 @fluentui/react-aria type-check ✔️ done  - 1m 6.46s

@fluentui/react-text test ✔️ done  - 28.71s

@fluentui/react-drawer type-check ✔️ done  - 38.03s

@fluentui/react-northstar-emotion-renderer test ✔️ done  - 13.36s

🔥 @fluentui/react-image type-check ✔️ done  - 1m 6.68s

@fluentui/theme build ✔️ done  - 21.72s

@fluentui/react-hooks build ✔️ done  - 24.89s

@fluentui/react-positioning test ✔️ done  - 7.00s

@fluentui/react-northstar-fela-renderer test ✔️ done  - 15.14s

🔥 @fluentui/react-virtualizer type-check ✔️ done  - 1m 5.67s

@fluentui/react-divider test ✔️ done  - 7.76s

🔥 @fluentui/react-text type-check ✔️ done  - 1m 5.91s

@fluentui/react-positioning type-check ✔️ done  - 15.29s

@fluentui/react-label test ✔️ done  - 8.58s

@fluentui/utilities test ✔️ done  - 49.69s

@fluentui/react-spinner build ✔️ done  - 31.08s

@fluentui/react-field build ✔️ done  - 33.43s

🔥 @fluentui/react-bindings build ✔️ done  - 1m 8.56s

@fluentui/react-accordion build ✔️ done  - 40.16s

🔥 @fluentui/react-divider type-check ✔️ done  - 1m 0.78s

@fluentui/react-portal build ✔️ done  - 25.19s

@fluentui/react-tabster test ✔️ done  - 2.79s

@fluentui/react-button build ✔️ done  - 41.81s

@fluentui/react-link build ✔️ done  - 29.65s

🔥 @fluentui/react-label type-check ✔️ done  - 1m 0.96s

@fluentui/react-overflow test ✔️ done  - 6.86s

@fluentui/react-provider build ✔️ done  - 31.03s

@fluentui/react-tabster type-check ✔️ done  - 14.31s

@fluentui/global-context test ✔️ done  - 5.53s

@fluentui/react-badge test ✔️ done  - 15.09s

@fluentui/react-tabs build ✔️ done  - 33.83s

@fluentui/scheme-utilities build ✔️ done  - 12.82s

@fluentui/theme test ✔️ done  - 13.48s

@fluentui/global-context type-check ✔️ done  - 20.03s

@fluentui/style-utilities build ✔️ done  - 19.86s

@fluentui/react-spinner test ✔️ done  - 9.41s

@fluentui/react-hooks test ✔️ done  - 26.07s

🔥 @fluentui/react-badge type-check ✔️ done  - 1m 0.82s

@fluentui/react-checkbox build ✔️ done  - 34.70s

@fluentui/react-progress build ✔️ done  - 32.43s

@fluentui/react-input build ✔️ done  - 33.28s

🔥 @fluentui/react-overflow type-check ✔️ done  - 1m 3.01s

@fluentui/react-radio build ✔️ done  - 37.93s

🔥 @fluentui/react-spinner type-check ✔️ done  - 1m 4.26s

@fluentui/react-select build ✔️ done  - 36.37s

@fluentui/react-skeleton build ✔️ done  - 31.83s

@fluentui/react-spinbutton build ✔️ done  - 38.10s

@fluentui/react-field test ✔️ done  - 13.25s

@fluentui/react-slider build ✔️ done  - 38.73s

@fluentui/react-switch build ✔️ done  - 38.43s

@fluentui/react-accordion test ✔️ done  - 19.95s

@fluentui/react-textarea build ✔️ done  - 37.22s

@fluentui/react-bindings test ✔️ done  - 46.94s

@fluentui/react-telemetry build ✔️ done  - 48.91s

🔥 @fluentui/react-icons-northstar build ✔️ done  - 1m 0.29s

🔥 @fluentui/react-field type-check ✔️ done  - 1m 7.34s

@fluentui/react-dialog build ✔️ done  - 39.63s

@fluentui/react-combobox build ✔️ done  - 46.90s

@fluentui/react-portal test ✔️ done  - 10.00s

🔥 @fluentui/react-accordion type-check ✔️ done  - 1m 16.06s

@fluentui/react-popover build ✔️ done  - 39.73s

@fluentui/react-button test ✔️ done  - 22.89s

@fluentui/react-tooltip build ✔️ done  - 40.36s

@fluentui/react-menu build ✔️ done  - 48.82s

@fluentui/react-link test ✔️ done  - 9.76s

@fluentui/react-provider test ✔️ done  - 10.85s

@fluentui/react-card build ✔️ done  - 40.61s

@fluentui/react-tabs test ✔️ done  - 11.43s

@fluentui/react-storybook-addon build ✔️ done  - 26.17s

@fluentui/common-styles build ✔️ done  - 5.03s

🔥 @fluentui/react-portal type-check ✔️ done  - 1m 5.98s

@fluentui/font-icons-mdl2 build ✔️ done  - 11.84s

@fluentui/react-file-type-icons build ✔️ done  - 15.18s

@fluentui/react-link type-check ✔️ done  - 59.53s

@fluentui/foundation-legacy build ✔️ done  - 28.20s

@fluentui/react-provider type-check ✔️ done  - 53.18s

🔥 @fluentui/react-button type-check ✔️ done  - 1m 15.11s

@fluentui/react-focus build ✔️ done  - 28.41s

@fluentui/react-icon-provider build ✔️ done  - 20.41s

@fluentui/style-utilities test ✔️ done  - 12.63s

@fluentui/react-progress test ✔️ done  - 11.87s

@fluentui/react-checkbox test ✔️ done  - 13.53s

🔥 @fluentui/react-tabs type-check ✔️ done  - 1m 2.67s

@fluentui/react-input test ✔️ done  - 11.89s

@fluentui/react-radio test ✔️ done  - 15.50s

@fluentui/react-select test ✔️ done  - 14.13s

@fluentui/react-skeleton test ✔️ done  - 10.05s

@fluentui/react-toolbar build ✔️ done  - 38.20s

🔥 @fluentui/react-checkbox type-check ✔️ done  - 1m 1.06s

@fluentui/react-progress type-check ✔️ done  - 57.34s

@fluentui/react-spinbutton test ✔️ done  - 15.31s

@fluentui/react-input type-check ✔️ done  - 57.89s

@fluentui/react-slider test ✔️ done  - 11.24s

@fluentui/react-radio type-check ✔️ done  - 58.45s

@fluentui/react-select type-check ✔️ done  - 53.87s

@fluentui/react-switch test ✔️ done  - 12.63s

@fluentui/react-textarea test ✔️ done  - 11.52s

@fluentui/react-skeleton type-check ✔️ done  - 49.78s

@fluentui/react-dialog test ✔️ done  - 22.61s

@fluentui/react-icons-northstar test ✔️ done  - 37.35s

🔥 @fluentui/react-spinbutton type-check ✔️ done  - 1m 5.40s

🔥 @fluentui/react-slider type-check ✔️ done  - 1m 4.43s

🔥 @fluentui/react-switch type-check ✔️ done  - 1m 12.12s

🔥 @fluentui/react-textarea type-check ✔️ done  - 1m 15.14s

@fluentui/react-combobox test ✔️ done  - 31.74s

@fluentui/react-popover test ✔️ done  - 13.57s

@fluentui/react-datepicker-compat build ✔️ done  - 52.58s

@fluentui/react-infobutton build ✔️ done  - 37.68s

@fluentui/react-tooltip test ✔️ done  - 10.13s

🔥 @fluentui/react-combobox type-check ✔️ done  - 1m 15.28s

@fluentui/react-avatar build ✔️ done  - 47.83s

🔥 @fluentui/react-dialog type-check ✔️ done  - 1m 46.09s

@fluentui/react-menu test ✔️ done  - 32.64s

@fluentui/react-storybook-addon test ✔️ done  - 3.17s

@fluentui/react-card test ✔️ done  - 12.04s

@fluentui/font-icons-mdl2 test ✔️ done  - 5.02s

🔥 @fluentui/react-popover type-check ✔️ done  - 1m 19.54s

@fluentui/react-file-type-icons test ✔️ done  - 11.03s

🔥 @fluentui/react-tooltip type-check ✔️ done  - 1m 6.35s

@fluentui/foundation-legacy test ✔️ done  - 16.21s

@fluentui/react-focus test ✔️ done  - 22.56s

🔥 @fluentui/react-menu type-check ✔️ done  - 1m 17.03s

@fluentui/react-storybook-addon type-check ✔️ done  - 50.14s

@fluentui/react-icon-provider test ✔️ done  - 15.52s

@fluentui/react-datepicker-compat test ✔️ done  - 5.27s

@fluentui/react-toolbar test ✔️ done  - 23.14s

🔥 @fluentui/react-card type-check ✔️ done  - 1m 20.90s

🔥 @fluentui/react-icons-mdl2 build ✔️ done  - 1m 1.80s

@fluentui/react-infobutton test ✔️ done  - 15.10s

🔥 @fluentui/react build ✔️ done  - 1m 20.90s

@fluentui/react-persona build ✔️ done  - 40.97s

@fluentui/react-alert build ✔️ done  - 46.53s

🔥 @fluentui/react-datepicker-compat type-check ✔️ done  - 1m 14.83s

🔥 @fluentui/react-toolbar type-check ✔️ done  - 1m 31.56s

🔥 @fluentui/react-northstar build ✔️ done  - 4m 54.28s

🔥 @fluentui/react-infobutton type-check ✔️ done  - 1m 11.65s

@fluentui/react-avatar test ✔️ done  - 20.02s

🔥 @fluentui/react-table build ✔️ done  - 1m 1.06s

@fluentui/perf-test build ✔️ done  - 17.34s

@fluentui/react-icons-mdl2-branded build ✔️ done  - 25.66s

@fluentui/azure-themes build ✔️ done  - 17.79s

@fluentui/fluent2-theme build ✔️ done  - 17.42s

@fluentui/react-tree build ✔️ done  - 56.62s

@fluentui/react-date-time build ✔️ done  - 17.73s

@fluentui/react-charting build ✔️ done  - 26.29s

@fluentui/react-cards build ✔️ done  - 31.25s

@fluentui/theme-samples build ✔️ done  - 15.67s

@fluentui/react-monaco-editor build ✔️ done  - 24.39s

@fluentui/react-experiments build ✔️ done  - 39.38s

@fluentui/react-persona test ✔️ done  - 17.60s

@fluentui/react-alert test ✔️ done  - 16.05s

@fluentui/perf-test-react-components build ✔️ done  - 39.87s

🔥 @fluentui/react-avatar type-check ✔️ done  - 1m 35.12s

🔥 @fluentui/react-icons-mdl2 test ✔️ done  - 1m 49.90s

@fluentui/local-sandbox build ✔️ done  - 21.38s

@fluentui/react-18-tests-v8 test ✔️ done  - 12.11s

@fluentui/react-18-tests-v8 type-check ✔️ done  - 5.88s

🔥 @fluentui/react-persona type-check ✔️ done  - 1m 7.45s

@fluentui/ts-minbar-test-react type-check ✔️ done  - 3.40s

@fluentui/react-alert type-check ✔️ done  - 59.39s

🔥 @fluentui/projects-test build ✔️ done  - 1m 13.49s

🔥 @fluentui/code-sandbox build ✔️ done  - 1m 33.07s

🔥 @fluentui/vr-tests-react-components build ✔️ done  - 1m 36.97s

🔥 @fluentui/ts-minbar-test-react test ✔️ done  - 1m 43.04s

🔥 @fluentui/react-data-grid-react-window build ✔️ done  - 1m 10.93s

@fluentui/react-table test ✔️ done  - 55.85s

🔥 @fluentui/react-components build ✔️ done  - 1m 42.52s

@fluentui/cra-template type-check ✔️ done  - 9.36s

@fluentui/react-tree test ✔️ done  - 19.91s

@fluentui/react-cards test ✔️ done  - 18.40s

@fluentui/storybook build ✔️ done  - 13.24s

@fluentui/react-charting test ✔️ done  - 53.18s

@fluentui/react-docsite-components build ✔️ done  - 26.80s

@fluentui/react-monaco-editor test ✔️ done  - 19.79s

🔥 @fluentui/react-tree type-check ✔️ done  - 1m 25.58s

@fluentui/circulars-test test ✔️ done  - 20.96s

🔥 @fluentui/react-table type-check ✔️ done  - 1m 49.95s

@fluentui/react-experiments test ✔️ done  - 43.91s

@fluentui/react-builder build ✔️ done  - 51.11s

@fluentui/vr-tests-react-components test ✔️ done  - 33.88s

@fluentui/react-data-grid-react-window test ✔️ done  - 2.46s

🔥 @fluentui/react-northstar-prototypes build ✔️ done  - 1m 9.90s

@fluentui/vr-tests-react-components type-check ✔️ done  - 50.44s

@fluentui/react-data-grid-react-window type-check ✔️ done  - 54.65s

@fluentui/ssr-tests-v9 build ✔️ done  - 11.08s

🔥 @fluentui/cra-template test ✔️ done  - 4m 7.04s

🔥 @fluentui/recipes-react-components build ✔️ done  - 1m 20.80s

🔥 @fluentui/react-migration-v8-v9 build ✔️ done  - 1m 28.56s

🔥 @fluentui/react-migration-v0-v9 build ✔️ done  - 1m 32.87s

@fluentui/react-components test ✔️ done  - 14.92s

🔥 @fluentui/react-portal-compat build ✔️ done  - 1m 18.69s

@fluentui/theming-designer build ✔️ done  - 15.93s

🔥 @fluentui/theme-designer build ✔️ done  - 1m 30.24s

@fluentui/react-docsite-components test ✔️ done  - 18.74s

@fluentui/vr-tests build ✔️ done  - 51.35s

@fluentui/react-examples build ✔️ done  - 55.11s

@fluentui/perf-test-northstar build ✔️ done  - 2.63s

@fluentui/react-builder test ✔️ done  - 48.20s

@fluentui/react-18-tests-v9 type-check ✔️ done  - 6.31s

🔥 @fluentui/react-components type-check ✔️ done  - 2m 5.75s

@fluentui/stress-test type-check ✔️ done  - 53.42s

@fluentui/ts-minbar-test-react-components type-check ✔️ done  - 4.30s

@fluentui/ssr-tests-v9 test ✔️ done  - 26.28s

🔥 @fluentui/ts-minbar-test-react-components test ✔️ done  - 1m 12.35s

@fluentui/recipes-react-components type-check ✔️ done  - 1.33s

🔥 @fluentui/react-18-tests-v9 test ✔️ done  - 1m 49.28s

@fluentui/react-migration-v8-v9 test ✔️ done  - 2.43s

@fluentui/public-docsite-v9 build ✔️ done  - 23.22s

@fluentui/react-migration-v0-v9 test ✔️ done  - 34.40s

🔥 @fluentui/ssr-tests-v9 type-check ✔️ done  - 1m 48.83s

@fluentui/react-portal-compat test ✔️ done  - 9.17s

🔥 @fluentui/react-migration-v8-v9 type-check ✔️ done  - 2m 2.36s

@fluentui/theming-designer test ✔️ done  - 5.09s

@fluentui/theme-designer test ✔️ done  - 2.88s

🔥 @fluentui/projects-test test ✔️ done  - 9m 43.18s

🔥 @fluentui/react-migration-v0-v9 type-check ✔️ done  - 1m 56.75s

@fluentui/public-docsite-resources build ✔️ done  - 21.85s

@fluentui/perf-test-northstar test ✔️ done  - 1.62s

@fluentui/vr-tests type-check ✔️ done  - 47.06s

🔥 @fluentui/react test ✔️ done  - 15m 10.01s
🔥 @fluentui/theme-designer type-check ✔️ done  - 1m 26.10s
🔥 @fluentui/react-portal-compat type-check ✔️ done  - 1m 47.39s
@fluentui/public-docsite build ✔️ done  - 33.47s

@fluentui/public-docsite test ✔️ done  - 6.36s
@fluentui/ssr-tests build ✔️ done  - 34.77s

🔥 @fluentui/docs build ✔️ done  - 6m 30.13s
@fluentui/ssr-tests test ✔️ done  - 7.87s
🔥 @fluentui/react-northstar test ✔️ done  - 18m 16.83s

🏗 Summary

[Tasks Count] success: 570, skipped: 0, incomplete: 0
----------------------------------------------
Took a total of 45m 37.51s to complete
2023-03-08T19:21:27.6494704Z Done in 2738.23s. Peak memory usage 33.66MB.
2023-03-08T19:21:27.6677257Z ##[section]Finishing: build, test, lint, type-check
```

### Slowest tasks

```
🔥 @fluentui/react lint ✔️ done  - 1m 11.98s
🔥 @fluentui/react-examples lint ✔️ done  - 1m 7.04s
🔥 @fluentui/react-northstar build:info ✔️ done  - 2m 54.71s
🔥 @fluentui/react-conformance test ✔️ done  - 1m 0.92s
🔥 @fluentui/codemods test ✔️ done  - 1m 49.51s
🔥 @fluentui/react-aria type-check ✔️ done  - 1m 6.46s
🔥 @fluentui/react-image type-check ✔️ done  - 1m 6.68s
🔥 @fluentui/react-virtualizer type-check ✔️ done  - 1m 5.67s
🔥 @fluentui/react-text type-check ✔️ done  - 1m 5.91s
🔥 @fluentui/react-bindings build ✔️ done  - 1m 8.56s
🔥 @fluentui/react-divider type-check ✔️ done  - 1m 0.78s
🔥 @fluentui/react-label type-check ✔️ done  - 1m 0.96s
🔥 @fluentui/react-badge type-check ✔️ done  - 1m 0.82s
🔥 @fluentui/react-overflow type-check ✔️ done  - 1m 3.01s
🔥 @fluentui/react-spinner type-check ✔️ done  - 1m 4.26s
🔥 @fluentui/react-icons-northstar build ✔️ done  - 1m 0.29s
🔥 @fluentui/react-field type-check ✔️ done  - 1m 7.34s
🔥 @fluentui/react-accordion type-check ✔️ done  - 1m 16.06s
🔥 @fluentui/react-portal type-check ✔️ done  - 1m 5.98s
🔥 @fluentui/react-button type-check ✔️ done  - 1m 15.11s
🔥 @fluentui/react-tabs type-check ✔️ done  - 1m 2.67s
🔥 @fluentui/react-checkbox type-check ✔️ done  - 1m 1.06s
🔥 @fluentui/react-spinbutton type-check ✔️ done  - 1m 5.40s
🔥 @fluentui/react-slider type-check ✔️ done  - 1m 4.43s
🔥 @fluentui/react-switch type-check ✔️ done  - 1m 12.12s
🔥 @fluentui/react-textarea type-check ✔️ done  - 1m 15.14s
🔥 @fluentui/react-combobox type-check ✔️ done  - 1m 15.28s
🔥 @fluentui/react-dialog type-check ✔️ done  - 1m 46.09s
🔥 @fluentui/react-popover type-check ✔️ done  - 1m 19.54s
🔥 @fluentui/react-tooltip type-check ✔️ done  - 1m 6.35s
🔥 @fluentui/react-menu type-check ✔️ done  - 1m 17.03s
🔥 @fluentui/react-card type-check ✔️ done  - 1m 20.90s
🔥 @fluentui/react-icons-mdl2 build ✔️ done  - 1m 1.80s
🔥 @fluentui/react build ✔️ done  - 1m 20.90s
🔥 @fluentui/react-datepicker-compat type-check ✔️ done  - 1m 14.83s
🔥 @fluentui/react-toolbar type-check ✔️ done  - 1m 31.56s
🔥 @fluentui/react-northstar build ✔️ done  - 4m 54.28s
🔥 @fluentui/react-infobutton type-check ✔️ done  - 1m 11.65s
🔥 @fluentui/react-table build ✔️ done  - 1m 1.06s
🔥 @fluentui/react-avatar type-check ✔️ done  - 1m 35.12s
🔥 @fluentui/react-icons-mdl2 test ✔️ done  - 1m 49.90s
🔥 @fluentui/react-persona type-check ✔️ done  - 1m 7.45s
🔥 @fluentui/projects-test build ✔️ done  - 1m 13.49s
🔥 @fluentui/code-sandbox build ✔️ done  - 1m 33.07s
🔥 @fluentui/vr-tests-react-components build ✔️ done  - 1m 36.97s
🔥 @fluentui/ts-minbar-test-react test ✔️ done  - 1m 43.04s
🔥 @fluentui/react-data-grid-react-window build ✔️ done  - 1m 10.93s
🔥 @fluentui/react-components build ✔️ done  - 1m 42.52s
🔥 @fluentui/react-tree type-check ✔️ done  - 1m 25.58s
🔥 @fluentui/react-table type-check ✔️ done  - 1m 49.95s
🔥 @fluentui/react-northstar-prototypes build ✔️ done  - 1m 9.90s
🔥 @fluentui/cra-template test ✔️ done  - 4m 7.04s
🔥 @fluentui/recipes-react-components build ✔️ done  - 1m 20.80s
🔥 @fluentui/react-migration-v8-v9 build ✔️ done  - 1m 28.56s
🔥 @fluentui/react-migration-v0-v9 build ✔️ done  - 1m 32.87s
🔥 @fluentui/react-portal-compat build ✔️ done  - 1m 18.69s
🔥 @fluentui/theme-designer build ✔️ done  - 1m 30.24s
🔥 @fluentui/react-components type-check ✔️ done  - 2m 5.75s
🔥 @fluentui/ts-minbar-test-react-components test ✔️ done  - 1m 12.35s
🔥 @fluentui/react-18-tests-v9 test ✔️ done  - 1m 49.28s
🔥 @fluentui/ssr-tests-v9 type-check ✔️ done  - 1m 48.83s
🔥 @fluentui/react-migration-v8-v9 type-check ✔️ done  - 2m 2.36s
🔥 @fluentui/projects-test test ✔️ done  - 9m 43.18s
🔥 @fluentui/react-migration-v0-v9 type-check ✔️ done  - 1m 56.75s
🔥 @fluentui/react test ✔️ done  - 15m 10.01s
🔥 @fluentui/theme-designer type-check ✔️ done  - 1m 26.10s
🔥 @fluentui/react-portal-compat type-check ✔️ done  - 1m 47.39s
🔥 @fluentui/docs build ✔️ done  - 6m 30.13s
🔥 @fluentui/react-northstar test ✔️ done  - 18m 16.83s
```

**Most slowest tasks:**

```
🔥 @fluentui/react-northstar build ✔️ done  - 4m 54.28s
🔥 @fluentui/docs build ✔️ done  - 6m 30.13s
🔥 @fluentui/projects-test test ✔️ done  - 9m 43.18s
🔥 @fluentui/react test ✔️ done  - 15m 10.01s
🔥 @fluentui/react-northstar test ✔️ done  - 18m 16.83s

🔥 @fluentui/react-migration-v8-v9 type-check ✔️ done  - 2m 2.36s
🔥 @fluentui/react-components type-check ✔️ done  - 2m 5.75s
🔥 @fluentui/react-migration-v0-v9 type-check ✔️ done  - 1m 56.75s
🔥 @fluentui/react-portal-compat type-check ✔️ done  - 1m 47.39s
```

---

## Per project data

### react-components

~~All packages use native jest so no perf bottlenecks caused by test execution. ✅~~

🔥 v9 packages are not using maxWorkers which might cause OOM and other issues on CI !!!!

- fixed by setting maxWorkers on CI

### react

- used `runInBand` on CI !!!!! (update: without that it will never finish because memory leaks, we will use maxThreadWorkers=4)

| Run type                       | time       | command                                                                 |
| ------------------------------ | ---------- | ----------------------------------------------------------------------- |
| current                        | 263 s      | `just test --runInBand --no-cache`                                      |
| current (CI)                   | 15m 10.01s | part of `lage build test lint type-check`                               |
| without runInBand              | 85 s       | `just test --no-cache`                                                  |
| without runInBand (+ raw jest) | 82 s       | `jest --no-cache`                                                       |
| without runInBand (CI)         | ?          | part of `lage build test lint type-check`. This will never finish on CI |

**Tests contain memory leaks**

> discovered on CI when pipeline was executed via nx:

```
worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
```

### react-northstar

| Run type                                | time  | command                                                                    |
| --------------------------------------- | ----- | -------------------------------------------------------------------------- |
| current                                 | 382 s | `gulp test --config ./jest.config.js --coverage --maxWorkers=2 --no-cache` |
| without codecov                         | 348 s | `gulp test --config ./jest.config.js --maxWorkers=2 --no-cache`            |
| without codecov,maxWorkers              | 232 s | `gulp test --config ./jest.config.js --no-cache`                           |
| without codecov,maxWorkers (+ raw jest) | 196 s | `jest --config ./jest.config.js --no-cache`                                |

#### More data:

**70% of the test scenarios are very slow** - triggering jest warnings:

```
 PASS  test/specs/components/Skeleton/SkeletonButton-test.tsx (10.063 s)
 PASS  test/specs/components/Skeleton/SkeletonAvatar-test.tsx (10.126 s)
 PASS  test/specs/components/Chat/ChatMessageReadStatus-test.tsx (9.917 s)
 PASS  test/specs/components/Carousel/CarouselNavigationItem-test.tsx (10.338 s)
 PASS  test/specs/components/Button/ButtonContent-test.tsx (9.267 s)
 PASS  test/specs/components/Attachment/AttachmentDescription-test.tsx (9.598 s)
 PASS  test/specs/components/Toolbar/ToolbarMenuItemIcon-test.ts (9.674 s)
 PASS  test/specs/components/Dropdown/DropdownItem-test.tsx (9.877 s)
 PASS  test/specs/components/Toolbar/ToolbarMenu-test.tsx (10.047 s)
 PASS  test/specs/components/Toolbar/ToolbarMenuDivider-test.ts (9.796 s)
 PASS  test/specs/components/Toolbar/ToolbarItemWrapper-test.tsx (9.426 s)
 PASS  test/specs/components/Breadcrumb/Breadcrumb-test.ts (11.22 s)
 PASS  test/specs/components/Breadcrumb/BreadcrumbDivider-test.ts (9.089 s)
 PASS  test/specs/components/SplitButton/SplitButtonToggle-test.tsx (9.46 s)
 PASS  test/specs/components/Alert/AlertDismissAction-test.tsx (10.006 s)
 PASS  test/specs/components/List/ListItemContentMedia-test.tsx (9.923 s)
 PASS  test/specs/components/Skeleton/SkeletonInput-test.tsx (9.283 s)
 PASS  test/specs/components/Skeleton/SkeletonShape-test.tsx (9.819 s)
 PASS  test/specs/components/Chat/ChatMessageContent-test.tsx (11.646 s)
 PASS  test/specs/components/Menu/MenuItemIndicator-test.tsx (11.176 s)
```

**Tests contain memory leaks**

> discovered while executing via raw `jest` instead `gulp`

```
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
```
