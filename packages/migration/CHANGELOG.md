# Change Log - @uifabric/migration

This log was last generated on Thu, 07 May 2020 01:06:55 GMT and should not be manually modified.

<!-- Start content -->

## [7.0.18](https://github.com/microsoft/fluentui/tree/@uifabric/migration_v7.0.18)

Thu, 07 May 2020 01:06:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/migration_v7.0.16..@uifabric/migration_v7.0.18)

### Patches

- Addressing commonjs imports. ([PR #13031](https://github.com/microsoft/fluentui/pull/13031) by dzearing@microsoft.com)

## [7.0.16](https://github.com/microsoft/fluentui/tree/@uifabric/migration_v7.0.16)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/migration_v7.0.14..@uifabric/migration_v7.0.16)

### Patches

- Readme: Fabric=>Fluent wording updates ([PR #12508](https://github.com/microsoft/fluentui/pull/12508) by elcraig@microsoft.com)

## 7.0.14
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
## 7.0.13
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 7.0.10
Wed, 19 Feb 2020 12:21:05 GMT

### Patches

- Add syncpack and synchronize dependencies. Refresh fluent import. (jagore@microsoft.com)
## 7.0.7
Fri, 17 Jan 2020 02:32:17 GMT

### Patches

- Update tslib minver to first version containing __spreadArrays helper due to changes in how TS emits spreads. (jagore@microsoft.com)
## 7.0.6
Thu, 16 Jan 2020 12:28:58 GMT

### Patches

- Upgrade repo to TS3.7. (jagore@microsoft.com)
## 7.0.5
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.0.4
Wed, 21 Aug 2019 12:34:09 GMT

### Patches

- Messaging now with more hints and fix TextField codemod. (vibraga@microsoft.com)

## 7.0.3
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.0.2
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.
- Fixing file that caused tslint issue in pre-commit hook validation.

## 7.0.1
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 0.3.0
Wed, 12 Jun 2019 00:42:26 GMT

### Minor changes

- Non-destructive run by default, show affected files.
- Add migration for removed ColorPicker props
- Ignore files in node_modules directories

### Patches

- ComboBox: Migration to rename deprecated props to new props.
- SearchBox: Alert for onChange props arguments change.
- Remove createRef imports from OUFR
- Nav: import from @uifabric/legacy
- @autobind: Migration to warn about removal.
- Remove migration for nav to legacy
- Add migrations for removed TextField props

## 0.2.2
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 0.2.1
Tue, 02 Apr 2019 00:38:15 GMT

### Patches

- Use ^ ranges instead of >=

## 0.2.0
Fri, 22 Mar 2019 17:56:40 GMT

### Minor changes

- migration: makes migration script match the name of the package

## 0.1.4
Fri, 22 Mar 2019 12:34:41 GMT

### Patches

- migration: .gitignore apparently ignored all bin/ scripts and this actually makes the bin script part of the package

## 0.1.3
Thu, 21 Mar 2019 17:21:42 GMT

### Patches

- migration: the bin directory was being ignored, this change makes sure the npm publish step will include the bin scripts

## 0.1.2
Wed, 20 Mar 2019 03:15:21 GMT

### Patches

- Migration: fixed the bin script's shebang to point to the right "env" executable

## 0.1.1
Tue, 19 Mar 2019 18:05:11 GMT

### Patches

- Initial release, under construction
