# Change Log - @uifabric/utilities

This log was last generated on Tue, 05 Mar 2019 17:33:41 GMT and should not be manually modified.

## 6.33.0
Tue, 05 Mar 2019 17:33:41 GMT

### Minor changes

- Modify return type of styled (function to React.StatelessComponent)

## 6.32.1
Tue, 05 Mar 2019 04:25:07 GMT

### Patches

- Utilities: removing redundant export for `setVirtualParent`.

## 6.32.0
Mon, 04 Mar 2019 13:29:58 GMT

### Minor changes

- Utilities: Adding setVirtualParent export.

## 6.31.0
Fri, 01 Mar 2019 19:40:21 GMT

### Minor changes

- Reinstroducing dom/warn top level imports.

## 6.30.0
Fri, 01 Mar 2019 13:33:08 GMT

### Minor changes

- A number of files containing many exports have been split into smaller units for finer debuggability in bundle size implications. Some unneeded dependencies on EventGroup have been removed.

## 6.29.4
Tue, 26 Feb 2019 22:45:29 GMT

### Patches

- ARIA: mergeAriaAttributeValues should produce space-delimited output by default

## 6.29.3
Fri, 22 Feb 2019 13:31:09 GMT

### Patches

- mergeAriaAttributeValues: Trim output string
- Add check for tabIndex in isElementTabbable if role=button

## 6.29.2
Wed, 20 Feb 2019 13:30:29 GMT

### Patches

- getRTL: Check for existence of body element before reading attributes.

## 6.29.1
Thu, 14 Feb 2019 13:34:55 GMT

### Patches

- Add fallback for reading direction attribute from body element.

## 6.29.0
Thu, 31 Jan 2019 20:10:48 GMT

### Minor changes

- Adding helper functions to get and restore focus elements based on index paths.

## 6.28.1
Fri, 25 Jan 2019 13:38:07 GMT

### Patches

- Updating 'customizable.tsx' to evaluate style functions.

## 6.28.0
Fri, 11 Jan 2019 05:00:46 GMT

### Minor changes

- Scroll: use scrollableParent in _preventOverscrolling, allow EventGroup.on to take event options

## 6.27.2
Tue, 08 Jan 2019 13:34:49 GMT

### Patches

- Deprecate utility using legacy context
- BaseComponent: when updating componentRef, handle case where current or previous props are not given

## 6.27.1
Mon, 17 Dec 2018 13:36:58 GMT

### Patches

- BaseComponent: Remove componentWillReceiveProps usage

## 6.27.0
Thu, 15 Nov 2018 13:36:22 GMT

### Minor changes

- DevExp: get rid of const enum so the library is compatible with Typescript's isolatedModule compilation mode
- Styled: now reacts to loadTheme changes even when not wrapped in a Customizer.

## 6.26.0
Wed, 14 Nov 2018 13:34:01 GMT

### Minor changes

- Add osDetector utility

## 6.25.0
Wed, 31 Oct 2018 12:32:41 GMT

### Minor changes

- Customizer: Add optional context transform prop.

## 6.24.0
Fri, 26 Oct 2018 12:32:35 GMT

### Minor changes

- Add api-extractor.json

## 6.23.1
Thu, 18 Oct 2018 20:22:36 GMT

### Patches

- Update api-extractor.json

## 6.23.0
Mon, 15 Oct 2018 12:29:12 GMT

### Minor changes

- Adding `asAsync` HOC wrapper to abstract async loading for components.

## 6.22.0
Wed, 10 Oct 2018 12:29:05 GMT

### Minor changes

- Add utilities.api.ts, update files to fix api-extractor errors

## 6.21.2
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies 

## 6.21.1
Wed, 26 Sep 2018 12:27:23 GMT

### Patches

- Memoize: Do not use cached result when function instances are distinct.

## 6.21.0
Fri, 21 Sep 2018 14:25:46 GMT

### Minor changes

- Expose Customizer's mergeCustomizations as new helper function.

### Patches

- Adding a version stamp file
- Add IComponentAsProps

## 6.20.0
Thu, 20 Sep 2018 12:25:33 GMT

### Minor changes

- add optional defaultRender to IComponentAs

## 6.19.1
Thu, 13 Sep 2018 17:38:04 GMT

### Patches

- allow stateless components to use customizable

## 6.19.0
Fri, 07 Sep 2018 22:04:50 GMT

### Minor changes

- Customizer: moving to use React 16 context.

## 6.18.0
Fri, 07 Sep 2018 16:29:48 GMT

