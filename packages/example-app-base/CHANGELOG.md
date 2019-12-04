# Change Log - @uifabric/example-app-base

This log was last generated on Thu, 28 Nov 2019 12:32:23 GMT and should not be manually modified.

## 7.10.2
Thu, 28 Nov 2019 12:32:23 GMT

### Patches

- Update fabric core dependency in other package.json files (v-mare@microsoft.com)
## 7.10.1
Wed, 13 Nov 2019 12:33:43 GMT

### Patches

- PlatformPicker: High Contrast support (jdh@microsoft.com)
- Fix API reference links (elcraig@microsoft.com)
## 7.10.0
Tue, 12 Nov 2019 12:32:39 GMT

### Minor changes

- API doc table refactor (elcraig@microsoft.com)
## 7.9.0
Wed, 06 Nov 2019 12:34:07 GMT

### Minor changes

- Update API doc generation to handle deprecated messages (elcraig@microsoft.com)
## 7.8.5
Fri, 01 Nov 2019 01:02:38 GMT

### Patches

- API table: render enum descriptions as multi-line (elcraig@microsoft.com)
## 7.8.4
Fri, 04 Oct 2019 22:19:48 GMT

### Patches

- Use latest tsx-editor APIs (elcraig@microsoft.com)
## 7.8.3
Thu, 03 Oct 2019 23:14:46 GMT

### Patches

- Fix a publish issue with example-app-base (odbuild@microsoft.com)
## 7.8.1
Thu, 03 Oct 2019 01:14:35 GMT

### Patches

- Editor: add accessibility props and improve preview rendering (elcraig@microsoft.com)
## 7.8.0
Tue, 24 Sep 2019 12:35:43 GMT

### Minor changes

- Export to codepen can use in-browser transform and latest edited code (elcraig@microsoft.com)
## 7.7.0
Fri, 13 Sep 2019 12:34:39 GMT

### Minor changes

- add accessibility section and add content for modal (mgodbolt@microsoft.com)
## 7.6.4
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- fix version file (kchau@microsoft.com)
## 7.6.3
Fri, 30 Aug 2019 12:30:57 GMT

### Patches

- Deprecate example data exports (use `@uifabric/example-data` instead) (elcraig@microsoft.com)
## 7.6.2
Mon, 26 Aug 2019 12:30:49 GMT

### Patches

- Move most editor-related logic to EditorWrapper (elcraig@microsoft.com)
## 7.6.1
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Get rid of monaco-editor-webpack-plugin (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.6.0
Thu, 15 Aug 2019 12:30:43 GMT

### Minor changes

- Rename deprecated React lifecycle functions to prevent development mode warnings in React 16.9. (jagore@microsoft.com)

### Patches

- Fix example issues from Accessibility Insights (elcraig@microsoft.com)

## 7.5.1
Tue, 13 Aug 2019 12:31:12 GMT

### Patches

- Updated snpashots and styles which use $ syntax. (dzearing@microsoft.com)

## 7.5.0
Mon, 12 Aug 2019 12:30:25 GMT

### Minor changes

- Adding import scripts check (esteban.230@hotmail.com)

## 7.4.1
Thu, 08 Aug 2019 12:32:41 GMT

### Patches

- getQueryParam gracefully falls back when window is not defined (jdh@microsoft.com)
- Add check for monaco global in example card (elcraig@microsoft.com)

## 7.4.0
Wed, 07 Aug 2019 12:32:28 GMT

### Minor changes

- Updating styles to not use $ syntax. (dzearing@microsoft.com)

## 7.3.0
Tue, 06 Aug 2019 12:32:07 GMT

### Minor changes

- Tsx-editor: Adding error bar (esteban.230@hotmail.com)

### Patches

- Tsx editor - Code not showing fix (esteban.230@hotmail.com)

## 7.2.1
Mon, 05 Aug 2019 12:33:41 GMT

### Patches

- updated style to add spinner for loading editor (t-nikaz@microsoft.com)

## 7.2.0
Fri, 02 Aug 2019 12:33:29 GMT

### Minor changes

- Website changes to work with monaco editor state management (t-nikaz@microsoft.com)

## 7.1.7
Tue, 30 Jul 2019 12:28:32 GMT

### Patches

- Replace the usage of deprecated Stack props to remove the console warnings. (vibraga@microsoft.com)

## 7.1.6
Mon, 22 Jul 2019 12:28:42 GMT

### Patches

- Add a way to get settings from query or session storage (elcraig@microsoft.com)

## 7.1.5
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Allowing example title to show completely even when it goes past one line. (Humberto.Morimoto@microsoft.com)
- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)
- Fix API reference tables' flash of content on scroll (706967+KevinTCoughlin@users.noreply.github.com)

