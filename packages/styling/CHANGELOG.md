# Change Log - @uifabric/styling

This log was last generated on Tue, 26 Sep 2017 20:42:17 GMT and should not be manually modified.

## 0.24.2
Tue, 26 Sep 2017 20:42:17 GMT

### Patches

- Reverting Customizer changes, as they are breaking. Will include in 5.0.

## 0.24.1
Tue, 26 Sep 2017 10:09:04 GMT

### Patches

- Updating default theme registration to use the new `Customizations` helper.

## 0.24.0
Thu, 14 Sep 2017 00:34:57 GMT

### Minor changes

- Adding `MoreVertical` icon.

## 0.23.1
Tue, 12 Sep 2017 17:41:25 GMT

### Patches

- Fixing circular dependency issue.

## 0.23.0
Mon, 11 Sep 2017 10:08:07 GMT

### Minor changes

- Adding the `getIconClassName` function, which will provide a way for partners to generate a given icon class name. This replaces the implicit `ms-Icon--*` pattern being used now, as well as using IconClassNames, which will go away in Fabric 5.

## 0.22.1
Mon, 04 Sep 2017 10:16:56 GMT

### Patches

- Icons: Added textDocument back into the icon list

## 0.22.0
Fri, 01 Sep 2017 16:51:57 GMT

### Minor changes

- Add a new semantic slot for the warning foreground color

### Patches

- Add FullWidth icon.

## 0.21.1
Tue, 29 Aug 2017 20:55:35 GMT

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 0.21.0
Tue, 29 Aug 2017 10:20:56 GMT

### Minor changes

- Theming: added an accent color slot

## 0.20.2
Fri, 25 Aug 2017 20:31:51 GMT

### Patches

- Adding back sourcemap content to .map files, which should alleviate "../src/* missing" issues when using webpack.

## 0.20.1
Wed, 23 Aug 2017 19:04:55 GMT

### Patches

- add Comment icon

## 0.20.0
Fri, 18 Aug 2017 16:32:33 GMT

### Minor changes

- mergeStyleSets: tweaked the return type to be less restrictive.

## 0.19.2
Mon, 14 Aug 2017 10:20:31 GMT

### Patches

- getFocusStyle: Add -moz-focus-inner to fix outline bug

## 0.19.1
Fri, 11 Aug 2017 19:38:35 GMT

### Patches

- add StreamLogo and PowerBILogo icons

## 0.19.0
Tue, 08 Aug 2017 15:28:32 GMT

### Minor changes

- Styling: added a screenReaderText utility style
- Adding a color to the palette

## 0.18.0
Mon, 07 Aug 2017 10:22:46 GMT

### Minor changes

- Adding 4 icons that were missing in the codes map.

## 0.17.0
Fri, 04 Aug 2017 10:11:48 GMT

### Minor changes

- Theming: add semantic slots for warnings, and also legacy theme semantic slots

## 0.16.0
Thu, 03 Aug 2017 10:13:03 GMT

### Minor changes

- TypeScript 2.4.1 bump

### Patches

- add Spacer and Divider toolbox icon

## 0.15.4
Wed, 02 Aug 2017 10:22:40 GMT

*Changes not tracked*

## 0.15.3
Tue, 01 Aug 2017 10:13:55 GMT

*Changes not tracked*

## 0.15.2
Mon, 31 Jul 2017 10:12:08 GMT

*Changes not tracked*

## 0.15.1
Fri, 28 Jul 2017 18:36:00 GMT

*Changes not tracked*

## 0.15.0
Fri, 28 Jul 2017 10:23:10 GMT

### Minor changes

- Adding High contrast colors to the paletter

### Patches

- Theming: add settings to the interface so we can track whether the current theme is inverted or not

## 0.14.0
Thu, 27 Jul 2017 10:23:33 GMT

### Minor changes

- Icons: Added new icons from 2.38

## 0.13.16
Tue, 25 Jul 2017 10:22:35 GMT

*Changes not tracked*

## 0.13.15
Mon, 24 Jul 2017 10:24:30 GMT

