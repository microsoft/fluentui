# Change Log - @fluentui/theme

This log was last generated on Fri, 12 Feb 2021 12:26:20 GMT and should not be manually modified.

<!-- Start content -->

## [2.0.0-beta.15](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.15)

Fri, 12 Feb 2021 12:26:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.14..@fluentui/theme_v2.0.0-beta.15)

### Changes

- [BREAKING] Remove theming logic/interface which are unrelated to v8 release. ([PR #16935](https://github.com/microsoft/fluentui/pull/16935) by xgao@microsoft.com)

## [2.0.0-beta.14](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.14)

Thu, 11 Feb 2021 00:58:10 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.13..@fluentui/theme_v2.0.0-beta.14)

### Changes

- Bump @fluentui/utilities to v8.0.0-beta.11 ([PR #16911](https://github.com/microsoft/fluentui/pull/16911) by xgao@microsoft.com)

## [2.0.0-beta.13](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.13)

Thu, 28 Jan 2021 12:25:56 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.12..@fluentui/theme_v2.0.0-beta.13)

### Changes

- Updating to webpack 5, latest typings, latest loaders and plugins. ([PR #16447](https://github.com/microsoft/fluentui/pull/16447) by dzearing@microsoft.com)

## [2.0.0-beta.12](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.12)

Thu, 21 Jan 2021 12:36:12 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.11..@fluentui/theme_v2.0.0-beta.12)

### Changes

-  Updating dev dependencies. ([PR #16548](https://github.com/microsoft/fluentui/pull/16548) by dzearing@microsoft.com)

## [2.0.0-beta.11](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.11)

Fri, 15 Jan 2021 12:30:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.8..@fluentui/theme_v2.0.0-beta.11)

### Changes

- createTheme: fix bug when theme is inverted. ([PR #16484](https://github.com/microsoft/fluentui/pull/16484) by xgao@microsoft.com)

## [2.0.0-beta.8](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.8)

Tue, 01 Dec 2020 12:38:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.7..@fluentui/theme_v2.0.0-beta.8)

### Changes

- Added selected as a possible key in ColorTokens. ([PR #16035](https://github.com/microsoft/fluentui/pull/16035) by humbertomakotomorimoto@gmail.com)

## [2.0.0-beta.7](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.7)

Mon, 23 Nov 2020 12:31:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.5..@fluentui/theme_v2.0.0-beta.7)

### Changes

- Move getTokens logic out from ThemeProvider to mergeTheme/createTheme. ([PR #15976](https://github.com/microsoft/fluentui/pull/15976) by xgao@microsoft.com)

## [2.0.0-beta.5](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.5)

Tue, 03 Nov 2020 12:32:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.3..@fluentui/theme_v2.0.0-beta.5)

### Changes

- Mark stylesheets in theme as internal. ([PR #15806](https://github.com/microsoft/fluentui/pull/15806) by xgao@microsoft.com)

## [2.0.0-beta.3](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.3)

Wed, 28 Oct 2020 12:32:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v2.0.0-beta.0..@fluentui/theme_v2.0.0-beta.3)

### Changes

- Fixing and expanding token typings. ([PR #15518](https://github.com/microsoft/fluentui/pull/15518) by humbertomakotomorimoto@gmail.com)

## [2.0.0-beta.0](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v2.0.0-beta.0)

Fri, 23 Oct 2020 03:26:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v1.2.1..@fluentui/theme_v2.0.0-beta.0)

### Changes

- Updating typings to add `Variants`. ([PR #15337](https://github.com/microsoft/fluentui/pull/15337) by dzearing@hotmail.com)
- Rename office-ui-fabric-react package and update references ([PR #15271](https://github.com/microsoft/fluentui/pull/15271) by elcraig@microsoft.com)
- Update createTheme interface to use Theme and PartialTheme; mark tokens typing in Theme as internal; update mergeThemes. ([PR #15326](https://github.com/microsoft/fluentui/pull/15326) by xgao@microsoft.com)
- Fix ParitalTheme typing. ([PR #15372](https://github.com/microsoft/fluentui/pull/15372) by xgao@microsoft.com)
- Add missing version.ts. ([PR #15456](https://github.com/microsoft/fluentui/pull/15456) by xgao@microsoft.com)
- Fixing ColorTokens typings. ([PR #15463](https://github.com/microsoft/fluentui/pull/15463) by Humberto.Morimoto@microsoft.com)
- Make ITheme/IPartialTheme to be identical with Theme/PartialTheme typings. ([PR #15504](https://github.com/microsoft/fluentui/pull/15504) by xgao@microsoft.com)
- Fix inferred type error related to ITheme. ([PR #15573](https://github.com/microsoft/fluentui/pull/15573) by xgao@microsoft.com)
- Rename @uifabric/set-version to @fluentui/set-version ([PR #15616](https://github.com/microsoft/fluentui/pull/15616) by ololubek@microsoft.com)
- Rename @uifabric/merge-styles to @fluentui/merge-styles ([PR #15627](https://github.com/microsoft/fluentui/pull/15627) by ololubek@microsoft.com)
- Rename @uifabric/react-hooks to @fluentui/react-hooks & @uifabric/utilities to @fluentui/utilities ([PR #15629](https://github.com/microsoft/fluentui/pull/15629) by ololubek@microsoft.com)
- Remove react-dom from peerDependencies ([PR #15634](https://github.com/microsoft/fluentui/pull/15634) by elcraig@microsoft.com)

## [1.2.1](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v1.2.1)

Sun, 27 Sep 2020 04:20:52 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v1.2.0..@fluentui/theme_v1.2.1)

### Patches

- Disable pointer-events during slide animations ([PR #15219](https://github.com/microsoft/fluentui/pull/15219) by behowell@microsoft.com)
- Add FluentTheme and Depths exports. ([PR #15248](https://github.com/microsoft/fluentui/pull/15248) by xgao@microsoft.com)

## [1.2.0](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v1.2.0)

Fri, 25 Sep 2020 12:25:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v1.1.0..@fluentui/theme_v1.2.0)

### Minor changes

- Move AnimationStyles code from styling package to theme package. ([PR #15162](https://github.com/microsoft/fluentui/pull/15162) by xgao@microsoft.com)
- Move createTheme from styling to theme package. ([PR #15163](https://github.com/microsoft/fluentui/pull/15163) by xgao@microsoft.com)

## [1.1.0](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v1.1.0)

Wed, 23 Sep 2020 12:27:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v0.4.0..@fluentui/theme_v1.1.0)

### Minor changes

- Moving SizeValue const from react-button to theme package. ([PR #14206](https://github.com/microsoft/fluentui/pull/14206) by makotom@microsoft.com)

### Patches

- Bump theme package version to be 1.0.0 since it's used by other major packages. ([PR #15174](https://github.com/microsoft/fluentui/pull/15174) by xgao@microsoft.com)

## [0.4.0](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v0.4.0)

Tue, 22 Sep 2020 12:25:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v0.3.0..@fluentui/theme_v0.4.0)

### Minor changes

- Add default fonts from styling package. ([PR #15129](https://github.com/microsoft/fluentui/pull/15129) by xgao@microsoft.com)

## [0.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v0.3.0)

Thu, 17 Sep 2020 12:25:04 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v0.1.2..@fluentui/theme_v0.3.0)

### Minor changes

- Updating color token references to use `color` prefix, and `accent` tokens have been renamed to `brand`. ([PR #15070](https://github.com/microsoft/fluentui/pull/15070) by dzearing@hotmail.com)

## [0.1.2](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v0.1.2)

Wed, 26 Aug 2020 12:35:38 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/theme_v0.1.1..@fluentui/theme_v0.1.2)

### Patches

- Fix Theme and PartialTheme typing. ([PR #14741](https://github.com/microsoft/fluentui/pull/14741) by xgao@microsoft.com)

## [0.1.1](https://github.com/microsoft/fluentui/tree/@fluentui/theme_v0.1.1)

Tue, 25 Aug 2020 12:36:19 GMT

### Patches

- Initial checkin for theme package. ([PR #14650](https://github.com/microsoft/fluentui/pull/14650) by xgao@microsoft.com)