## 7.1.3
Mon, 01 Jul 2019 18:51:42 GMT

### Patches

- adds react-app-polyfill

## 7.1.2
Thu, 27 Jun 2019 18:25:04 GMT

### Patches

- Addressing a variety of problems related to style recalculations.

## 7.1.1
Thu, 20 Jun 2019 12:27:38 GMT

### Patches

- Renamed instances of "Microsoft UI Fabric" to "UI Fabric"

## 7.1.0
Wed, 19 Jun 2019 12:27:03 GMT

### Minor changes

- Adds conditional logic to the render of specific regions on the page to enable use of the examples on docs.microsoft portal for OUFR.

## 7.0.4
Tue, 18 Jun 2019 12:26:19 GMT

### Patches

- ColorPalette: fix missing react code breaking rendering

## 7.0.3
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix export to codepen in fabric 7
- Fix missing assets in production build.

## 7.0.2
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 7.0.0
Wed, 12 Jun 2019 00:42:26 GMT

### Breaking changes

- Remove deprecated components; some styling fixes

### Minor changes

- Move Router to example-app-base

### Patches

- Revert example-app-base font changes
- Update and dedupe React deps.
- Remove use of deprecated @autobind decorator
- Nav, Calendar, and DatePicker move into office-ui-fabric-react

## 6.23.1
Wed, 29 May 2019 12:21:24 GMT

### Patches

- Revert styled perf fixes temporarily.

## 6.23.0
Wed, 22 May 2019 12:21:34 GMT

### Minor changes

- Addressing a variety of problems related to style recalculations.

### Patches

- Use new fluent styles in ExampleCard; code highlighting cleanup; unused style cleanup
- Update withPlatform return type

## 6.22.0
Tue, 21 May 2019 12:20:44 GMT

### Minor changes

- Add createDemoApp

## 6.21.1
Mon, 20 May 2019 12:22:33 GMT

### Patches

- ApiReferencesTable: use maps and combine if statements

## 6.21.0
Wed, 15 May 2019 12:31:44 GMT

### Minor changes

- Add randomEntry utility

### Patches

- PlatformContext: improve types, add displayName

## 6.20.1
Tue, 14 May 2019 07:50:30 GMT

### Patches

- getSiteArea now pulls name from page definition instead of URL
- Update Fabric assets link

## 6.20.0
Tue, 14 May 2019 01:56:43 GMT

### Minor changes

- Add `themeSlots` api to ColorPalette.
- ApiReferencesTable/ApiReferencesTableSet: handle type aliases.

## 6.19.0
Thu, 09 May 2019 12:35:50 GMT

### Minor changes

- Add SiteMessageBar component and renderSiteMessageBar api to ISiteDefinition

## 6.18.0
Tue, 07 May 2019 12:34:52 GMT

### Minor changes

- Use kebab case IDs and add more jump link options

### Patches

- Fix UHF header style bugs.
- Allow regex redirects

## 6.17.4
Mon, 06 May 2019 19:32:45 GMT

### Patches

- Fix UHF styling conflicts

## 6.17.3
Mon, 06 May 2019 12:35:11 GMT

### Patches

- Added css reset directly to ul

## 6.17.2
Mon, 06 May 2019 00:28:08 GMT

### Patches

- Syntax highlighting optimizations

## 6.17.1
Sun, 05 May 2019 19:59:10 GMT

### Patches

- ApiReferencesTable: only render methods and members tables if not empty
- Fix footer flashing, sticky nav, sticky side rail
- Anchor link handling and other bug fixes
- More EditSection tooltip fixes

## 6.17.0
Sat, 04 May 2019 00:01:53 GMT

### Minor changes

- Adds shell and bash language support
- Bug fixes and styling updates for new website
- Updates for new website
- Break out of existing customizations when showing example card.

### Patches

- conditionally render Implementation jump link based on presence of jsonDocs

## 6.16.1
Thu, 02 May 2019 12:36:35 GMT

### Patches

- extractAnchorLink shouldn't return undefined