### Minor changes

- Add helpers for setting and detecting portals

## 6.17.2
Wed, 05 Sep 2018 10:29:25 GMT

### Patches

- Scroll: add flex-grow: 1 to scrollable content elements
- Scroll: remove inline styles from scrollable content elements

## 6.17.1
Thu, 30 Aug 2018 10:32:49 GMT

### Patches

- Replace comment reference to old ms-Fabric is-focusVisible with ms-Fabric--isFocusVisible

## 6.17.0
Tue, 28 Aug 2018 10:23:58 GMT

### Minor changes

- Add mobileDetector to detect iOS devices

## 6.16.0
Fri, 24 Aug 2018 17:02:14 GMT

### Minor changes

- Reverting Customizer React 16 context change.

## 6.15.1
Fri, 24 Aug 2018 10:26:08 GMT

### Patches

- Fix @types/prop-types being inconsistently restrictive.

## 6.15.0
Thu, 23 Aug 2018 10:28:17 GMT

### Minor changes

- Customizer: moving to use React 16 context.
- Scroll: allow scrolling within a target element

### Patches

- Scroll: disable ios body scrolling in disableBodyScroll

## 6.14.1
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- disabling codepen task

## 6.14.0
Mon, 13 Aug 2018 03:43:25 GMT

### Minor changes

- Customizer should allow for nesting. Right now, `settings` provided have the reverse precendence expected; the outer-most Customizer wins over an inner one. This is completely backwards. Fixing to be correct.

## 6.13.0
Fri, 10 Aug 2018 10:26:09 GMT

### Minor changes

- Customizable: add optional flag to allow customizer styles to be merged with component styles prop rather than overriding component styles
- Adding merge helper for deep merging.

## 6.12.1
Fri, 27 Jul 2018 10:25:39 GMT

### Patches

- prop-types version 

## 6.12.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- Addressing bad imports.

## 6.11.0
Wed, 18 Jul 2018 10:25:50 GMT

### Minor changes

- Tighten typings of APIs around merge-styles to be more correct

## 6.10.0
Tue, 17 Jul 2018 10:28:40 GMT

### Minor changes

- Removing most `@customizable` decorator usage. This change should reduce extra React dom elements from being created. Also updating `componentRef` resolution to support `React.createRef()` usage.

## 6.9.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Reverting the TypeScript bump, to un

## 6.7.1
Wed, 20 Jun 2018 10:25:55 GMT

### Patches

- Prettier fixes

## 6.7.0
Tue, 19 Jun 2018 10:26:26 GMT

### Minor changes

- All `styled` props should be a style function which returns partial styles, or just a partial styles object. (Previously it was a "complete" styles object, which was not intended.)

### Patches

- Handling `stylesheet.onReset` undefined scenarios better.

## 6.6.0
Thu, 14 Jun 2018 20:52:57 GMT

### Minor changes

- Updating `styled` to pick up customizations without using the `customizable` decorator on the base component.

### Patches

- Minor JSDoc improvements.

## 6.2.0
Thu, 07 Jun 2018 16:35:34 GMT

### Minor changes

- Added getFirstTabbable, Updated getNextElement to take tabbable param like getPreviousElement.
- Minor changes to improve server side rendering.

### Patches

- Code format changes

## 6.0.5
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier

## 6.0.4
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.

## 6.0.3
Fri, 01 Jun 2018 10:18:43 GMT

### Patches

- Add utility function to help merge ARIA attributes.

## 6.0.2
Wed, 30 May 2018 22:05:04 GMT

*Version update only*

## 6.0.1
Wed, 30 May 2018 20:28:33 GMT

### Patches

- Minimum React version is now 16.3.2.
- Added `resetIds` api for adding predictability in jest tests.

## 5.33.0
Wed, 23 May 2018 16:14:26 GMT

### Minor changes

- Reverting the ChoiceGroup styling update along with updates to utilities to avoid potentially breaking changes.

## 5.32.0
Wed, 23 May 2018 10:28:50 GMT

### Minor changes

- Added `resetIds` api for adding predictability in jest tests.
- allow for customization of keycodes that cause the focus rect to appear

## 5.31.0
Tue, 15 May 2018 07:09:49 GMT

### Minor changes

- Remove dependency on React from Async

## 5.30.1
Fri, 04 May 2018 15:58:39 GMT

### Patches

- Updating React build version.

## 5.30.0
Wed, 02 May 2018 23:55:40 GMT

### Minor changes

