# Change Log - @uifabric/foundation

This log was last generated on Thu, 07 May 2020 01:06:55 GMT and should not be manually modified.

<!-- Start content -->

## [7.7.10](https://github.com/microsoft/fluentui/tree/@uifabric/foundation_v7.7.10)

Thu, 07 May 2020 01:06:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/foundation_v7.7.0..@uifabric/foundation_v7.7.10)

### Patches

- Addressing commonjs imports. ([PR #13031](https://github.com/microsoft/fluentui/pull/13031) by dzearing@microsoft.com)

## [7.7.0](https://github.com/microsoft/fluentui/tree/@uifabric/foundation_v7.7.0)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/foundation_v7.5.25..@uifabric/foundation_v7.7.0)

### Minor changes

- Fixing rtl customizer scenarios in Foundation components. ([PR #12649](https://github.com/microsoft/fluentui/pull/12649) by humbertomakotomorimoto@gmail.com)

### Patches

- Readme: Fabric=>Fluent wording updates ([PR #12508](https://github.com/microsoft/fluentui/pull/12508) by elcraig@microsoft.com)

## 7.5.23
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
## 7.5.22
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 7.5.2
Fri, 17 Jan 2020 02:32:17 GMT

### Patches

- Update tslib minver to first version containing __spreadArrays helper due to changes in how TS emits spreads. (jagore@microsoft.com)
## 7.5.1
Thu, 16 Jan 2020 12:28:58 GMT

### Patches

- Upgrade repo to TS3.7. (jagore@microsoft.com)
## 7.5.0
Thu, 07 Nov 2019 12:26:32 GMT

### Minor changes

- Deprecate IPropsWithChildren type that is redundant with React.PropsWithChildren. (jagore@microsoft.com)
## 7.4.4
Thu, 03 Oct 2019 23:14:46 GMT

### Patches

- Fixing a publishing issue with foundation (odbuild@microsoft.com)
- Fixes broken publish (odbuild@microsoft.com)
## 7.4.2
Thu, 03 Oct 2019 01:14:35 GMT

### Patches

- Foundation next requires @uifabric/merge-styles dependency (KevinTCoughlin@users.noreply.github.com)
## 7.4.1
Thu, 12 Sep 2019 12:34:15 GMT

### Patches

- Enable api-extractor, and minor import fixes to prevent api-extractor errors (elcraig@microsoft.com)
## 7.4.0
Fri, 06 Sep 2019 12:34:51 GMT

### Minor changes

- Foundation: Allowing recomposition in composed. (humbertomakotomorimoto@gmail.com)
## 7.3.1
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- fix version file (kchau@microsoft.com)
## 7.3.0
Mon, 02 Sep 2019 12:33:56 GMT

### Minor changes

- Foundation: Moving slots inside composed options. (humbertomakotomorimoto@gmail.com)
## 7.2.0
Thu, 29 Aug 2019 12:30:00 GMT

### Minor changes

- Renaming createComponent to compose and moving View inside component options object. (humbertomakotomorimoto@gmail.com)
## 7.1.0
Mon, 26 Aug 2019 12:30:49 GMT

### Minor changes

- Memoizing styling in createComponent for components that have their default styling determined entirely by tokens. (Humberto.Morimoto@microsoft.com)
## 7.0.4
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.0.3
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.0.2
Mon, 01 Jul 2019 18:51:42 GMT

### Patches

- adds react-app-polyfill

## 7.0.1
Fri, 14 Jun 2019 15:54:00 GMT

### Patches

- Major bumping the foundation package. (Though the tooling will report this as a patch.)

## 0.109.2
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.

## 0.109.1
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 0.8.0
Wed, 12 Jun 2019 00:42:26 GMT

### Minor changes

- Updating IComponent typings for ease of use in tests.
- Evolve create component API to separate out view and make options bag optional.
- Enable API verification and export legacy styled.
- Foundation: Convert state components to hooks.
- Slots: Move slot options from individual props to new slots prop object.
- Slots: Refactor API and add slot options object.

### Patches

- Update and dedupe React deps.

## 0.7.7
Tue, 11 Jun 2019 12:21:35 GMT

### Patches

- upgrade to api-extractor 7.1.6

## 0.7.6
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 0.7.5
Thu, 09 May 2019 12:35:50 GMT

### Patches

- Remove duplicate export from foundation package.

## 0.7.4
Tue, 02 Apr 2019 00:38:14 GMT

### Patches

- Use ^ ranges instead of >=

## 0.7.3
Mon, 01 Apr 2019 12:37:03 GMT

### Patches

- Passing styling and tokens to view.

## 0.7.2
Fri, 15 Mar 2019 12:34:06 GMT

### Patches

- TSDoc fixes.

## 0.7.1
Mon, 04 Feb 2019 13:36:12 GMT

### Patches

- Optimize React hierarchy by naming Unknowns and removing view layers.

## 0.7.0
Thu, 31 Jan 2019 20:10:48 GMT

### Minor changes

- Promote Slots and Tokens implementation of Foundation.

## 0.6.0
Fri, 14 Dec 2018 13:35:30 GMT

### Minor changes

- Add styling and utilities packages as dependencies and remove corresponding type injection.

## 0.5.7
Wed, 31 Oct 2018 12:32:41 GMT

### Patches

- Add theme provider for using schemes. Remove implicit scheme prop for all components using Foundation.

## 0.5.6
Thu, 18 Oct 2018 20:22:36 GMT

### Patches

- Remove api-extractor.disabled.json

## 0.5.5
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies

## 0.5.4
Tue, 02 Oct 2018 12:28:04 GMT

### Patches

- Interface refactoring for reducing dev friction.

## 0.5.3
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file
- Support schemes through new schemes prop.

## 0.5.2
Mon, 17 Sep 2018 12:27:05 GMT

### Patches

- Refactor Foundation to remove code duplication, ease props typing, and make option parameter definition more consistent.

## 0.5.1
Mon, 10 Sep 2018 10:24:57 GMT

### Patches

- Remove Object.assign usage to fix IE11 issues.

## 0.5.0
Fri, 07 Sep 2018 22:04:50 GMT

### Minor changes

- Adjusting foundation usage, using new React 16 context.

## 0.4.1
Wed, 29 Aug 2018 10:28:42 GMT

### Patches

- Remove Object.assign usage to fix IE11 issues.

## 0.4.0
Fri, 24 Aug 2018 17:02:14 GMT

### Minor changes

- Reverting Customizer React 16 context change.

## 0.3.0
Thu, 23 Aug 2018 10:28:17 GMT

### Minor changes

- Adjusting foundation usage, using new React 16 context.

## 0.2.5
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- disabling codepen task

## 0.2.4
Fri, 10 Aug 2018 10:26:09 GMT

### Patches

- Add support for contextual theming and styling.

## 0.2.3
Wed, 08 Aug 2018 10:25:08 GMT

### Patches

- Align createComponent naming with React terminology.

## 0.2.2
Fri, 03 Aug 2018 10:25:59 GMT

### Patches

- Add tslib as dependency.

## 0.2.1
Thu, 02 Aug 2018 10:23:19 GMT

### Patches

- Add webpack config.

## 0.2.0
Wed, 01 Aug 2018 10:25:51 GMT

### Minor changes

- Major improvements to typing and functionality.

## 0.1.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- Addressing bad imports.

## 0.0.3
Mon, 09 Jul 2018 18:08:32 GMT

### Patches

- Improve typing consistency.