## 6.16.0
Wed, 01 May 2019 12:34:24 GMT

### Minor changes

- Start copying new components and deprecating old things

## 6.15.0
Tue, 30 Apr 2019 12:31:36 GMT

### Minor changes

- add ApiReferencesTable and ApiReferencesTableSet

### Patches

- fix links for fabric demo/pr deploy site
-  Use new getFocusStyle signature

## 6.14.4
Fri, 26 Apr 2019 12:35:24 GMT

### Patches

- Deprecate implementation examples

## 6.14.3
Wed, 24 Apr 2019 12:35:54 GMT

### Patches

- Deprecate component status

## 6.14.2
Thu, 18 Apr 2019 12:31:50 GMT

### Patches

- reduce the re-export wild card to fix website

## 6.14.1
Wed, 17 Apr 2019 12:33:35 GMT

### Patches

- Run prettier on all files

## 6.14.0
Tue, 16 Apr 2019 12:32:59 GMT

### Minor changes

- Convert components to css-in-js

## 6.13.2
Tue, 02 Apr 2019 12:36:20 GMT

### Patches

- handle TSDoc default value tag

## 6.13.1
Tue, 02 Apr 2019 00:38:14 GMT

### Patches

- Use ^ ranges instead of >=

## 6.13.0
Fri, 29 Mar 2019 12:36:45 GMT

### Minor changes

- Code and documentation cleanup

### Patches

- Make CodepenComponent specify SCSS preprocessor

## 6.12.4
Wed, 27 Mar 2019 12:34:02 GMT

### Patches

- Enable stricter lint and compiler options
- ExampleCard: Remove dependency on styles from random example, and remove utility CSS classes

## 6.12.3
Fri, 22 Mar 2019 12:34:41 GMT

### Patches

- Remove ExampleCardComponent now that Stack has been promoted.

## 6.12.2
Wed, 13 Mar 2019 00:42:29 GMT

### Patches

- FeedbackList: Iterate Github issues collection directly to avoid total_count disparity

## 6.12.1
Wed, 06 Mar 2019 13:27:18 GMT

### Patches

- Improve autodoc to deal with line breaks in extends clause.

## 6.12.0
Tue, 05 Mar 2019 04:25:07 GMT

### Minor changes

- remove not null assertion for optional prop

## 6.11.8
Tue, 26 Feb 2019 22:45:29 GMT

### Patches

- Feedback button: Increase styles specificity to override MWF conflicts.

## 6.11.7
Mon, 25 Feb 2019 13:31:08 GMT

### Patches

- Tweaking the package json to remove uneeded side effects, which helps with bundling.

## 6.11.6
Thu, 14 Feb 2019 13:34:54 GMT

### Patches

- fluent folder cover; updated metadata font color; added yellowDark color variable
- Switch PivotItems to use headerText not linkText

## 6.11.5
Thu, 31 Jan 2019 20:10:48 GMT

### Patches

- Changes to support Slots Foundation.

## 6.11.4
Mon, 28 Jan 2019 13:35:27 GMT

### Patches

- Use fabric dev build in export to codepen

## 6.11.3
Fri, 18 Jan 2019 13:38:05 GMT

### Patches

- Fix bug where customizations apply to theme and scheme dropdowns.

## 6.11.2
Thu, 17 Jan 2019 13:34:42 GMT

### Patches

- ComponentPage: add id to dos and donts section to fix linking on site

## 6.11.1
Wed, 16 Jan 2019 13:38:44 GMT

### Patches

- Icon: removing aria-hidden attribute.

## 6.11.0
Mon, 14 Jan 2019 13:39:22 GMT

### Minor changes

- **New:** MarkdownTable components for use in PageMarkdown.\n**EditSection:** Allow content to be more flexible in order to render.\n**PageMarkdown:** Override table elements with new MarkdownTable components, add global classNames, add static displayName.

## 6.10.0
Fri, 14 Dec 2018 13:35:30 GMT

### Minor changes

- replace references to isCollapsable with isCollapsible

### Patches

- Remove types and modules no longer needed due to Foundation changes.

## 6.9.4
Tue, 11 Dec 2018 13:36:20 GMT

### Patches

- Fix Example dropdown regression caused by #7326.

## 6.9.3
Thu, 06 Dec 2018 13:34:21 GMT

### Patches

- Fix for issue#7258:Documentation is missing for button

## 6.9.2
Tue, 06 Nov 2018 13:31:09 GMT