- Backing out `isEqual` change which is broken.
- Add accompanying utilities work for Keytips

## 5.29.0
Fri, 27 Apr 2018 10:15:52 GMT

### Minor changes

- Allow a function to be passed to the Customizers props

### Patches

- Add isEqual and isNotEqual utilities

## 5.28.0
Wed, 25 Apr 2018 05:32:09 GMT

### Minor changes

- Adding `isDirectionalKeyCode` helper.

## 5.27.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- The focus styling no longer adds "ms-Fabric" classname to body. Instead a very specific class for controlling focus rects is added, which should not impact any existing code.

## 5.26.0
Fri, 20 Apr 2018 23:06:06 GMT

### Minor changes

- InputMask: Added inputMask utilitiy and tests

## 5.25.0
Thu, 19 Apr 2018 18:25:59 GMT

### Minor changes

- Update createRef to match React.createRef api

## 5.24.0
Mon, 16 Apr 2018 10:23:26 GMT

### Minor changes

- Adding some helpers which ensure that `ms-Fabric.is-focusVisible` class name is added to the document body when focus rectangles should be fixible. Also ensuring that the `documentElement` has a `dir` attribute.
- Upgrade to TypeScript 2.8.1

### Patches

- Removing module entry temporarily. (Will be added back in 6.0.)
- Updating build to React 16.3.1.

## 5.23.0
Thu, 05 Apr 2018 10:15:39 GMT

### Minor changes

- Added IComponentAs as a type for 'render as' props in components

## 5.22.1
Sat, 31 Mar 2018 17:40:00 GMT

### Patches

- asyncFocus: passing a component which has a focus method, but no `ownerDocument`, should still call focus.

## 5.22.0
Wed, 28 Mar 2018 10:16:39 GMT

### Minor changes

- The initials logic used in calculating Persona initials now takes in a `allowPhoneInitials` param to allow for translating phone text to initials.

## 5.21.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Update createRef type
- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

## 5.20.0
Fri, 23 Mar 2018 01:29:21 GMT

### Minor changes

- Introduced focusAsync for cheaper element focusing

## 5.19.1
Wed, 21 Mar 2018 10:18:29 GMT

### Patches

- EventGroup.raise: event args are now correctly mixed into the event object.

## 5.19.0
Tue, 20 Mar 2018 10:27:37 GMT

### Minor changes

- Make helper functions getWindow and getDocument accept `null`.

## 5.18.3
Mon, 19 Mar 2018 10:27:55 GMT

### Patches

- Use arrow function properties instead of @autobind

## 5.18.2
Thu, 15 Mar 2018 02:42:27 GMT

### Patches

- Revert focus changes

## 5.18.1
Tue, 13 Mar 2018 10:17:37 GMT

### Patches

- Customizable: Fix hoist/customizations import so it doesn't break amd

## 5.18.0
Mon, 12 Mar 2018 06:29:20 GMT

### Minor changes

- added hoistStatics function for use with decorators to fix broken statics issue, and added the fuction to the customizable decorator

### Patches

- Focus utility getPreviousElement did not correctly consider the tabbable argument when considering the current node. This can affect how FocusZones are processed, since only one element in a zone will have tab index set. This, in turn, affects how FocusTrapZone traps focus, since getPreviousElement is used during trapping focus.
- Styled: Add display name to styled wrapper

## 5.17.1
Fri, 09 Mar 2018 15:07:28 GMT

### Patches

- Focus: Update getPreviousElement to traverse a potential childMatch's parent siblings  (which was previously being skipped)

## 5.17.0
Fri, 09 Mar 2018 11:13:58 GMT

### Minor changes

- Add hoistStatics function to withResponsiveMode decorator.

## 5.16.0
Thu, 08 Mar 2018 11:27:24 GMT

### Minor changes

- Added hoistStatics function to @customizable decorator so static methods work properly

## 5.15.0
Tue, 06 Mar 2018 11:13:36 GMT

### Minor changes

- Adds createRef polyfil to prepare for object refs.

## 5.14.1
Tue, 06 Mar 2018 02:06:59 GMT

### Patches

- Replaced PureComponent with Component to appease website's UHF react version.

## 5.14.0
Fri, 02 Mar 2018 11:25:35 GMT

### Minor changes

- Upgrade to TypeScript 2.7.2
- Update KeyCodes enum to include all key codes

## 5.13.0
Thu, 22 Feb 2018 11:15:23 GMT

### Minor changes

