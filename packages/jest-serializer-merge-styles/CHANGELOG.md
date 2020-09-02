# Change Log - @uifabric/jest-serializer-merge-styles

This log was last generated on Tue, 25 Aug 2020 12:36:19 GMT and should not be manually modified.

<!-- Start content -->

## [7.1.0](https://github.com/microsoft/fluentui/tree/@uifabric/jest-serializer-merge-styles_v7.1.0)

Tue, 25 Aug 2020 12:36:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/jest-serializer-merge-styles_v7.0.30..@uifabric/jest-serializer-merge-styles_v7.1.0)

### Minor changes

- Adding test to ensure styles with selectors not wrapped in a selectors node still serialize. ([PR #14707](https://github.com/microsoft/fluentui/pull/14707) by dzearing@hotmail.com)

## [7.0.21](https://github.com/microsoft/fluentui/tree/@uifabric/jest-serializer-merge-styles_v7.0.21)

Thu, 07 May 2020 01:06:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/jest-serializer-merge-styles_v7.0.16..@uifabric/jest-serializer-merge-styles_v7.0.21)

### Patches

- Addressing commonjs imports. ([PR #13031](https://github.com/microsoft/fluentui/pull/13031) by dzearing@microsoft.com)

## 7.0.15
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
## 7.0.14
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 7.0.6
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- fix version file (kchau@microsoft.com)
## 7.0.5
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.0.4
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.0.3
Mon, 01 Jul 2019 18:51:42 GMT

### Patches

- adds react-app-polyfill

## 7.0.2
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.

## 7.0.1
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 6.0.10
Wed, 12 Jun 2019 00:42:26 GMT

### Patches

- Update and dedupe React deps.

## 6.0.9
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 6.0.8
Tue, 02 Apr 2019 00:38:15 GMT

### Patches

- Use ^ ranges instead of >=

## 6.0.7
Tue, 15 Jan 2019 13:36:45 GMT

### Patches

- Keyframes no longer cause merge-styles jest serialization to throw an exception.

## 6.0.6
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies

## 6.0.5
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file

## 6.0.4
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- disabling codepen task

## 6.0.3
Thu, 14 Jun 2018 20:52:57 GMT

### Patches

- Fix broken documentation links

## 6.0.0
Tue, 05 Jun 2018 00:44:30 GMT

### Breaking changes

- Major bump to 6.0 to be in line with rest of OUFR v6 packages.

### Patches

- Added Prettier

## 5.2.3
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.

## 5.2.2
Wed, 30 May 2018 22:05:03 GMT

*Version update only*

## 5.2.1
Mon, 21 May 2018 10:29:16 GMT

### Patches

- The `animation-name` values reference class names which should be expanded if there is a comma delimited list of them.

## 5.2.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- Updating how keyframe classes are serialized in results.

## 5.1.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

## 5.0.1
Tue, 24 Oct 2017 10:21:08 GMT

### Patches

- Updated jest docs

## 5.0.0
Tue, 17 Oct 2017 17:17:41 GMT

*Initial release*
