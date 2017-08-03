# Change Log - @uifabric/utilities

This log was last generated on Thu, 03 Aug 2017 10:13:03 GMT and should not be manually modified.

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