- Focus/DOM: add the ability to find if an element (or any ancestor) contains a given attribute. Also, add a shouldrWapFocus function to the focus utility (which leverages the fild element attribute just described) which returns true if the given no wrap data attribute (data-no-vertical-wrap OR data-no-horizontal-wrap) exists and is set to true

## 5.12.1
Wed, 21 Feb 2018 11:12:11 GMT

### Patches

- fix bug in IE that IE does not support Number.IsInteger

## 5.12.0
Fri, 16 Feb 2018 11:23:29 GMT

### Minor changes

- Added a triangle abstraction class

### Patches

- Focus: Fix getPreviousElement to correctly walk across previous siblings if a potential child match was found

## 5.11.0
Wed, 14 Feb 2018 22:10:50 GMT

### Minor changes

- BaseComponent.onError default implementation removed, exceptions now simply bubble out which lets partners use React 16 error handling.

## 5.10.3
Tue, 13 Feb 2018 11:24:05 GMT

### Patches

- Export IClassNames fro Utilities for creating private getClassNames methods

## 5.10.2
Thu, 08 Feb 2018 11:13:51 GMT

### Patches

- Return empty initials for phone numbers

## 5.10.1
Wed, 07 Feb 2018 11:23:59 GMT

### Patches

- Fixing direct reference to @uifabric/utilities/lib from ResizeGroup

## 5.10.0
Mon, 05 Feb 2018 11:24:23 GMT

### Minor changes

- [Math] implemented precision rounding functions

## 5.9.0
Mon, 29 Jan 2018 11:23:40 GMT

### Minor changes

- Add work week date range type and update date math getDateRangeArray to consume it, add unit tests

## 5.8.0
Fri, 26 Jan 2018 11:25:22 GMT

### Minor changes

- IBaseProps: typings adjusted to be less restrictive and compatible with strict mode.

## 5.7.1
Thu, 25 Jan 2018 11:23:06 GMT

### Patches

- Set timeout ids to null for cancel and flush functions

## 5.7.0
Mon, 22 Jan 2018 11:14:27 GMT

### Minor changes

- Adding a helper component to inject context values

## 5.6.1
Tue, 19 Dec 2017 11:22:47 GMT

### Patches

- Broaden the range of allowed prop-type versions

## 5.6.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

## 5.5.0
Tue, 28 Nov 2017 02:24:21 GMT

### Minor changes

- Moving `styled` and `getClassNameFunction` out of styling to utilities.

## 5.4.0
Mon, 13 Nov 2017 11:20:56 GMT

### Minor changes

- BaseComponent: fixing some typings to be compatible with current React typings.

## 5.3.3
Fri, 10 Nov 2017 17:09:36 GMT

### Patches

- Object: getId: updated so it will correctly return a string rather than an  int

## 5.3.2
Wed, 08 Nov 2017 11:11:27 GMT

### Patches

- This PR addresses #3226 by removing the automatic call to `setPeriodicReset`. Now it is only called when `measure` is called. This prevents unnecessary resets from occurring before measure is even called. Additionally, `reset` no longer calls `setPeriodicReset`, and instead waits again for the next `measure` to set the timeout.

## 5.3.1
Wed, 08 Nov 2017 06:05:34 GMT

### Patches

- Update @uifabric/utilities

## 5.3.0
Wed, 18 Oct 2017 10:21:25 GMT

### Minor changes

- Add cancel/flush to debounce

## 5.2.1
Fri, 06 Oct 2017 10:18:41 GMT

### Patches

- TSConfig: update to use preserveConstEnums so that certain builds s ystems don't break when importing const enums

## 5.2.0
Thu, 05 Oct 2017 17:03:43 GMT

### Minor changes

- Undoing 6.0 bump which was made by automation inadvertently.
- Fixing version dependencies.

## 5.1.0
Thu, 05 Oct 2017 16:29:11 GMT

### Minor changes

- Undoing 6.0 bump which was made by automation inadvertently.

## 6.0.0
Wed, 04 Oct 2017 22:40:22 GMT

### Breaking changes

- Positioning: Refactored positioning and removed deprecated properties

## 5.0.1
Wed, 27 Sep 2017 00:20:58 GMT

### Patches

- Updated for Fabric 5.0.

## 4.16.0
Tue, 26 Sep 2017 20:42:17 GMT

### Minor changes

- Reverting Customizer changes, as they are breaking. Will include in 5.0.

## 4.15.0
Tue, 26 Sep 2017 10:09:04 GMT

### Minor changes

