# Granular Visual Regression Pilot

This is a testing-only experiment, not a production rollout. The existing `VRT PR` screenshot job uses granular capture only for draft PR #36868. Every other PR retains the legacy `test-vr` path, and baseline publishing is unchanged. The experiment's candidate list is configured by `VRT_EXPERIMENT_PROJECTS`: Button, Input, and Spinner. Only candidates present in the actual Nx affected list are selected; unrelated affected groups are omitted deliberately for this measurement.

The experiment runs inside `Generate screenshots`, not a separate advisory job. It selects the bounded affected set once, builds its combined story files once, and captures those projects with `nx run-many -t test-vr-granular --excludeTaskDependencies`. Two concurrent Nx capture tasks use `VRT_CAPTURE_CONCURRENCY=4` workers each, for a maximum of eight workers. Build and capture durations are logged separately, and the collector includes only the selected groups. Screenshot generation must succeed before the run can reach VR approval.

The job uploads the existing `vrscreenshot` and `pr-number` artifacts. Screenshot layout is unchanged: `screenshots-report.json` at the artifact root and image files under `vr-tests-react-components/`; Storybook files are not uploaded. The existing default-branch `VRT | Comment on PR` workflow already consumes these artifacts after `VRT PR` completes, so testing this route does not require merging a new privileged workflow to master. That workflow and its Azure/CLI handling remain untouched; no PR code is checked out with its credentials.

## Project model

The plugin registers 51 virtual groups for 137 unchanged v9 stories. A group named `<library>-vrt` has a synthetic root at `<packageRoot>/visual-regression`, with `build-vr-storybook` and `test-vr-granular` targets. It runs through the `vr-tests-react-components` host and writes to `apps/vr-tests-react-components/dist/visual-regression/<name>/{storybook,screenshots}`. The upload collector maps selected groups back into the existing `screenshots/vr-tests-react-components` namespace, preserving each story's relative screenshot path and the report shape `{ "vr-tests-react-components": { "path": "vr-tests-react-components" } }`. It rejects overlapping destination paths. Other groups' existing outputs are not collected.

```bash
yarn nx run react-button-vrt:test-vr-granular
yarn nx affected -t test-vr-granular --files=packages/react-components/react-button/library/src/components/Button/Button.tsx --parallel=2
yarn nx run-many -t test-vr-granular --parallel=2
```

The commands above retain independent per-project builds for local debugging. CI instead uses the host-owned `build-vr-storybook-shared` target with an explicit `--selectedProjects` list. Its only output is `apps/vr-tests-react-components/dist/visual-regression/_shared/storybook`, including `vrt-shared.json` with a compiled-asset fingerprint and the story IDs owned by each project. The shared target's cache inputs conservatively include the host's dependencies and all group configuration/source inputs; the selected project list is part of its command hash.

Each virtual capture receives the shared Storybook path and fingerprint. It creates a temporary preview with only its story IDs in `index.json` and hard-links the compiled assets, without compiling or modifying the shared build. StoryWright therefore discovers only that project's stories and retains its existing step processing and runtime screenshot names. The temporary preview is removed after capture. The fingerprint is passed as a task argument so a changed shared build cannot restore stale screenshots from a per-project capture cache entry. Screenshots remain isolated outputs owned by their virtual projects; no virtual project owns the shared build output or depends on the broad host project in the project graph.

This is an explicit CI coordinator, not native Nx executor batching. Browser pooling and additional runner sharding remain separate optimizations; captures still launch an independent StoryWright process per selected project.

The affected command can include legitimate dependents, not just the group that owns the changed file. Local capture concurrency defaults to 1; bound Nx parallelism and capture concurrency together when running several groups. A later move to package-local `visual-regression` sources will require updating manifest discovery and executor path resolution; project names and screenshot namespaces can remain stable.

The pilot's preview reuses only the addon's FluentProvider decorator and theme/direction globals, without its docs controls or manager preset. AriaLive is disabled by the host VRT parameters, and StrictMode is off with no story overrides, so neither decorator is included. Depending on the whole addon would make basic component changes affect all VRT groups through docs-only imports. The plugin tracks the provider decorator source files and their runtime package imports instead. Changes to shared preview code still affect every group. Lockfile, Node version, platform, and architecture changes invalidate cached captures conservatively.

When iterating on the local inference plugin, use `NX_DAEMON=false` or restart it with `yarn nx reset --onlyDaemon` so checks do not reuse an older loaded plugin implementation.

