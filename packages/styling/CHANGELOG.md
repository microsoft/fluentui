# Change Log - @uifabric/styling

This log was last generated on Thu, 08 Jun 2017 00:18:05 GMT and should not be manually modified.

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

