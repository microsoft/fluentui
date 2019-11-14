# Change Log - @uifabric/file-type-icons

This log was last generated on Thu, 14 Nov 2019 12:30:52 GMT and should not be manually modified.

## 7.1.4
Thu, 14 Nov 2019 12:30:52 GMT

### Patches

- adding a new icon size for file icons (kchau@microsoft.com)
## 7.1.3
Fri, 08 Nov 2019 12:30:07 GMT

### Patches

- Added size 24 to file type icons (v-mare@microsoft.com)
## 7.1.2
Tue, 15 Oct 2019 12:32:28 GMT

### Patches

- Fabric 7 mappings for filetypeicon cal/contact/fluid/pbids (caperez@microsoft.com)
## 7.1.1
Fri, 27 Sep 2019 12:33:04 GMT

### Patches

- Golden Folder grid view css cleanup for Fabric Master, rev filetype version param string (caperez@microsoft.com)
## 7.1.0
Thu, 12 Sep 2019 12:34:15 GMT

### Minor changes

- updating office file type to include .b (caperez@microsoft.com)
## 7.0.8
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- fix version file (kchau@microsoft.com)
## 7.0.7
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.0.6
Tue, 23 Jul 2019 16:33:51 GMT

### Patches

- Added multiple.png to FileIconType enum (t-shfozd@microsoft.com)

## 7.0.5
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.0.4
Mon, 01 Jul 2019 18:51:42 GMT

### Patches

- adds react-app-polyfill

## 7.0.3
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.

## 7.0.2
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 7.0.0
Wed, 12 Jun 2019 00:42:26 GMT

### Breaking changes

- Update file type icons to use new Fluent assets by default

### Patches

- Update and dedupe React deps.
- fix mapping for OneNote notebook filetype icon
- updating getFileTypeIconProps to make reference to correct sharepoint…

## 6.5.1
Tue, 11 Jun 2019 12:21:35 GMT

### Patches

- adding missing filetype mappings to support LPC and other partners

## 6.5.0
Wed, 05 Jun 2019 12:22:30 GMT

### Minor changes

- added new extensions to icon groups to support LPC and Outlook mobile

## 6.4.10
Thu, 16 May 2019 05:28:50 GMT

### Patches

- Update README with note about how to use the new Fluent file type icons

## 6.4.9
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 6.4.8
Sat, 27 Apr 2019 00:04:47 GMT

### Patches

- removing duplicate entries in FileTypeIconMap.ts

## 6.4.7
Fri, 26 Apr 2019 12:35:24 GMT

### Patches

- reverting the json payload back inside the ts file due to downstream issues

## 6.4.6
Thu, 18 Apr 2019 12:31:50 GMT

### Patches

- fix mapping for OneNote notebook filetype icon
- updating getFileTypeIconProps to make reference to correct sharepoint…

## 6.4.5
Wed, 10 Apr 2019 12:33:17 GMT

### Patches

- decoupled the icon mapping from ts in file-type-icons so that it can be use in an upcoming cocoapod for fabric-cdn icons

## 6.4.4
Tue, 02 Apr 2019 00:38:14 GMT

### Patches

- Use ^ ranges instead of >=

## 6.4.3
Tue, 12 Mar 2019 12:31:43 GMT

### Patches

- fix mapping for OneNote notebook filetype icon
- updating getFileTypeIconProps to make reference to correct sharepoint…

## 6.4.2
Fri, 01 Mar 2019 13:33:08 GMT

### Patches

- fix mapping for OneNote notebook filetype icon

## 6.4.1
Thu, 06 Dec 2018 13:34:21 GMT

### Patches

- Recognize additional file extensions

## 6.4.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- Updated filetype icon mappings to include missing files (figma, powerpoint slide, etc) and entries for new supported non-file items (sp news, sway)

## 6.2.0
Mon, 15 Oct 2018 12:29:12 GMT

### Minor changes

- Fixing enum to avoid const enum.

## 6.1.3
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies

## 6.1.2
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file

## 6.1.1
Tue, 18 Sep 2018 12:26:03 GMT

### Patches

- Make lib import consistent for filetypeicons

## 6.1.0
Wed, 22 Aug 2018 05:10:19 GMT

### Minor changes

- Add FileIconTypeInput alongside FileIconType const enum

## 6.0.2
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- disabling codepen task

## 6.0.1
Tue, 03 Jul 2018 10:23:19 GMT

### Patches

- Bump variants and file-type-icons packages to restore amd build output

## 6.0.0
Mon, 15 Jun 2018 00:44:30 GMT

### Breaking changes

- Major bump to 6.0.0 for consistency.

## 0.7.2
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier

## 0.7.1
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.

## 0.7.0
Wed, 30 May 2018 20:28:33 GMT

### Minor changes

- Minimum React version is now 16.3.2.

## 0.6.2
Fri, 04 May 2018 15:58:39 GMT

### Patches

- Updating React build version

## 0.6.1
Mon, 16 Apr 2018 10:23:26 GMT

### Patches

- Removing module entry temporarily. (Will be added back in 6.0.)
- Updating build to React 16.3.1.

## 0.6.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

## 0.5.0
Tue, 13 Mar 2018 20:00:06 GMT

### Minor changes

- Adjusting npmrc to ensure we have pu

## 0.4.0
Tue, 13 Mar 2018 10:17:37 GMT

### Minor changes

- Update file type icon mappings

## 0.3.0
Fri, 12 Jan 2018 20:03:21 GMT

### Minor changes

- Support size 64 file type icons

## 0.2.0
Tue, 09 Jan 2018 11:12:24 GMT

### Minor changes

- Adds possibility to pass options for icon registration when initializing file type icons

## 0.1.0
Mon, 04 Dec 2017 17:27:54 GMT

### Minor changes

- Add package for file type icons