## Partial PR diff caveat

The published `vr-approval-cli@0.5.1` implementation of `pixelBufferDiffFolders` marks omitted baseline images as removed. `filterRemovedScreenshots` retains removals when filename prefixes share `projectConf.splitParam`; that value comes from an external `repoConfig` service and the Fluent UI value is not established here. The three-package test intentionally exercises the existing PR diff route, so its result may include false removals for images that were not captured. Treat that policy result as experimental, not as proof that omitted snapshots should be deleted. Do not approve those removals or change baseline publishing as part of this experiment. Actual deleted screenshots must still be removable when a safe partial-upload policy is established. The screenshot report JSON only signals whether a workflow should run or skip; it does not limit the CLI's per-image comparison scope.

Pinned `nx-set-shas@v4.3.3` uses the merge base of `origin/master` and `HEAD` on PR branches; its `workflow-id` input does not change PR-mode SHA selection. Baseline-aligned SHA selection, if required for this pilot, needs an explicit separate policy.

## Initial verification

In matched CI run 38412014600, all-affected granular generation completed in 49.75 minutes versus 50.6 minutes for legacy generation. The shared build took 33 seconds; granular capture took 2,791 seconds, confirming that capture dominates the measured run. The next CI comparison deliberately narrows selection to the three configured candidates and increases the per-project worker count from two to four. This changes both workload size and concurrency, so any aggregate delta is not solely a concurrency speedup.

The pilot passed 26 focused regression tests, the workspace-plugin implementation and spec typecheck, and package-scoped lint. Real affected checks selected only one group for a story or local-helper change, and all 51 groups for shared utilities, Storybook configuration, or reused FluentProvider decorator changes. The legacy `test-vr` selection remained unchanged.

A real Spinner build and capture produced 17 nonblank PNGs. After deleting its generated Storybook and screenshot directories, both targets restored from Nx cache, including byte-identical screenshots. Collection retained the existing host report key and filenames. These checks do not establish full-host pixel equivalence, full-suite performance, or production partial-upload safety.

The shared-compilation smoke check selected Spinner and Text, performed one compilation, and produced 17 and 6 screenshots in isolated outputs without per-project builds. All six Text screenshot filenames, dimensions, and pixels matched the standalone path. Shared and capture caches restored correctly after deleting generated outputs; selecting only Text produced a distinct artifact, and restoring the two-project selection recovered its original ownership manifest. Collection included only the 23 screenshots in the legacy upload layout. This verifies the two-project protocol, not an all-affected CI speedup.

## Concurrency exploration

A cache-disabled local Spinner microbenchmark reused the same shared build, captured 17 stories with one Nx task at a time, and measured capture invocation wall time:

| StoryWright workers | Seconds |
| ------------------- | ------- |
| 2                   | 56.1    |
| 4                   | 37.0    |
| 8                   | 24.9    |

All runs retained the same 17 screenshot filenames, dimensions, and pixels. These are single local samples in increasing worker order, not a three-package or CI benchmark. The larger local Button/Input/Spinner sweep was stopped before producing a completed result. CI uses four workers per capture with two concurrent Nx tasks; compare its new three-package results with the prior full-suite run, and measure an eight-worker-per-project setting separately before adopting it.

StoryWright discovers stories before starting concurrency-sized capture batches. Discovery is serial within each project, and each batch waits for its slowest story. Screenshots also wait for load/network idle and tracked timers/DOM activity; the installed runner checks a five-second readiness deadline between attempts. `E2223` warnings mean the readiness loop ended while tracked activity remained, not proof that an image is incorrect. Higher concurrency can amortize some waiting but cannot eliminate discovery or readiness costs. The experiment does not reduce screenshot waits or bypass readiness checks.

## Rollout gates

- Compare full-host and granular-subset screenshot identities, including relative paths and report keys, and confirm unselected outputs are excluded.
- Prove partial-upload removal safety against the actual CLI and external service configuration, for omitted images and genuine deletions.
- Verify cache restore inputs for the host build, virtual build, and capture targets so isolated cached runs do not consume stale or absent storybook assets.
- Confirm all 51 groups and 137 stories are covered. Treat MakeStyles as a conservative `react-provider` infrastructure proxy and ShadowDOM as `react-shared-contexts` explicit ownership; do not infer either from a single import.
- Measure cold, single-group, broad-change, and full-suite execution against the legacy baseline before making performance claims. Bound Nx parallelism in these measurements.