### Patches

- Fix visual bugs caused by MWF overrides on Fabric site

## 6.9.1
Wed, 31 Oct 2018 12:32:41 GMT

### Patches

- Replace usage of scheme prop with theme provider.

## 6.9.0
Wed, 17 Oct 2018 01:29:55 GMT

### Minor changes

- Modify CodepenComponent for use by other packages.

## 6.8.0
Tue, 16 Oct 2018 12:28:48 GMT

### Minor changes

- Add optional app customizations and apply to examples when provided.

## 6.7.6
Thu, 11 Oct 2018 23:13:31 GMT

### Patches

- Documentation: remove unwanted backslashes and render backticks as code blocks

## 6.7.5
Wed, 10 Oct 2018 12:29:05 GMT

### Patches

- ExampleCard: Replace Fabric Core classes with mixins
- ExampleCard: Adds utility classes for spacing within examples

## 6.7.4
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies

## 6.7.3
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file

## 6.7.2
Fri, 10 Aug 2018 10:26:08 GMT

### Patches

- Added optional feedback section for component pages

## 6.7.1
Wed, 08 Aug 2018 10:25:07 GMT

### Patches

- Autodoc: improve regex to handle certain edge cases of declaring interfaces.

## 6.7.0
Tue, 24 Jul 2018 10:24:36 GMT

### Minor changes

- Updating example pages to provide codepen script content.

## 6.6.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- Addressing bad imports.

## 6.5.2
Thu, 19 Jul 2018 19:04:38 GMT

### Patches

- Added optional feedback section for component pages

## 6.5.1
Wed, 18 Jul 2018 10:25:50 GMT

### Patches

- Fix typing bugs in example-app-base

## 6.5.0
Tue, 17 Jul 2018 10:28:40 GMT

### Minor changes

- Removing most `@customizable` decorator usage. This change should reduce extra React dom elements from being created. Also updating `componentRef` resolution to support `React.createRef()` usage.

## 6.4.0
Mon, 16 Jul 2018 10:27:18 GMT

### Minor changes

- Variant section lists have same style as best practices section lists. ComponentPage Overview now marked optional prop.
- EditSection: Remove ComponentPageSection enum to make EditSection easier to use.

## 6.3.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Reverting the TypeScript bump, to un

## 6.2.1
Thu, 14 Jun 2018 20:52:57 GMT

### Patches

- Consumes data from OUFR

## 6.2.0
Fri, 08 Jun 2018 18:34:17 GMT

### Minor changes

- add style arg to customizable
- Fixing package dependencies

## 6.1.0
Thu, 07 Jun 2018 16:35:34 GMT

### Minor changes

- Tweaked the lint rules.

## 6.0.2
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier

## 6.0.1
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.

## 6.0.0
Wed, 30 May 2018 20:28:33 GMT

### Breaking changes

- Minimum React version is now 16.3.2.

## 5.11.5
Thu, 17 May 2018 10:28:07 GMT

### Patches

- Fixed a bug in the documentation generator code that skipped const enums (parser)

## 5.11.4
Fri, 11 May 2018 04:21:29 GMT

### Patches

- Pin markdown-to-jsx dependency

## 5.11.3
Tue, 08 May 2018 10:17:01 GMT

### Patches

- Pin markdown-to-jsx dependency

## 5.11.2
Fri, 04 May 2018 15:58:38 GMT

### Patches

- Updating React build version.

## 5.11.1
Wed, 02 May 2018 23:55:40 GMT

### Patches

- Refactors String.prototype.includes usage in favor of  String.prototype.indexOf for IE compat.

## 5.11.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- Updating the focus styling to use the generalized `ms-Fabric--isFocusVisibl

## 5.10.2
Thu, 19 Apr 2018 18:25:59 GMT

### Patches

- Update createRef to match React.createRef api

## 5.10.1
Wed, 18 Apr 2018 10:15:04 GMT

### Patches

- Fix code block line-height

## 5.10.0
Mon, 16 Apr 2018 10:23:25 GMT

### Minor changes

- Add new APIs for editing sections on GitHub.

### Patches

- Removing module entry temporarily. (Will be added back in 6.0.)
- Updating build to React 16.3.1.

## 5.9.0
Thu, 12 Apr 2018 10:15:54 GMT

### Minor changes

- HTML button tags will be overridden with DefaultButton component.

