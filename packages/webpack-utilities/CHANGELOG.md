# Change Log - @fluentui/webpack-utilities

This log was last generated on Fri, 12 Feb 2021 12:26:20 GMT and should not be manually modified.

<!-- Start content -->

## [8.0.0-beta.3](https://github.com/microsoft/fluentui/tree/@fluentui/webpack-utilities_v8.0.0-beta.3)

Fri, 12 Feb 2021 12:26:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/webpack-utilities_v8.0.0-beta.2..@fluentui/webpack-utilities_v8.0.0-beta.3)

### Changes

- Webpack dependency updated. ([PR #16942](https://github.com/microsoft/fluentui/pull/16942) by dzearing@microsoft.com)

## [8.0.0-beta.2](https://github.com/microsoft/fluentui/tree/@fluentui/webpack-utilities_v8.0.0-beta.2)

Tue, 09 Feb 2021 12:24:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/webpack-utilities_v8.0.0-beta.1..@fluentui/webpack-utilities_v8.0.0-beta.2)

### Changes

- Combine react-internal back into react, and update references ([PR #16832](https://github.com/microsoft/fluentui/pull/16832) by elcraig@microsoft.com)

## [8.0.0-beta.1](https://github.com/microsoft/fluentui/tree/@fluentui/webpack-utilities_v8.0.0-beta.1)

Thu, 28 Jan 2021 12:25:56 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/webpack-utilities_v8.0.0-beta.0..@fluentui/webpack-utilities_v8.0.0-beta.1)

### Changes

- [BREAKING] Delete ManifestServicePlugin (file an issue if you were using it). Updating to webpack 5, latest typings, latest loaders and plugins. ([PR #16447](https://github.com/microsoft/fluentui/pull/16447) by dzearing@microsoft.com)

## [8.0.0-beta.0](https://github.com/microsoft/fluentui/tree/@fluentui/webpack-utilities_v8.0.0-beta.0)

Fri, 23 Oct 2020 03:26:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/webpack-utils_v7.0.24..@fluentui/webpack-utilities_v8.0.0-beta.0)

### Changes

- Rename @fluentui/webpack-utilities to @fluentui/webpack-utilities ([PR #15615](https://github.com/microsoft/fluentui/pull/15615) by elcraig@microsoft.com)
- Rename office-ui-fabric-react package and update references ([PR #15271](https://github.com/microsoft/fluentui/pull/15271) by elcraig@microsoft.com)

## [7.0.12](https://github.com/microsoft/fluentui/tree/@uifabric/webpack-utils_v7.0.12)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/webpack-utils_v7.0.11..@uifabric/webpack-utils_v7.0.12)

### Patches

- Readme: Fabric=>Fluent wording updates ([PR #12508](https://github.com/microsoft/fluentui/pull/12508) by elcraig@microsoft.com)

## 7.0.11
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
## 7.0.10
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 7.0.5
Fri, 17 Jan 2020 02:32:17 GMT

### Patches

- Update tslib minver to first version containing __spreadArrays helper due to changes in how TS emits spreads. (jagore@microsoft.com)
## 7.0.4
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)

## 7.0.3
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.0.2
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.

## 7.0.1
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 0.8.2
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 0.8.1
Tue, 02 Apr 2019 00:38:15 GMT

### Patches

- Use ^ ranges instead of >=

## 0.8.0
Fri, 15 Mar 2019 12:34:07 GMT

### Minor changes

- Add index file

### Patches

- Remove unneeded version file

## 0.7.4
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies 

## 0.7.3
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file

## 0.7.2
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- exposing codepen examples, disabling codepen tasks in packages != ouifr

## 0.7.1
Mon, 16 Jul 2018 10:27:18 GMT

### Patches

- Use var instead of const in the ui fabric plugin to make it compatible with Safari 9

## 0.7.0
Fri, 06 Jul 2018 19:07:51 GMT

### Minor changes

- Addes a manifest service plugin

## 0.6.0
Mon, 02 Jul 2018 20:41:48 GMT

### Minor changes

- Add Callout to the list of components that can be lazy loaded to reduce bundle sizes

## 0.5.0
Mon, 02 Jul 2018 10:21:36 GMT

### Minor changes

- replaced await with promise so this async loader is more IE compatible

## 0.4.0
Thu, 14 Jun 2018 20:52:57 GMT

### Minor changes

- Adding useful fabricAsyncLoader options to make it more flexible

## 0.0.1
Fri, 08 Jun 2018 18:34:17 GMT

*Initial release*
