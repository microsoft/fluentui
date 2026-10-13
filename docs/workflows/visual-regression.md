# Granular Visual Regression Pilot

This is an opt-in pilot. Existing PR and baseline `test-vr` workflows still use the legacy host apps; they are deliberately not switched to `test-vr-granular`. Their upload steps still pass the three legacy host projects. Virtual outputs are included only when their project names are explicitly passed in `config.projects`.

Draft PRs also run the advisory `Granular VRT pilot (affected)` job. It lists the actual PR's affected virtual projects and runs all of them with `nx affected -t test-vr-granular --parallel=2`. The capture step logs wall-clock timing for the scoped Storybook builds and captures. The collector includes only those affected groups. Its separate `vrt-granular-pilot` artifact matches the legacy upload layout: `screenshots-report.json` at the artifact root, with screenshot files under `vr-tests-react-components/`. Built Storybook files are not uploaded, and the artifact is not passed to VR approval. Pilot failures do not block the existing VR approval workflow. Compare the capture-step duration with the legacy job while accounting for the pilot's two-task parallelism and one-worker capture concurrency.

## Project model

The plugin registers 51 virtual groups for 137 unchanged v9 stories. A group named `<library>-vrt` has a synthetic root at `<packageRoot>/visual-regression`, with `build-vr-storybook` and `test-vr-granular` targets. It runs through the `vr-tests-react-components` host and writes to `apps/vr-tests-react-components/dist/visual-regression/<name>/{storybook,screenshots}`. The upload collector maps selected groups back into the existing `screenshots/vr-tests-react-components` namespace, preserving each story's relative screenshot path and the report shape `{ "vr-tests-react-components": { "path": "vr-tests-react-components" } }`. It rejects overlapping destination paths. Other groups' existing outputs are not collected.

```bash
yarn nx run react-button-vrt:test-vr-granular
yarn nx affected -t test-vr-granular --files=packages/react-components/react-button/library/src/components/Button/Button.tsx --parallel=2
yarn nx run-many -t test-vr-granular --parallel=2
```

The affected command can include legitimate dependents, not just the group that owns the changed file. Capture concurrency defaults to 1; bound Nx parallelism when running several groups so total browser/capture load stays controlled. A later move to package-local `visual-regression` sources will require updating manifest discovery and executor path resolution; project names and screenshot namespaces can remain stable.

The pilot's preview reuses only the addon's FluentProvider decorator and theme/direction globals, without its docs controls or manager preset. AriaLive is disabled by the host VRT parameters, and StrictMode is off with no story overrides, so neither decorator is included. Depending on the whole addon would make basic component changes affect all VRT groups through docs-only imports. The plugin tracks the provider decorator source files and their runtime package imports instead. Changes to shared preview code still affect every group. Lockfile, Node version, platform, and architecture changes invalidate cached captures conservatively.

When iterating on the local inference plugin, use `NX_DAEMON=false` or restart it with `yarn nx reset --onlyDaemon` so checks do not reuse an older loaded plugin implementation.

## Why PR uploads remain opt-in

The published `vr-approval-cli@0.5.1` implementation of `pixelBufferDiffFolders` marks omitted baseline images as removed. `filterRemovedScreenshots` retains removals when filename prefixes share `projectConf.splitParam`; that value comes from an external `repoConfig` service and the Fluent UI value is not established here. A partial PR upload could therefore request removal of baseline images that simply were not captured. Actual deleted screenshots must still be removable when a safe partial-upload policy is established. The screenshot report JSON only signals whether a workflow should run or skip; it does not limit the CLI's per-image comparison scope. Preserve the existing host namespace and do not wire this pilot into PR or baseline uploads until the service/CLI contract is proven safe for partial collections.

Pinned `nx-set-shas@v4.3.3` uses the merge base of `origin/master` and `HEAD` on PR branches; its `workflow-id` input does not change PR-mode SHA selection. Baseline-aligned SHA selection, if required for this pilot, needs an explicit separate policy.

## Initial verification

The pilot passed 26 focused regression tests, the workspace-plugin implementation and spec typecheck, and package-scoped lint. Real affected checks selected only one group for a story or local-helper change, and all 51 groups for shared utilities, Storybook configuration, or reused FluentProvider decorator changes. The legacy `test-vr` selection remained unchanged.

A real Spinner build and capture produced 17 nonblank PNGs. After deleting its generated Storybook and screenshot directories, both targets restored from Nx cache, including byte-identical screenshots. Collection retained the existing host report key and filenames. These checks do not establish full-host pixel equivalence, full-suite performance, or production partial-upload safety.

## Rollout gates

- Compare full-host and granular-subset screenshot identities, including relative paths and report keys, and confirm unselected outputs are excluded.
- Prove partial-upload removal safety against the actual CLI and external service configuration, for omitted images and genuine deletions.
- Verify cache restore inputs for the host build, virtual build, and capture targets so isolated cached runs do not consume stale or absent storybook assets.
- Confirm all 51 groups and 137 stories are covered. Treat MakeStyles as a conservative `react-provider` infrastructure proxy and ShadowDOM as `react-shared-contexts` explicit ownership; do not infer either from a single import.
- Measure cold, single-group, broad-change, and full-suite execution against the legacy baseline before making performance claims. Bound Nx parallelism in these measurements.