*Changes not tracked*

## 0.13.14
Fri, 21 Jul 2017 10:21:45 GMT

### Patches

- Adding multi-column mapping to the icon map to be available in the ChoiceGroup
- Theming: fix color mapping for listItemBackgroundChecked

## 0.13.13
Thu, 20 Jul 2017 10:11:23 GMT

*Changes not tracked*

## 0.13.12
Wed, 19 Jul 2017 21:40:34 GMT

### Patches

- Add statusCircleCheckmark to IconCodes.ts.  Add font file version to icon url in DefaultFontStyles.ts.

## 0.13.11
Mon, 17 Jul 2017 18:38:01 GMT

*Changes not tracked*

## 0.13.10
Mon, 17 Jul 2017 10:22:38 GMT

*Changes not tracked*

## 0.13.9
Fri, 14 Jul 2017 17:34:53 GMT

*Changes not tracked*

## 0.13.8
Thu, 13 Jul 2017 10:21:52 GMT

### Patches

- Only initialize the default theme once, even if multiple instances of @uifabric/styling are executed.

## 0.13.7
Thu, 13 Jul 2017 02:58:02 GMT

*Changes not tracked*

## 0.13.6
Wed, 12 Jul 2017 01:49:50 GMT

### Patches

- Fixing typings for TypeScript 2.4.1 compatibility.

## 0.13.5
Tue, 11 Jul 2017 10:14:04 GMT

*Changes not tracked*

## 0.13.4
Mon, 10 Jul 2017 19:18:55 GMT

*Changes not tracked*

## 0.13.3
Mon, 10 Jul 2017 10:22:21 GMT

*Changes not tracked*

## 0.13.2
Sat, 08 Jul 2017 05:59:28 GMT

*Changes not tracked*

## 0.13.1
Sat, 08 Jul 2017 03:34:35 GMT

### Patches

- Updating dev dependencies.

## 0.13.0
Fri, 07 Jul 2017 10:11:38 GMT

### Minor changes

- Styling package: remove optionals from interfaces, since consumers can now use partial interfaces to define overrides.

### Patches

- Enable strict null checks in the styling package

## 0.12.3
Thu, 06 Jul 2017 10:11:47 GMT

*Changes not tracked*

## 0.12.2
Tue, 04 Jul 2017 10:21:53 GMT

*Changes not tracked*

## 0.12.1
Mon, 03 Jul 2017 10:11:52 GMT

*Changes not tracked*

## 0.12.0
Fri, 30 Jun 2017 19:44:26 GMT

### Minor changes

- Dependencies now use path based imports to various utilities to minimize the graph dependency.

## 0.11.10
Fri, 30 Jun 2017 10:23:15 GMT

*Changes not tracked*

## 0.11.9
Thu, 29 Jun 2017 20:48:31 GMT

*Changes not tracked*

## 0.11.8
Thu, 29 Jun 2017 10:13:16 GMT

*Changes not tracked*

## 0.11.7
Wed, 28 Jun 2017 10:12:04 GMT

*Changes not tracked*

## 0.11.6
Tue, 27 Jun 2017 01:26:31 GMT

### Patches

- Enable forceConsistentCasingInFileNames tsconfig option

## 0.11.5
Fri, 23 Jun 2017 20:02:00 GMT

*Changes not tracked*

## 0.11.4
Fri, 23 Jun 2017 04:12:23 GMT

*Changes not tracked*

## 0.11.3
Thu, 22 Jun 2017 21:45:08 GMT

*Changes not tracked*

## 0.11.2
Thu, 22 Jun 2017 10:13:03 GMT

*Changes not tracked*

## 0.11.1
Wed, 21 Jun 2017 01:52:48 GMT

### Patches

- Instrumenting the performance of css registration.

## 0.11.0
Wed, 21 Jun 2017 00:45:41 GMT

### Minor changes

- Consume latest version of createApp 

### Patches

- General class exports now register on demand, resulting in less unneeded evaluation of classnames.
- Fixing circular dependency between @uifabric/styling/utilities and @uifabric/styling/styles

