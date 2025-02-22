## Summary

Fluent UI React version 8 (v8) is a little different than previous releases: we view it as an incremental release that starts setting up customers, partners, and contributors for the team's collective vision of improving the baseline components used in all Microsoft 365 experiences.

To install from npm: `npm install @fluentui/react@^8.0.0`

For a more detailed list of changes and features included in this release, see the [migration guide](Version-8-migration-guide).

Highlights:

- **No major visual changes**
- **[Package restructuring](#package-restructuring)** paves the way for smoother updates in the future
- **[React strict mode support](#react-strict-mode-support)**
  - Most components converted to function components with hooks
  - Unblocks use of [React strict mode](https://reactjs.org/docs/strict-mode.html) while developing applications
  - Unblocks adoption of [React concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) once it's released
- **[Theming improvements](#theming-changes)**: providing a unified way to apply and access themes
- Enhancements and smaller breaking changes to individual components, including deprecated API surface removal -- see [migration guide](Version-8-migration-guide#individual-components-new-features) for details
- ~~**Previews** of what's up next~~: (moved back to dev status--see [this comment](https://github.com/microsoft/fluentui/issues/12770#issuecomment-776389207))
  - ~~Improved Button with smaller bundle size and better performance~~
  - ~~Composition utilities~~

> **NOTES**:
>
> - Version 8 docs are now live on https://developer.microsoft.com/fluentui
> - **Some details of the release have changed since the original announcement.** For a summary of major changes, see [this comment](https://github.com/microsoft/fluentui/issues/12770#issuecomment-776389207). The overall impact is actually that **`@fluentui/react` version 8 is more similar to version 7.**

## What's in v8

_Note: "v8" here refers to "version 8," not the v8 JavaScript engine._

### Package restructuring

As part of this release, we're starting to restructure our packages to pave the way for future updates.

#### `[Breaking]` Package renaming `office-ui-fabric-react` to `@fluentui/react`

Starting in v8, the `office-ui-fabric-react` name has been discontinued and you will need to install `@fluentui/react` instead. Note that as a consequence of some related changes, **deep imports are no longer supported.** [More details and migration tips here.](Version-8-migration-guide#package-renames)

#### `[Breaking]` `@uifabric` to `@fluentui` package renames

The `@uifabric` packages have been moved to the `@fluentui` scope, and in some cases renamed to better align with current conventions. [More details and migration tips here.](Version-8-migration-guide#uifabric-package-renames)

We plan to provide a codemod (not yet implemented) to help with picking up the renames, but in the meantime you can find the mapping between old and new names in the link above.

### React strict mode support

#### Full [strict mode](https://reactjs.org/docs/strict-mode.html) support for all suite components

In components exported by the main `@fluentui/react` suite package, we've removed usage of all features that are unsupported in strict mode, such as legacy React lifecycle APIs (`UNSAFE_*`) and `ReactDOM.findDOMNode`. This should unblock testing with strict mode, as well as adoption of [concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) once it's released.

There may still be some more subtle strict/concurrent mode issues with components which can't be found just in a search for deprecated APIs (such as unsafe side effects in render lifecycles). If you encounter one of these, please file an issue.

(Exception: There are still a few components in `@fluentui/react-experiments` which use `UNSAFE_` methods or other features not supported in strict mode. These were lower priority to fix due to their experimental or deprecated status. If you have a dependency on an experimental component and need strict/concurrent mode, please file an issue.)

#### `[Breaking]` Function component conversion

Some components have been converted from class components to function components (and the remaining components may be converted in a minor version). In general this will not result in a significant change to the component API surface. However, there are a few important implications, [outlined in detail here](Version-8-migration-guide#function-component-conversions).

Main points:

- Class extension of components is no longer supported (exception: Picker components, BaseComponent)
- The `ref` prop now consistently returns the root element of the component (or for portaled components, returns the root element within the portal)
- `ReactDOM.findDOMNode` is not supported for function components
- Directly accessing components' `state` is no longer supported
- More components properly implement controlled/uncontrolled behavior and standard onChange signatures

### Theming changes

We know that the number of possible theming approaches and lack of clear guidance has been confusing to Fabric/Fluent UI React users in the past, so for version 8 we've added `ThemeProvider` as a unified approach to applying and accessing themes.

Please see [this wiki page](How-to-apply-theme-to-Fluent-UI-React-components) and/or the [ThemeProvider README](https://github.com/microsoft/fluentui/blob/master/packages/react/src/utilities/ThemeProvider/README.md) for details about usage and migration.

The `Fabric` and `Customizer` components have been deprecated in favor of `ThemeProvider`. (If you're using `Customizer` for purposes besides theming, please let us know.)

### Individual components: new features and breaking changes

In addition to the larger features outlined above, we've made some smaller features additions and breaking changes in individual components. [See the migration guide for details.](Version-8-migration-guide#individual-components-new-features)

## ~~What's in preview~~

### ~~`[IN PREVIEW]` Improved Button~~

This has moved back to dev status--see [this comment](https://github.com/microsoft/fluentui/issues/12770#issuecomment-776389207) for details.

### ~~`[IN PREVIEW]` Composition utilities~~

This has moved back to dev status--see [this comment](https://github.com/microsoft/fluentui/issues/12770#issuecomment-776389207) for details.

## Migration guide

[See this page](Version-8-migration-guide) for details on migrating to version 8, including a full list of breaking changes.