## 5.8.0
Thu, 05 Apr 2018 10:15:39 GMT

### Minor changes

- Add ability to disable scrolling for an ExampleCard

## 5.7.1
Sat, 31 Mar 2018 17:40:00 GMT

### Patches

- We need to temporarily remove `sideEffects: false` flag from package.json which will disable w

## 5.7.0
Wed, 28 Mar 2018 19:26:19 GMT

### Minor changes

- Add markdown-to-jsx for use in documentation.

## 5.6.0
Tue, 27 Mar 2018 20:22:53 GMT

### Minor changes

- Add markdown-to-jsx for use in documentation.

## 5.5.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

## 5.4.0
Mon, 19 Mar 2018 10:27:55 GMT

### Minor changes

- ThemePrimary: Updating this color along with an Office branding update.

### Patches

- Use arrow function properties instead of @autobind

## 5.3.0
Fri, 02 Mar 2018 11:25:35 GMT

### Minor changes

- Upgrade to TypeScript 2.7.2

## 5.2.2
Wed, 21 Feb 2018 11:12:11 GMT

### Patches

- Tweaking css for example pages.

## 5.2.1
Mon, 22 Jan 2018 11:14:27 GMT

### Patches

- Updated theme override colors for MessageBar.

## 5.2.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

## 5.1.2
Wed, 25 Oct 2017 02:03:33 GMT

### Patches

- Minor css improvements to example header.

## 5.1.1
Fri, 06 Oct 2017 10:18:41 GMT

### Patches

- TSConfig: update to use preserveConstEnums so that certain builds s ystems don't break when importing const enums

## 5.1.0
Thu, 05 Oct 2017 17:03:43 GMT

### Minor changes

- Fixing version dependencies.

## 5.0.5
Thu, 05 Oct 2017 10:17:42 GMT

*Version update only*

## 5.0.4
Wed, 04 Oct 2017 22:40:22 GMT

*Version update only*

## 5.0.3
Fri, 29 Sep 2017 10:20:24 GMT

### Patches

- Update fabric version for example-app-base

## 5.0.2
Thu, 28 Sep 2017 10:19:12 GMT

*Version update only*

## 5.0.1
Wed, 27 Sep 2017 00:20:58 GMT

### Patches

- Updated for Fabric 5.0.

## 4.2.7
Mon, 04 Sep 2017 10:16:56 GMT

### Patches

- Update fabric-dependency version

## 4.2.6
Fri, 01 Sep 2017 16:51:57 GMT

### Patches

- Persist RTL setting between page refreshes

## 4.2.5
Thu, 31 Aug 2017 15:41:56 GMT

### Patches

- Refresh the page when swtiching languages to make sure that memoized styles are recomputed

## 4.2.4
Tue, 29 Aug 2017 20:55:35 GMT

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 4.2.3
Fri, 25 Aug 2017 20:31:51 GMT

### Patches

- Adding back sourcemap content to .map files, which should alleviate "../src/* missing" issues when using webpack.

## 4.2.2
Thu, 24 Aug 2017 05:38:14 GMT

### Patches

- Break up long lines or disable max line length in ex-app-base pkg to pass tslint
- Added missing typedefs in ex-app-base pkg to pass tslint

## 4.2.1
Mon, 21 Aug 2017 10:19:28 GMT

### Patches

- Updating project dependencies.

## 4.2.0
Thu, 03 Aug 2017 10:13:03 GMT

### Minor changes

- TypeScript 2.4.1 bump

## 4.1.1
Thu, 13 Jul 2017 02:58:02 GMT

### Patches

- Highlight: Use correct import for highlightBlock

## 4.1.0
Wed, 12 Jul 2017 01:49:50 GMT

### Minor changes

- Fix implicit anys, enable strict null checks

### Patches

- Fixing typings for TypeScript 2.4.1 compatibility.

## 4.0.3
Tue, 11 Jul 2017 10:14:04 GMT

### Patches

- Website: Stop displaying "missing properties" notification if props includes empty interface

## 4.0.2
Sat, 08 Jul 2017 03:34:35 GMT

### Patches

- Updating dev dependencies.

## 4.0.1
Tue, 27 Jun 2017 01:26:31 GMT

### Patches

- Enable forceConsistentCasingInFileNames tsconfig option

## 4.0.0
Wed, 21 Jun 2017 00:45:41 GMT

### Breaking changes