## 0.10.5
Tue, 20 Jun 2017 10:22:47 GMT

*Changes not tracked*

## 0.10.4
Sat, 17 Jun 2017 17:39:43 GMT

*Changes not tracked*

## 0.10.2
Sat, 17 Jun 2017 06:27:45 GMT

*Changes not tracked*

## 0.10.1
Sat, 17 Jun 2017 04:36:46 GMT

### Patches

- Fixing amd import that was broken byt the no-implicit-anys fix.

## 0.10.0
Fri, 16 Jun 2017 23:02:08 GMT

### Minor changes

- Enable no-implicit-any in the styling package

## 0.9.1
Fri, 16 Jun 2017 19:39:47 GMT

*Changes not tracked*

## 0.9.0
Thu, 15 Jun 2017 23:55:18 GMT

### Minor changes

- Removed new icons that were added recently

## 0.8.1
Thu, 15 Jun 2017 10:09:15 GMT

*Changes not tracked*

## 0.8.0
Wed, 14 Jun 2017 06:02:15 GMT

### Minor changes

- Updating FabricConfig support to allow themes to be providable at bundle load time without weird race conditions.
- Updates to version 2.30 of the icon font

### Patches

- Remove high contrast adjust from common styles
- Enable strictNullChecks in utilities package

## 0.7.4
Tue, 13 Jun 2017 10:13:21 GMT

*Changes not tracked*

## 0.7.3
Mon, 12 Jun 2017 01:47:18 GMT

### Patches

- Enable no implicit any in utilities package

## 0.7.2
Fri, 09 Jun 2017 10:10:47 GMT

### Patches

- Update the version of rtl-css-js used to get latest bug fixes

## 0.7.1
Thu, 08 Jun 2017 10:20:07 GMT

*Changes not tracked*

## 0.7.0
Thu, 08 Jun 2017 00:18:05 GMT

### Minor changes

- ITheme: Make palette a required prop

## 0.6.1
Tue, 06 Jun 2017 07:41:47 GMT

*Changes not tracked*

## 0.6.0
Tue, 06 Jun 2017 06:06:46 GMT

### Minor changes

- createTheme: adding to exports
- add more semantic color slots

### Patches

- Adding tslib dependency to reduce re

## 0.5.0
Tue, 06 Jun 2017 00:50:06 GMT

### Minor changes

- Styling: loadTheme now updates both legacy theme as well as current global theming. All theme objects provided by customizable will get updated correctly.

## 0.4.3
Fri, 02 Jun 2017 01:19:36 GMT

*Changes not tracked*

## 0.4.2
Thu, 01 Jun 2017 16:34:03 GMT

*Changes not tracked*

## 0.4.1
Wed, 31 May 2017 01:58:23 GMT

### Patches

- Icon classes: adjusting how they are registered so that we merge raw styles together to form the icon classes.

## 0.4.0
Tue, 30 May 2017 20:23:45 GMT

### Minor changes

- Adding support for specifying `window.FabricConfig.fontBaseUrl` in order to customize where the font resources are pulled from. Leaving it blank will avoid fontface definitions from being registered.

## 0.3.0
Tue, 30 May 2017 03:27:20 GMT

### Minor changes

- Major updates to mergeStyles and other various utilities. Updating fonts to follow latest fabric-core language fallbacks.

## 0.2.0
Thu, 18 May 2017 10:09:58 GMT

### Minor changes

- Various casing changes for exported members. Added `mergeStyles` helper for merging style sets. Moving content around in the project.

## 0.1.0
Mon, 08 May 2017 21:31:57 GMT

### Minor changes

- Change the build rig in @uifabric/styling to one that enables the creation of a bundle safe for consumption by SharePoint partners. This should have no effect on the output of the modules.

## 0.0.2
Fri, 21 Apr 2017 06:23:54 GMT

### Patches

- Adding the initial styling package. Initial checkin, not meant to be consumed until we release a 1.0.0.

