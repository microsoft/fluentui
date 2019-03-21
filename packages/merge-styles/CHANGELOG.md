# Change Log - @uifabric/merge-styles

This log was last generated on Fri, 08 Mar 2019 13:32:10 GMT and should not be manually modified.

## 6.16.1
Fri, 08 Mar 2019 13:32:10 GMT

### Patches

- Fix selector in a mergeStyleSets Readme example

## 6.16.0
Fri, 01 Mar 2019 13:33:08 GMT

### Minor changes

- Some references to "process" have been removed to help with tree shaking.

## 6.15.2
Wed, 30 Jan 2019 13:36:21 GMT

### Patches

- Fix bug where multiple selectors in :global() would not be processed correctly

## 6.15.1
Wed, 23 Jan 2019 22:53:13 GMT

### Patches

- Allow :global to be used in more scenarios than just ":global(selector)"
- Use CSS object-fit in the Image component in capable browsers

## 6.15.0
Thu, 15 Nov 2018 13:36:22 GMT

### Minor changes

- DevExp: get rid of const enum so the library is compatible with Typescript's isolatedModule compilation mode

## 6.14.0
Tue, 13 Nov 2018 13:30:53 GMT

### Minor changes

- `strokeLinecap` added to IRawStyles.

## 6.13.0
Thu, 08 Nov 2018 04:17:34 GMT

### Minor changes

- Fixes #6975: adds ability for mergestyles to handle commas in selectors

## 6.11.0
Fri, 26 Oct 2018 12:32:35 GMT

### Minor changes

- Add api-extractor.json

## 6.10.4
Wed, 24 Oct 2018 12:28:58 GMT

### Patches

- IRawStyleBase: Replace string type on display property with a more specific type of possible values.

## 6.10.3
Mon, 22 Oct 2018 12:29:57 GMT

### Patches

- Added 'stretch' as valid value for justifyContent in IRawStyleBase.

## 6.10.2
Thu, 18 Oct 2018 20:22:36 GMT

### Patches

- Update api-extractor

## 6.10.1
Mon, 15 Oct 2018 12:29:12 GMT

### Patches

- IStyleSet: Now uses a form that works better in TS 2.8 and does not require TS 3.0 to work. Thanks [Nimelrian](https://github.com/Nimelrian)!
- Adding css grid properties to fill out the spec

## 6.10.0
Thu, 11 Oct 2018 23:13:31 GMT

### Minor changes

- Enable api-extractor task for merge-styles

## 6.9.4
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies 

## 6.9.3
Mon, 01 Oct 2018 12:27:24 GMT

### Patches

- Prettier cleanup

## 6.9.2
Fri, 28 Sep 2018 12:27:38 GMT

### Patches

- Ignoring registering rules which are undefined.

## 6.9.1
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file

## 6.9.0
Thu, 20 Sep 2018 12:25:33 GMT

### Minor changes

- Adding support for feature queries in selectors.

## 6.8.4
Thu, 13 Sep 2018 17:38:04 GMT

### Patches

- Added some missing styles. mix-blend-mode plus some padding-inline-*

## 6.8.3
Wed, 05 Sep 2018 10:29:25 GMT

### Patches

- Improve a DX issue with IProcessedStyleSet typings. (issue #6124)

## 6.8.2
Wed, 29 Aug 2018 10:28:42 GMT

### Patches

- The IProcessedStyleSet type now correctly infers the types of subComponentStyles properties.

## 6.8.1
Tue, 28 Aug 2018 10:23:58 GMT

### Patches

- Adds missing CSS property values for 'align-self' in `IRawStyle` type definition and corrects CSS property values for 'justify-self' in 'IRawStyle'

## 6.8.0
Mon, 27 Aug 2018 10:27:43 GMT

### Minor changes

- Adds support for 'justifySelf' which is needed to align items in CSS Grid.

## 6.7.0
Mon, 30 Jul 2018 10:27:11 GMT

### Minor changes

- Change IProcessedStyleSet typings to be easier to consume - subcomponentStyles is now always present so consumers do not have to check for presence even when it is fully expected that it is there.

### Patches

- formatting change

## 6.6.0
Thu, 26 Jul 2018 10:28:51 GMT

### Minor changes

- Add resize rule to IRawStyleBase.

## 6.5.1
Thu, 19 Jul 2018 21:25:32 GMT

### Patches

- `mergeStyleSet` is able to take falsey values again and handle it correctly in all cases.

## 6.5.0
Wed, 18 Jul 2018 10:25:50 GMT

### Minor changes

- Add support for style functions and improve documentation/typings.

## 6.4.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Reverting the TypeScript bump, to un

## 6.2.3
Tue, 10 Jul 2018 21:54:07 GMT

### Patches

- Refining the merge-styles fix from yesterday to check for ownerDocument changes, which is a more correct comparison to work around the Chrome "window not resetting" issue.

## 6.2.2
Tue, 10 Jul 2018 05:05:15 GMT

### Patches

- If the singleton `Stylesheet` instance originated from another window, reset the instance. Workaround for an unexplained Chrome issue where the singleton was still accessible after a page refresh.

## 6.2.1
Wed, 20 Jun 2018 10:25:55 GMT

### Patches

- Prettier fixes

## 6.2.0
Thu, 07 Jun 2018 16:35:34 GMT

### Minor changes

- Minor changes to improve server side rendering.

## 6.0.2
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier

## 6.0.1
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.

## 6.0.0
Wed, 30 May 2018 22:05:03 GMT

### Breaking changes

- v6 release - see office-ui-fabric-react@6.1.0 for all up v6 release notes.

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