- Updating Customizer to support `scopedSettings` prop. Adding a `Customizations` object for applying global and scoped customizations in non-React environments.

## 4.14.1
Mon, 25 Sep 2017 10:19:18 GMT

### Patches

- Array: Add utility functions for updating arrays immutably

## 4.14.0
Fri, 22 Sep 2017 19:08:51 GMT

### Minor changes

- Adding `mapEnumByName` helper.

## 4.13.1
Thu, 14 Sep 2017 00:34:57 GMT

### Patches

- getLanguage: Use localStorage wrapper helpers to avoid exceptions thrown by the browser when accessing localStorage.

## 4.13.0
Mon, 04 Sep 2017 10:16:56 GMT

### Minor changes

- Add ISize interface and fitContentToBounds utility function

## 4.12.1
Fri, 01 Sep 2017 18:06:55 GMT

### Patches

- Set the RTL language when the language is read from session storage

## 4.12.0
Thu, 31 Aug 2017 15:41:56 GMT

### Minor changes

- RTL: Persist rtl settings between sessions

## 4.11.1
Tue, 29 Aug 2017 20:55:35 GMT

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 4.11.0
Tue, 29 Aug 2017 10:20:56 GMT

### Minor changes

- Array: rename removeElement to removeIndex

## 4.10.3
Mon, 28 Aug 2017 10:09:32 GMT

### Patches

- Array: Add removeElement method

## 4.10.2
Fri, 25 Aug 2017 20:31:51 GMT

### Patches

- Adding back sourcemap content to .map files, which should alleviate "../src/* missing" issues when using webpack.

## 4.10.1
Fri, 25 Aug 2017 10:09:40 GMT

### Patches

- Array: Add find utility method
- BaseComponent: Make State type optional to be consistent with React.Component typing

## 4.10.0
Thu, 24 Aug 2017 05:38:14 GMT

### Minor changes

- createArray: reverting previous change to make getItem optional, cleaning up so that the return value is correct.
- Array: Add typesafety for createArray and findIndex

## 4.9.1
Mon, 21 Aug 2017 10:19:29 GMT

### Patches

- Minor tweaks to utilities to reduce the graph edges.

## 4.9.0
Thu, 03 Aug 2017 10:13:03 GMT

### Minor changes

- TypeScript 2.4.1 bump

## 4.8.1
Fri, 21 Jul 2017 10:21:45 GMT

### Patches

- Fixing filteredAssign function

## 4.8.0
Wed, 19 Jul 2017 21:40:34 GMT

### Minor changes

- Add assertNever function for exhaustive null checking

## 4.7.2
Wed, 12 Jul 2017 01:49:50 GMT

### Patches

- Fixing typings for TypeScript 2.4.1 compatibility.

## 4.7.1
Sat, 08 Jul 2017 03:34:35 GMT

### Patches

- Updating library comments.

## 4.7.0
Thu, 06 Jul 2017 10:11:47 GMT

### Minor changes

- Adding export for GlobalSettings object.

## 4.6.0
Fri, 30 Jun 2017 19:44:26 GMT

### Minor changes

- Customizer `setDefault` method moved to GlobalSettings `setValue` helper. This patches the customization code in 2 ways: 1. Multiple copies of the Customizer on the page will no longer create script errors complaining about missing themes, and 2. React is no longer pulled into the styling graph.

## 4.5.0
Thu, 29 Jun 2017 20:48:31 GMT

### Minor changes

- Adding a new Grid utility

## 4.4.2
Thu, 29 Jun 2017 10:13:16 GMT

### Patches

- Removing localstorage persistence for rtl helpers.

## 4.4.1
Tue, 27 Jun 2017 01:26:31 GMT

### Patches

- Enable forceConsistentCasingInFileNames tsconfig option

## 4.4.0
Wed, 21 Jun 2017 01:52:48 GMT

### Minor changes

- Add FabricPerformance utility to measure performance

## 4.3.0
Wed, 14 Jun 2017 06:02:15 GMT

### Minor changes

- Enable strictNullChecks in utilities package

### Patches

- isTabbableElement: fixed edge cases with identifying focusable elements that have tabIndex assigned.
- Focus Utility should respect tabindex=-1 on tabable elements

## 4.2.0
Mon, 12 Jun 2017 01:47:18 GMT

### Minor changes

- Enable no implicit any in utilities package

## 4.1.2
Thu, 08 Jun 2017 00:18:05 GMT

### Patches

- Adding a try-catch around setting RTL in local storage for the browser

