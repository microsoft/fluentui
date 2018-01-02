# Change Log - @uifabric/fabric-website

This log was last generated on Fri, 22 Dec 2017 11:10:56 GMT and should not be manually modified.

## 5.2.1
Fri, 22 Dec 2017 11:10:56 GMT

### Patches

- Added more descriptive comments to account for the specificity needed to style with the UHF.

## 5.2.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

### Patches

- GetStarted Page: More specific selectors for button with link to deal with UHF styles.

## 5.1.0
Thu, 14 Dec 2017 11:23:17 GMT

### Minor changes

- GetStarted page: updated to better reflect the current Fabric workflows.

## 5.0.19
Wed, 06 Dec 2017 11:24:52 GMT

### Patches

- Updated referenced FabricCore versions.

## 5.0.18
Tue, 05 Dec 2017 02:04:27 GMT

### Patches

- Fix ScrollablePane page title

## 5.0.17
Mon, 20 Nov 2017 11:12:47 GMT

### Patches

- Add ActivityItem, Calendar, HoverCard, OverflowSet, ScrollablePane, TeachingBubble to fabric-website

## 5.0.16
Fri, 17 Nov 2017 17:36:36 GMT

### Patches

- Updated asset license to newest version.

## 5.0.15
Tue, 31 Oct 2017 10:22:25 GMT

### Patches

- Added support to IconGrid for icons wider than the grid.

## 5.0.14
Fri, 27 Oct 2017 10:25:09 GMT

### Patches

- Fixed initializeIcons call to pull from cdn instead of dist.

## 5.0.13
Tue, 24 Oct 2017 10:21:08 GMT

### Patches

- Removed Header component - it was replaced with UHF

## 5.0.12
Wed, 18 Oct 2017 10:21:25 GMT

### Patches

- TextField documentation style updates
- Removed branding guidance pdf, updated fabric asset license pdf, and fixed link colors
- Fixed in page navigation for Chrome and Firefox.

## 5.0.11
Mon, 16 Oct 2017 20:00:51 GMT

### Patches

- Updating to Fabric Core 9.0

## 5.0.10
Thu, 12 Oct 2017 10:20:49 GMT

### Patches

- Added Implementation Examples section to ComponentPage
- Add promise polyfill

## 5.0.9
Mon, 09 Oct 2017 10:08:09 GMT

### Patches

- Added/removed Best Practices links for component pages that had/didn't have a Best Practices section.
- Updated themeLight color - typo

## 5.0.8
Fri, 06 Oct 2017 10:18:41 GMT

### Patches

- TSConfig: update to use preserveConstEnums so that certain builds s ystems don't break when importing const enums

## 5.0.7
Wed, 04 Oct 2017 22:40:22 GMT

### Patches

- Updated ResourcePage text and made padding more rtl friendly.
- Added section in Get Started page to document how to use icons in components.
- Added Icon component to website

## 5.0.6
Fri, 29 Sep 2017 10:20:24 GMT

### Patches

- Added initializeIcons() call to make all icons in examples on the website available.
- Added SharePoint Toolkit link and text to ResourcesPage.

## 5.0.5
Thu, 28 Sep 2017 10:19:12 GMT

### Patches

- Updated links in the SharePoint section of the ResourcesPage.

## 5.0.4
Wed, 27 Sep 2017 00:20:58 GMT

### Patches

- Updated for Fabric 5.0.

## 5.0.3
Fri, 22 Sep 2017 19:08:51 GMT

### Patches

- Reinforced header tag styles across website pages to manage UHF counter-styles.
- Visual bug fixes.

## 5.0.2
Thu, 21 Sep 2017 06:23:58 GMT

### Patches

- Brand icons page clean up.
- Updated reference to Fabric Core to the newly released 7.3.0 version.
- Added a test case for dogfood check
- Initial loading spinner gif changed to mimic our spinner component.
- Switched some font colors on theme and neutral color swatches from white to black to achieve minimum contrast requirement of 4.5:1 for accessibility.
- Removed trello reference from the Get Stated page.
- Styling to fix UHF header overriding our styles.
- Changed where Fabric Core and Fabric React versions were drawing from so that they would appear as a number instead of a range.
- Visual bug fixes to accommodate UHF
- Added section in ResourcePage for XD Toolkits and other assets, includes references on other pages, too.

