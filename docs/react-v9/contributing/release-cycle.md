<!-- toc -->

- [New process/life-cycle flow](#new-processlife-cycle-flow)
  - [Major differences with previous unstable/stable flow](#major-differences-with-previous-unstablestable-flow)
  - [FAQ](#faq)
    - [Is there still a need for `_unstable` suffixes for hooks/utilities?](#is-there-still-a-need-for-_unstable-suffixes-for-hooksutilities)
    - [What's the process for updating already existing unstable package](#whats-the-process-for-updating-already-existing-unstable-package)
      - [package already released to npm as `9.0.0-(alpha|beta|rc).x`:](#package-already-released-to-npm-as-900-alphabetarcx)
- [Dev Guide](#dev-guide)
  - [1. Kick-off phase](#1-kick-off-phase)
  - [2. Preview phase](#2-preview-phase)
  - [3. Stable phase](#3-stable-phase)

<!-- tocstop -->

# New process/life-cycle flow

<a href="https://github.com/microsoft/fluentui/assets/1223799/6e4648a6-0e50-4c16-b3ca-dba77869b38a">
<img alt="unstable-stable-api-new-flow" src="https://github.com/microsoft/fluentui/assets/1223799/6e4648a6-0e50-4c16-b3ca-dba77869b38a" />
</a>

## Major differences with previous unstable/stable flow

- unstable/preview components don't start with `9.0.0-<prerelease-type>.0`
- unstable/preview components will never be part of `@fluentui/react-components` suite. They can be used by installing independent package.
- 👉 **`react-components/unstable` is frozen and deprecated - this api cannot be changed in any way**
- both stable and unstable(preview) should always use `^` within package.json dependencies (no more pinned versions for pre-releases needed)
- `*-preview` packages are part of our official storybook public docs right after 1st release
  - one can provide public doc-site link right away to designers/partners to test it out **without any hacks**
- unstable/preview packages follow strict semantic versioning via `0.major.(minor|patch)` pattern
  - if your changes within preview package are breaking use change-type `minor`
  - if you add new features or fixes within preview package use change-type `patch`

## FAQ

### Is there still a need for `_unstable` suffixes for hooks/utilities?

Any utilities that are in a stable package **cannot be broken**. Therefore, the purpose of the `_unstable` suffix has changed. If the owner feels confident that the API of that hook/utility has a sufficient level of extensibility, there is no need for a suffix. However, if there are doubts about the implementation that can be addressed in the future the `_unstable` suffix can communicate that to users. A stable version (i.e. one without the suffix) can be reserved for future use once there is more confidence the use case or functionality.

Any hooks/utilities with the `_unstable` suffix **cannot be removed and cannot be broken until the next major version**.

# Dev Guide

Following chapters describe required steps for each phase. All of them are generated so it's only a matter of invoking proper generator.

> Following graph sums those steps as well https://github.com/microsoft/fluentui/blob/master/tools/workspace-plugin/src/generators/prepare-initial-release/README.md#v9-release-process-flow

## 1. Kick-off phase

> automation status: implemented ✅ / https://github.com/microsoft/fluentui/pull/28474

Bootstrap new package, via `yarn create-package`

```sh
yarn create-package

# triggers standard prompt

? Package name (do NOT include @fluentui prefix):  react-hello
```

This will do the usual scaffolding and adds `-preview` suffix to the package name automatically

## 2. Preview phase

> automation status: implemented ✅ / https://github.com/microsoft/fluentui/pull/28505

```sh
yarn nx g @fluentui/workspace-plugin:prepare-initial-release --project @fluentui/react-one-preview --phase=preview
```

## 3. Stable phase

> automation status: implemented ✅ / https://github.com/microsoft/fluentui/pull/28505

```sh
yarn nx g @fluentui/workspace-plugin:prepare-initial-release --project @fluentui/react-one-preview --phase=stable
```

- TODO: deprecate all released `*-preview` package version on npm on CI during release
