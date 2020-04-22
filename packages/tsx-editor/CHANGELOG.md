# Change Log - @uifabric/tsx-editor

This log was last generated on Tue, 21 Apr 2020 12:34:50 GMT and should not be manually modified.

<!-- Start content -->

## [0.11.55](https://github.com/microsoft/fluentui/tree/@uifabric/tsx-editor_v0.11.55)

Tue, 21 Apr 2020 12:34:50 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/tsx-editor_v0.11.50..@uifabric/tsx-editor_v0.11.55)

### Patches

- Add useEditor=1 support to force editor on ([PR #12786](https://github.com/microsoft/fluentui/pull/12786) by elcraig@microsoft.com)

## [0.11.50](https://github.com/microsoft/fluentui/tree/@uifabric/tsx-editor_v0.11.50)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@uifabric/tsx-editor_v0.11.49..@uifabric/tsx-editor_v0.11.50)

### Patches

- Readme: Fabric=>Fluent wording updates ([PR #12508](https://github.com/microsoft/fluentui/pull/12508) by elcraig@microsoft.com)

## 0.11.41
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
## 0.11.40
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 0.11.20
Wed, 19 Feb 2020 12:21:05 GMT

### Patches

- Add syncpack and synchronize dependencies. Refresh fluent import. (jagore@microsoft.com)
## 0.11.18
Wed, 12 Feb 2020 12:24:27 GMT

### Patches

- Add react-focus support (elcraig@microsoft.com)
## 0.11.8
Wed, 29 Jan 2020 12:37:18 GMT

### Patches

- Fix DetailsList export to codepen/live code editing (xgao@microsoft.com)
## 0.11.4
Thu, 23 Jan 2020 12:32:26 GMT

### Patches

- Fix export to codepen for fabric 7 (#9450) (xgao@microsoft.com)
## 0.11.3
Wed, 22 Jan 2020 12:36:43 GMT

### Patches

- Forward supportedPackages from EditorWrapper to TsxEditor (jimkyndemeyer@gmail.com)
## 0.11.2
Fri, 17 Jan 2020 02:32:17 GMT

### Patches

- Update tslib minver to first version containing __spreadArrays helper due to changes in how TS emits spreads. (jagore@microsoft.com)
## 0.11.1
Thu, 16 Jan 2020 12:28:58 GMT

### Patches

- Upgrade repo to TS3.7. (jagore@microsoft.com)
## 0.11.0
Thu, 09 Jan 2020 12:34:52 GMT

### Minor changes

- Switch dynamic imports in tsx-editor to require.ensure (elcraig@microsoft.com)
### Patches

- Update Monaco; fix worker loader in Chrome; fix bundling (elcraig@microsoft.com)
## 0.10.4
Wed, 08 Jan 2020 17:02:57 GMT

### Patches

- bumping load-themed-styles to take advantage of es6 version of it (kchau@microsoft.com)
## 0.10.3
Mon, 28 Oct 2019 22:25:45 GMT

### Patches

- Fix some minor bugs (elcraig@microsoft.com)
## 0.10.2
Thu, 10 Oct 2019 12:32:08 GMT

### Patches

- Editor should include re-exported types (elcraig@microsoft.com)
## 0.10.1
Wed, 09 Oct 2019 12:34:23 GMT

### Patches

- Fix examples with fragments and refine diagnostic options (elcraig@microsoft.com)
## 0.10.0
Mon, 07 Oct 2019 23:42:31 GMT

### Minor changes

- Enable editor by default (elcraig@microsoft.com)
## 0.9.0
Fri, 04 Oct 2019 22:19:48 GMT

### Minor changes

- Improve bundle structure, and add error boundary around example so errors don't crash the page (elcraig@microsoft.com)
## 0.8.1
Thu, 03 Oct 2019 23:14:46 GMT

### Patches

- Fix broken publish with a bump (odbuild@microsoft.com)
## 0.8.0
Thu, 03 Oct 2019 01:14:35 GMT

### Minor changes

-   Return component rather than rendering, and add a11y props to editor (elcraig@microsoft.com)
## 0.7.2
Wed, 25 Sep 2019 12:34:56 GMT

### Patches

- Update regex for IE friendliness (anhw@microsoft.com)
## 0.7.1
Tue, 24 Sep 2019 12:35:43 GMT

### Patches

- Restructure index files and exports (elcraig@microsoft.com)
## 0.7.0
Fri, 20 Sep 2019 12:34:28 GMT

### Minor changes

- Add full typings support; refactor editor component into layers; improve example parsing (elcraig@microsoft.com)
### Patches

- Fix web worker check (elcraig@microsoft.com)
## 0.6.0
Thu, 19 Sep 2019 13:05:24 GMT

### Minor changes

- Use new way of consuming Monaco bundle (elcraig@microsoft.com)
## 0.5.1
Fri, 13 Sep 2019 12:34:39 GMT

### Patches

- creates a wrapper monaco-editor package to be published to make it easy for consumers to consume without css-loader (kchau@microsoft.com)
## 0.5.0
Thu, 12 Sep 2019 12:34:15 GMT

### Minor changes

- Show TS errors in detail, and assorted cleanup (elcraig@microsoft.com)
## 0.4.0
Mon, 26 Aug 2019 12:30:49 GMT

### Minor changes

- Move most editor-related logic to EditorWrapper (elcraig@microsoft.com)
## 0.3.1
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Disable noEmitOnError for now (elcraig@microsoft.com)
- Get rid of monaco-editor-webpack-plugin and fix demo app (elcraig@microsoft.com)

## 0.3.0
Mon, 12 Aug 2019 12:30:25 GMT

### Minor changes

- adding support for example data and workaround for lookbehinds in regex (esteban.230@hotmail.com)
- using fetch API to bring in fabric typings to editor (nishikaza@berkeley.edu)

## 0.2.0
Tue, 06 Aug 2019 12:32:07 GMT

### Minor changes

- Tsx-editor: Adding error bar (esteban.230@hotmail.com)

### Patches

- updating editor model to work with HTML5 (nishikaza@berkeley.edu)

## 0.1.1
Fri, 02 Aug 2019 12:33:29 GMT

### Patches

- Publish tsx-editor (elcraig@microsoft.com)