- Add support for adding a default route in createApp. Remove unused hideChrome parameter.

## 3.0.2
Wed, 14 Jun 2017 06:02:15 GMT

### Patches

- Bumping fabric-core dependency.

## 3.0.1
Mon, 12 Jun 2017 01:47:18 GMT

### Patches

- Enable no implicit any in utilities package

## 3.0.0
Thu, 08 Jun 2017 00:18:05 GMT

### Breaking changes

- Bumping fabric dependency in example-app-base

## 2.1.2
Tue, 06 Jun 2017 07:41:47 GMT

*Version update only*

## 2.1.1
Tue, 06 Jun 2017 06:06:46 GMT

### Patches

- Adding tslib dependency to reduce re

## 2.1.0
Tue, 06 Jun 2017 00:50:06 GMT

### Minor changes

- Add the ability to optionally pass in the app title and header links for createApp

## 2.0.4
Fri, 02 Jun 2017 01:19:36 GMT

*Version update only*

## 2.0.3
Thu, 01 Jun 2017 16:34:03 GMT

*Version update only*

## 2.0.2
Wed, 31 May 2017 01:58:23 GMT

*Version update only*

## 2.0.1
Tue, 30 May 2017 20:23:45 GMT

*Version update only*

## 2.0.0
Tue, 30 May 2017 03:27:20 GMT

### Breaking changes

- All references to fabric-core removed.

### Patches

- Updated dependency to Fabric Core 7

## 1.3.14
Fri, 26 May 2017 10:21:03 GMT

*Version update only*

## 1.3.13
Tue, 23 May 2017 10:16:04 GMT

*Version update only*

## 1.3.12
Thu, 18 May 2017 10:09:58 GMT

*Version update only*

## 1.3.11
Fri, 05 May 2017 10:18:19 GMT

### Patches

- Removing references to deprecated things.

## 1.3.10
Fri, 21 Apr 2017 06:23:54 GMT

*Version update only*

## 1.3.8
Wed, 19 Apr 2017 16:54:26 GMT

*Version update only*

## 1.3.7
Tue, 18 Apr 2017 03:09:12 GMT

### Patches

- PropertiesTable: properties are now sorted correctly.

## 1.3.6
Tue, 04 Apr 2017 20:08:53 GMT

### Patches

- Updating fabric dependencies to use ranges.

## 1.3.5
Tue, 04 Apr 2017 15:18:51 GMT

*Version update only*

## 1.3.4
Wed, 29 Mar 2017 18:15:29 GMT

### Patches

- Chaning scss imports to use typescript `import` instead of `require` so that lib-amd build actually imports via AMD require and not commonjs require.

## 1.3.3
Tue, 28 Mar 2017 03:05:36 GMT

### Patches

- Tweaked some of the style imports.

## 1.3.2
Fri, 24 Mar 2017 20:25:07 GMT

*Version update only*

## 1.3.1
Fri, 24 Mar 2017 04:26:48 GMT

*Version update only*

## 1.3.0
Thu, 23 Mar 2017 03:13:02 GMT

### Minor changes

- Modified existing calendar examples to include examples of the new props for date range selection, auto month navigation and hiding the today link.

## 1.2.1
Wed, 22 Mar 2017 03:18:05 GMT

*Version update only*

## 1.2.0
Tue, 21 Mar 2017 03:20:12 GMT

### Minor changes

- Adding `createApp`, `examplesOf` apis to quickly scaffold demo apps.

## 1.1.0
Fri, 10 Mar 2017 20:41:05 GMT

### Minor changes

- Adjusting React peer dependency to i

## 1.0.6
Thu, 09 Mar 2017 22:06:44 GMT

### Patches

- Fixing version of peer dependency of fabric-react.

## 1.0.5
Thu, 09 Mar 2017 06:33:00 GMT

### Patches

- No changes, required republish.

## 1.0.4
Thu, 09 Mar 2017 06:11:07 GMT

*Version update only*

## 1.0.3
Mon, 27 Feb 2017 21:45:53 GMT

### Patches

- Removing fabric-core from peer deps

## 1.0.2
Mon, 13 Feb 2017 08:15:53 GMT

### Patches

- Updating package.json dependencies to exclude typings packages.

## 1.0.1
Wed, 08 Feb 2017 05:10:53 GMT

### Patches

- Adding new package to host all example app base code, which allows us to share common doc website code across many projects.