## 4.1.1
Tue, 06 Jun 2017 06:06:46 GMT

### Patches

- Adding tslib dependency to reduce re

## 4.1.0
Tue, 06 Jun 2017 00:50:06 GMT

### Minor changes

- Customizer/customizable: adjusting to take in fields, rather than a single string representing the thing to customize.

### Patches

- memoize: returns the callback in scenarios where WeakMap isn't available.

## 4.0.1
Thu, 01 Jun 2017 16:34:03 GMT

### Patches

- getDocument/getWindow: now checks for doc/win undefined before accessing, making them ssr happy.
- Update Focus handling to suport immediately-nested focus zones

## 4.0.0
Tue, 30 May 2017 03:27:20 GMT

### Breaking changes

- memoize/memoizeFunction: memoize converted to a decorator, memoizeFunction is now for memoizing functions.
- getLangauge/setLanguage: new apis added for getting/setting the language normally specified on the html lang attribute.

### Patches

- Introduce prop-types instead of React.PropTypes

## 1.10.2
Fri, 26 May 2017 10:21:03 GMT

### Patches

- Utilities: Fixed incorrect calculation of initials. Properly remove unwanted ASCII characters, and do not calculate initials for Arabic and CJK based languages. 

## 1.10.1
Wed, 24 May 2017 23:52:09 GMT

### Patches

- Add utlities for unit tests that need to override or spy on React lifecycle methods

## 1.10.0
Tue, 23 May 2017 10:16:04 GMT

### Minor changes

- warn: Making ISettingsMap have optionals so that the warn utilities can be used for Prop interfaces containing required params.

## 1.9.0
Thu, 18 May 2017 10:09:58 GMT

### Minor changes

- Adding memoize utility. Updating css to handle serializable objects. Updating rtl helper to respect a localStorage setting.

## 1.8.7
Fri, 05 May 2017 10:18:19 GMT

### Patches

- getRTL: fixing an issue to ensure it is once again SSR friendly.

## 1.8.6
Thu, 04 May 2017 10:08:59 GMT

### Patches

- Removes label from native properties

## 1.8.5
Tue, 02 May 2017 10:09:08 GMT

### Patches

- withViewport: Preserving the `forceUpdate` parameter when asynchronously re-resolving the viewport size.

## 1.8.4
Fri, 21 Apr 2017 06:23:54 GMT

### Patches

- Updating setRTL to write isRTL to local storage. This allows the setting to persist across sessions.

## 1.8.0
Wed, 19 Apr 2017 16:54:26 GMT

### Minor changes

- Adding warn utilities for console logging warnings on misuse.

## 1.7.0
Fri, 14 Apr 2017 03:06:28 GMT

### Minor changes

- overflow: Utilities for detecting overflow in elements

## 1.6.0
Thu, 06 Apr 2017 03:12:13 GMT

### Minor changes

- Updating typings in warn.ts.

## 1.5.0
Tue, 04 Apr 2017 15:18:51 GMT

### Minor changes

- BaseComponent: added support for resolving `componentRef` automatically. Also added `_warnDeprecations` and `_warnMutualExclusion` helpers for warning on misuse.

## 1.4.0
Thu, 30 Mar 2017 21:04:29 GMT

### Minor changes

- Adding `setBodyScroll` method to enable/disable body scrolling. Useful for Overlay scenarios where you would want to disable the scrolling behind the overlay.

## 1.3.0
Thu, 23 Mar 2017 03:13:02 GMT

### Minor changes

- Adding some utility functions to handle date range calculations and determining if a date falls within a date range.

## 1.2.0
Fri, 10 Mar 2017 20:41:05 GMT

### Minor changes

- Adjusting React peer dependency to i

## 1.1.0
Wed, 01 Mar 2017 20:31:22 GMT

### Minor changes

- Utilities: adding getInitials utility.

## 1.0.3
Mon, 13 Feb 2017 08:15:53 GMT

### Patches

- Updating package.json dependencies to exclude typings packages.

## 1.0.2
Fri, 27 Jan 2017 04:09:14 GMT

### Patches

- autobind: Does not re-bind every time a decorated method is accessed anymore.

## 1.0.1
Wed, 25 Jan 2017 04:11:36 GMT

### Patches

- rtl utility should read rtl attribute on first read.

## 1.0.0
Mon, 16 Jan 2017 21:57:33 GMT

### Breaking changes

- Introducing a new package to contain all baseline utilities that are commonly used amongst Fabric components.

