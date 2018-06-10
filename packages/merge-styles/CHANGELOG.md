# Change Log - @uifabric/merge-styles

This log was last generated on Wed, 23 May 2018 10:28:50 GMT and should not be manually modified.

## 5.17.1
Wed, 23 May 2018 10:28:50 GMT

### Patches

- Added missing merge-styles background-size typing

## 5.17.0
Thu, 26 Apr 2018 10:12:34 GMT

### Minor changes

- Add `animation` to `IRawStyleBase` for use in style sets.

## 5.16.1
Wed, 25 Apr 2018 05:32:09 GMT

### Patches

- merge-styles: `style` elements which are created on the fly now "bunch" together, avoiding unpredictability in specificity.

## 5.16.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- Updating how keyframe classes are cached to aid with jest snapshot testing.

### Patches

- Updating documentation.

## 5.15.2
Tue, 17 Apr 2018 18:47:11 GMT

### Patches

- mergeStyles: rules are now registered in separate styling objects, improving performance significantly.

## 5.15.1
Mon, 16 Apr 2018 10:23:26 GMT

### Patches

- Removing module entry temporarily. (Will be added back in 6.0.)

## 5.15.0
Tue, 10 Apr 2018 17:37:28 GMT

### Minor changes

- Add backgroundClip property definition.

## 5.14.1
Fri, 06 Apr 2018 10:25:55 GMT

### Patches

- mergeStyles: flipping RTL at runtime now resets the keys.

## 5.14.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

## 5.13.0
Fri, 02 Mar 2018 11:25:35 GMT

### Minor changes

- Upgrade to TypeScript 2.7.2

## 5.12.2
Wed, 21 Feb 2018 11:12:11 GMT

### Patches

- Adding test coverage for media queries.

## 5.12.1
Fri, 16 Feb 2018 11:23:29 GMT

### Patches

- mergeStyles: setting `fill-opacity` as unitless.

## 5.12.0
Wed, 14 Feb 2018 22:10:50 GMT

### Minor changes

- mergeStyles: Adding support to register selectors globally. Use `:global(rule)` as the selector to ensure that the unique className is not prepended in the output. See merge-styles README.md for more details.

## 5.11.2
Wed, 07 Feb 2018 11:23:59 GMT

### Patches

- Adjusting rtl flipping logic to be more resilient to invalid styling.

## 5.11.1
Tue, 06 Feb 2018 11:14:36 GMT

### Patches

- [provideUnits] Add line-height to ignore

## 5.11.0
Thu, 25 Jan 2018 11:23:06 GMT

### Minor changes

- Change maxHeight/maxFontSize to CSSPixelUnitRule (number and string)

## 5.10.1
Wed, 17 Jan 2018 11:11:25 GMT

### Patches

- Fix styles with undefined values being added to document (#3700)

## 5.10.0
Thu, 28 Dec 2017 11:23:50 GMT

### Minor changes

- Added a setting to Stylesheet which allows overriding the default prefix

## 5.9.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

## 5.8.1
Mon, 11 Dec 2017 11:24:05 GMT

### Patches

- Fixing issues where child variables in selectors would not expand correctly. Also fixing a case where the same static class registered in two different sets will not show up multiple times in the result from `mergeStyleSets`.

## 5.8.0
Fri, 01 Dec 2017 11:11:16 GMT

### Minor changes

- Adding `onInsertNode` callback and adjusting appendChild method for injecting styles to not cause flashes.

## 5.7.0
Wed, 29 Nov 2017 11:24:05 GMT

### Minor changes

- Updating TypeScript to 2.6.2.

## 5.6.0
Fri, 10 Nov 2017 17:09:36 GMT

### Minor changes

- Adding the ability to append style content rather than inject using insertRule, for special cases.

## 5.5.1
Thu, 02 Nov 2017 18:20:18 GMT

### Patches

- When selectors use previously registered class names as values, they are now correctly auto expanded.

## 5.5.0
Tue, 24 Oct 2017 10:21:08 GMT

### Minor changes

- Adding `stroke` css property to typings.

## 5.4.2
Fri, 20 Oct 2017 18:42:08 GMT

### Patches

- Calling `mergeStyles` with strings containing space delimited class names was not expanding merge-styles generated class names in the final merge. Fixed so that it does.

## 5.4.1
Tue, 17 Oct 2017 17:17:41 GMT

### Patches

- mergeStyles: in RTL we were seeing exceptions with registering opacity: 0 in keyframes. This has been addressed and a test has been added to cover the case.

## 5.4.0
Fri, 13 Oct 2017 04:00:17 GMT

### Minor changes

- Fixes to support media queries.

### Patches

- Adding data-merge-styles attribute to the style element so that it can be uniquely identified.

## 5.3.3
Fri, 13 Oct 2017 01:36:02 GMT

### Patches

- Adding data-merge-styles attribute to the style element so that it can be uniquely identified.

## 5.3.2
Mon, 09 Oct 2017 10:08:09 GMT

### Patches

- Add test for autoexpand

## 5.3.1
Fri, 06 Oct 2017 10:18:41 GMT

### Patches

- TSConfig: update to use preserveConstEnums so that certain builds s ystems don't break when importing const enums

## 5.3.0
Thu, 05 Oct 2017 10:17:42 GMT

### Minor changes

- Adding selector support to target child class names that were generated in the same mergeStyleSets set.

## 5.2.0
Sat, 30 Sep 2017 01:26:37 GMT

### Minor changes

- Found that adding `false` to the list of accepted typings in `mergeStyleSets` was breaking type safety. Removed it.

## 5.1.0
Fri, 29 Sep 2017 10:20:24 GMT

### Minor changes

- The `mergeStyleSets` method's type safety was not correct. Now with significantly better type safety.

