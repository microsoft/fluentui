<!-- toc -->

- [New process/life-cycle flow](#new-processlife-cycle-flow)
  - [Major differences with previous unstable/stable flow](#major-differences-with-previous-unstablestable-flow)
  - [FAQ](#faq)
    - [Is there still a need for `_unstable` suffixes for hooks/utilities?](#is-there-still-a-need-for-_unstable-suffixes-for-hooksutilities)
    - [What's the process for updating already existing unstable package](#whats-the-process-for-updating-already-existing-unstable-package)
      - [package not released to npm yet (`9.0.0-alpha.x`):](#package-not-released-to-npm-yet-900-alphax)
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

### What's the process for updating already existing unstable package

#### package not released to npm yet (`9.0.0-alpha.x`):

> All packages migration PR https://github.com/microsoft/fluentui/pull/28474

<details>
Let's say you have already created `packages/react-components/react-control` package which is in unstable phase.

Follow these steps:

1. rename package directory and api.md

```sh
mv packages/react-components/react-control packages/react-components/react-control-preview
mv packages/react-components/react-control/etc/react-control.api.md packages/react-components/react-control/etc/react-control-preview.api.md
```

2. Update `README.md`

```diff
-# @fluentui/react-control-preview
+# @fluentui/react-control
```

3. Update `package.json`

```diff
{
- "name": "@fluentui/react-control",
+ "name": "@fluentui/react-control-preview",
- "version": "9.0.0-alpha.0",
+ "version": "0.0.0",
  "beachball": {
    "disallowedChangeTypes": [
      "major",
-     "minor",
-     "patch",
+     "prerelease"
    ]
},
}
```

4. Update `project.json`

```diff
{
- "name": "@fluentui/react-control",
+ "name": "@fluentui/react-control-preview",
}
```

5. Update `jest.config.js`

```diff
module.exports = {
-  displayName: 'react-control',
+  displayName: 'react-control-preview',
}
```

6. Update `tsconfig.base.json` and `tsconfig.base.all.json`

```diff
"paths": {
- "@fluentui/react-control": ["packages/react-components/react-control/src/index.ts"]
+ "@fluentui/react-control-preview": ["packages/react-components/react-control-preview/src/index.ts"]
}
```

7. Update `/github/CODEOWNERS`

```diff
-packages/react-components/react-control @microsoft/<team-name>
+packages/react-components/react-control-preview @microsoft/<team-name>
```

8. now when ready to release follow [Unstable phase (first release)](#unstable-phase-first-release)

</details>

#### package already released to npm as `9.0.0-(alpha|beta|rc).x`:

> automation PR in progress https://github.com/microsoft/fluentui/pull/28481

# Dev Guide

Following chapters describe required steps for each phase. All of them are generated so it's only a matter of invoking proper generator.

> Following graph sums those steps as well https://github.com/microsoft/fluentui/blob/master/tools/workspace-plugin/src/generators/prepare-initial-release/README.md#v9-release-process-flow

> [!TIP]
> you can use `yarn generate` or Nx Console to navigate through the process.

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
yarn nx g @fluentui/workspace-plugin:prepare-initial-release --project react-one-preview --phase=preview
```

## 3. Stable phase

> automation status: implemented ✅ / https://github.com/microsoft/fluentui/pull/28505

You can use `yarn generate` or Nx Console to navigate through the process.

```sh
yarn nx g @fluentui/workspace-plugin:prepare-initial-release --project react-one-preview --phase=stable
```

- TODO: deprecate all released `*-preview` package version on npm on CI during release