## 5.0.1
Wed, 20 Sep 2017 10:19:01 GMT

### Patches

- Changing high-contrast colors to system colors

## 5.0.0
Tue, 19 Sep 2017 10:08:55 GMT

### Breaking changes

- Major site revisions, component updates, removal of dev office header and footer, infrastructure updates and improvements, webpack config updates.

### Patches

- Revised alt text best practes for ImageComponent.
- Removed references to FabricJS from the website.
- Visual bug fixes for UHF adoption for website

## 4.7.6
Fri, 01 Sep 2017 16:51:57 GMT

### Patches

- Publish resize group on fabric-website

## 4.7.5
Thu, 31 Aug 2017 15:41:56 GMT

### Patches

- Add @types/node dependency

## 4.7.4
Tue, 29 Aug 2017 20:55:35 GMT

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 4.7.3
Wed, 23 Aug 2017 19:04:55 GMT

### Patches

- Removed Trello reference
- Updated branding guidance pdf from the cdn.
- Updated the CDN link on the "Get Started" page and section to an updated version of Fabric Core, 7.2.0

## 4.7.2
Mon, 21 Aug 2017 10:19:29 GMT

### Patches

- Updating project dependencies.

## 4.7.1
Fri, 18 Aug 2017 16:32:33 GMT

### Patches

- Minor css usage cleanup.

## 4.7.0
Fri, 11 Aug 2017 19:38:35 GMT

### Minor changes

- Updated fabric build system to use webpack dev server, removed the explicit !json loader in require statements.

## 4.6.0
Thu, 03 Aug 2017 10:13:03 GMT

### Minor changes

- TypeScript 2.4.1 bump

### Patches

- Fix utility class names, apply "ms-" prefix

## 4.5.42
Fri, 21 Jul 2017 10:21:45 GMT

### Patches

- Remove erroneous usage of baseUrl to fix link to color accessibility guide

## 4.5.41
Sat, 08 Jul 2017 03:34:35 GMT

### Patches

- Updating dev dependencies.

## 4.5.40
Tue, 27 Jun 2017 01:26:31 GMT

### Patches

- Enable forceConsistentCasingInFileNames tsconfig option

## 4.5.39
Wed, 21 Jun 2017 00:45:41 GMT

*Version update only*

## 4.5.38
Wed, 14 Jun 2017 06:02:15 GMT

### Patches

- Bumping fabric-core dependency.

## 4.5.37
Tue, 13 Jun 2017 10:13:21 GMT

### Patches

- Fix issues with dev.office.com header

## 4.5.36
Mon, 12 Jun 2017 01:47:18 GMT

### Patches

- Enable no implicit any in utilities package

## 4.5.35
Thu, 08 Jun 2017 00:18:05 GMT

*Version update only*

## 4.5.34
Tue, 06 Jun 2017 07:41:47 GMT

*Version update only*

## 4.5.33
Tue, 06 Jun 2017 06:06:46 GMT

*Version update only*

## 4.5.32
Tue, 06 Jun 2017 00:50:06 GMT

*Version update only*

## 4.5.31
Fri, 02 Jun 2017 01:19:36 GMT

*Version update only*

## 4.5.30
Thu, 01 Jun 2017 16:34:03 GMT

*Version update only*

## 4.5.29
Wed, 31 May 2017 01:58:23 GMT

*Version update only*

## 4.5.28
Tue, 30 May 2017 20:23:45 GMT

*Version update only*

## 4.5.27
Tue, 30 May 2017 03:27:20 GMT

*Version update only*

## 4.5.26
Fri, 26 May 2017 10:21:03 GMT

*Version update only*

## 4.5.25
Tue, 23 May 2017 10:16:04 GMT

*Version update only*

## 4.5.24
Thu, 18 May 2017 10:09:58 GMT

*Version update only*

## 4.5.23
Tue, 16 May 2017 21:47:38 GMT

### Patches

- Adding comment

