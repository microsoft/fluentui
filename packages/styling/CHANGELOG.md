# Change Log - @uifabric/styling

This log was last generated on Tue, 05 Mar 2019 17:33:41 GMT and should not be manually modified.

## 6.44.1
Tue, 05 Mar 2019 17:33:41 GMT

### Patches

- Adding theme.js to sideEffects list to prevent webpack from treeshaking it out.

## 6.44.0
Tue, 05 Mar 2019 04:25:07 GMT

### Minor changes

- add yellowDark to IPalette

## 6.43.0
Fri, 01 Mar 2019 13:33:08 GMT

### Minor changes

- The package side-effects flag has been removed, allowing for tree shaking to do its magic much better.

## 6.42.0
Wed, 27 Feb 2019 01:28:58 GMT

### Minor changes

- IEffects: changes types of the `elevation` and `roundedCorner2` properties to `string` to allow a more flexible way to provide values.

## 6.41.0
Tue, 15 Jan 2019 13:36:45 GMT

### Minor changes

- theming: add loadFonts function and register font variables

### Patches

- fix createTheme so that it cannot mutate DefaultFontStyles

## 6.40.0
Thu, 10 Jan 2019 04:58:48 GMT

### Minor changes

- ITheme: add defaultFontStyles property

## 6.39.0
Thu, 13 Dec 2018 13:37:01 GMT

### Minor changes

- ITheme: remove ITypography

## 6.38.0
Fri, 30 Nov 2018 13:37:17 GMT

### Minor changes

- Extend theming to incorporate shadows and rounded corners

### Patches

- Add missing API file update

## 6.37.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- semantic slot value updates

## 6.35.0
Thu, 15 Nov 2018 13:36:22 GMT

### Minor changes

- DevExp: get rid of const enum so the library is compatible with Typescript's isolatedModule compilation mode

## 6.34.1
Fri, 09 Nov 2018 13:32:57 GMT

### Patches

- Icon: warnings from duplicate registrations are now throttled into a single message.

## 6.34.0
Wed, 31 Oct 2018 12:32:41 GMT

### Minor changes

- API changes to getSchemedContext for use by theme provider.

## 6.33.0
Fri, 26 Oct 2018 12:32:35 GMT

### Minor changes

- Add api-extractor.json

## 6.32.2
Wed, 24 Oct 2018 12:28:58 GMT

### Patches

- getIconClassName: Strongly type the use of IStyle constant.

## 6.32.1
Tue, 23 Oct 2018 12:32:16 GMT

### Patches

- Fix an issue with the demo site not being able to load (in npm start or aka.ms/fabricdemo).

## 6.32.0
Mon, 22 Oct 2018 12:29:57 GMT

### Minor changes

- Fix unnecessary `IRGB` export. This interface is only used by internals. Use the `IRGB` interface declaration from office-ui-fabric-react package instead.

## 6.31.0
Thu, 18 Oct 2018 20:22:36 GMT

### Minor changes

- Enable api-extractor task for styling

## 6.30.0
Tue, 09 Oct 2018 12:26:48 GMT

### Minor changes

- focusBorder changed to neutralSecondary

## 6.29.2
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies 

## 6.29.1
Fri, 05 Oct 2018 23:29:26 GMT

### Patches

- Fixing getGlobalClassNames to return the correct class names even when the theme object is different.

## 6.29.0
Thu, 04 Oct 2018 12:26:48 GMT

### Minor changes

- add delayLength parameter to _createDefaultAnimation in PulsingBeaconAnimationStyles

## 6.28.0
Mon, 01 Oct 2018 12:27:24 GMT

### Minor changes

- Minor additions for semantic colors.
- semantic slot value updates per design direction

## 6.27.0
Fri, 21 Sep 2018 14:25:46 GMT

### Minor changes

- Add schemes to ITheme with helper utility.

### Patches

- Adding a version stamp file

## 6.26.0
Wed, 19 Sep 2018 12:27:48 GMT

### Minor changes

- Theming: add ISpacing interface and spacing property

## 6.25.0
Tue, 18 Sep 2018 12:26:03 GMT

### Minor changes

- Theming: add ISpacing interface and spacing property

## 6.24.0
Thu, 13 Sep 2018 17:38:04 GMT

### Minor changes

- Adds new semantic slots per design direction

## 6.23.0
Fri, 07 Sep 2018 16:29:48 GMT

### Minor changes

- Updates button slots with correct pre-fluent palette values and scss fallbacks

## 6.22.0
Thu, 06 Sep 2018 10:28:35 GMT

### Minor changes

- add buttonBackgroundDisabled semantic slot

## 6.21.0
Wed, 05 Sep 2018 10:29:25 GMT

### Minor changes

- Change bodyDivider value from neutralTertiaryAlt back to neutralLight

## 6.20.0
Thu, 30 Aug 2018 10:32:49 GMT

### Minor changes

- Adds a new function returning a style for an :after pseudo element to replace an ellipsis text-overflow with a fading out effect of last characters. Considers the fact that all colors are affected by the theme applied to the app.

## 6.19.0
Mon, 27 Aug 2018 10:27:43 GMT

### Minor changes

- Added ScreenWidthMinUhfMobile constant

## 6.18.0
Fri, 24 Aug 2018 10:26:08 GMT

### Minor changes

- Adjustments to the internal typography interfaces.

## 6.17.0
Tue, 21 Aug 2018 10:28:16 GMT

### Minor changes

- adds variantBorderHovered and emptyStateBackground semantic slots to theme and variants logic

## 6.16.0
Mon, 13 Aug 2018 03:43:25 GMT

### Minor changes

- new button semantic slots
- adds opacity function to variants

## 6.15.0
Fri, 10 Aug 2018 10:26:09 GMT

### Minor changes

- Updating `ITypography` interface with improvements. Note this is an experimental interface we're working on.

## 6.14.0
Fri, 03 Aug 2018 10:25:59 GMT

### Minor changes

- adds 4 new semantic slots, based on designs from SP-Client events webpart, and with approval from Philip Kuo; actionLink, actionLinkHovered, cardBackground, variantBorder

## 6.13.0
Thu, 02 Aug 2018 10:23:19 GMT

### Minor changes

- getGlobalClassNames - when disabled, now returns a unique classname (modularized) instead of empty string.
- Styling: make typography properties optional in Partial<ITheme>

## 6.12.0
Tue, 24 Jul 2018 10:24:36 GMT

### Minor changes

- Add unregisterIcons to styling export

## 6.11.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- add ITypography to ITheme
- Theming: add new semantic slot

## 6.10.0
Thu, 19 Jul 2018 10:23:34 GMT

### Minor changes

- Add unregister icons API

## 6.9.0
Wed, 18 Jul 2018 10:25:50 GMT

### Minor changes

- Move certain types into `@uifabric/merge-styles` and export more types as well from that package.

## 6.8.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Reverting the TypeScript bump, to un

## 6.6.0
Tue, 10 Jul 2018 21:54:07 GMT

### Minor changes

- Add option to getFocusStyle() to not use :focus in the style selector.

## 6.5.0
Mon, 02 Jul 2018 20:41:48 GMT

### Minor changes

- New selectors for high contrast white and black modes.

## 6.4.0
Fri, 29 Jun 2018 10:24:05 GMT

### Minor changes

- Add neutralSecondaryAlt color.

## 6.3.0
Wed, 20 Jun 2018 10:25:55 GMT

### Minor changes

- Add borderColor and outlineColor parameters to getFocusStyle

### Patches

- Prettier fixes

## 6.2.1
Tue, 19 Jun 2018 10:26:26 GMT

### Patches

- Handling `stylesheet.onReset` undefined scenarios better.

## 6.2.0
Thu, 07 Jun 2018 16:35:34 GMT

### Minor changes

- Minor changes to improve server side rendering.

## 6.0.3
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier

## 6.0.2
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.

## 6.0.1
Wed, 30 May 2018 22:05:04 GMT

*Version update only*

## 6.0.0
Wed, 30 May 2018 20:28:33 GMT

### Breaking changes

- Bump to 6.0 alongside office-ui-fabric-react 6.0 release.

## 5.31.0
Thu, 24 May 2018 17:06:02 GMT

### Minor changes

- add new semantic slot

## 5.30.3
Wed, 23 May 2018 10:28:50 GMT

### Patches

- cleanup semantic slots

## 5.30.2
Thu, 17 May 2018 10:28:07 GMT

### Patches

- Fix import to be compatible with AMD bundlers

## 5.30.1
Fri, 04 May 2018 15:58:39 GMT

### Patches

- Updating React build version.

## 5.30.0
Wed, 02 May 2018 23:55:40 GMT

### Minor changes

- Add accompanying styling work for Keytips

### Patches

- fix bad import in styling package

## 5.29.0
Tue, 01 May 2018 10:23:32 GMT

### Minor changes

- Adding helper to derive a media query.

## 5.28.0
Mon, 30 Apr 2018 10:16:44 GMT

### Minor changes

- Adds flags to theme to support controlling global class names

## 5.27.0
Wed, 25 Apr 2018 05:32:09 GMT

### Minor changes

- Add theme slots for DetailsList header colors

## 5.26.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- The getFocusStyle helper has been adjusted to use the `ms-Fabric--isFocusEnabled` class name, rather than `ms-Fabric.is-focusEnabled`.

## 5.25.0
Thu, 19 Apr 2018 00:17:37 GMT

### Minor changes

- PulsingBeaconAnimationStyles: Distinguish between single and double pulse.

## 5.24.0
Wed, 18 Apr 2018 10:15:04 GMT

### Minor changes

- Add opt-in @deprecated comments

### Patches

- Fix deprecated semantic slots returning empty strings

## 5.23.1
Mon, 16 Apr 2018 10:23:26 GMT

### Patches

- Removing module entry temporarily. (Will be added back in 6.0.)
- Updating build to React 16.3.1.

## 5.23.0
Tue, 10 Apr 2018 17:37:28 GMT

### Minor changes

- Add noWrap style set.

## 5.22.0
Thu, 05 Apr 2018 10:15:39 GMT

### Minor changes

- New pulsing beacon animation moved in from Coachmark for reuse.

## 5.21.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

## 5.20.0
Mon, 19 Mar 2018 10:27:55 GMT

### Minor changes

- ThemePrimary: Updating this color along with an Office branding update.

### Patches

- High contrast mode for focus styling.

## 5.19.1
Mon, 12 Mar 2018 06:29:20 GMT

### Patches

- By default, try to use the system font before downloading a web font

## 5.19.0
Fri, 23 Feb 2018 03:05:53 GMT

### Minor changes

- add preliminary support for variant theming, add bodyLink slot

## 5.18.1
Sat, 17 Feb 2018 21:29:00 GMT

### Patches

- Add whiteTranslucent40 to palette

## 5.18.0
Wed, 14 Feb 2018 22:10:50 GMT

### Minor changes

- Adjusting IColorClassNames and IFontStyles to remove the optional part for the members, to make the interfaces easier to consume.

## 5.17.0
Thu, 25 Jan 2018 11:23:06 GMT

### Minor changes

- Add focus clear func to styling and change maxheight/maxfontsize to CSSPixelUnitRule 

## 5.16.0
Wed, 24 Jan 2018 11:23:26 GMT

### Minor changes

- New slot for inputPlaceholderText color.

## 5.15.3
Mon, 22 Jan 2018 11:14:27 GMT

### Patches

- updated divider color to neutralTertiaryAlt
- Theming: fix listText semantic slot

## 5.15.2
Fri, 19 Jan 2018 11:14:02 GMT

### Patches

- added semantic slots for smallInputBorder and smallInputBorderHover

## 5.15.1
Thu, 28 Dec 2017 11:23:50 GMT

### Patches

- Adding new normalize and AnimationValues

## 5.15.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

## 5.14.0
Mon, 04 Dec 2017 17:27:54 GMT

### Minor changes

- Add an event callback for when the theme changes.

## 5.12.1
Fri, 01 Dec 2017 11:11:16 GMT

### Patches

- Use Yu Gothic UI, Microsoft Yahei UI, Microsoft Jhenghei UI

## 5.12.0
Thu, 30 Nov 2017 11:23:35 GMT

### Minor changes

- Updating the `registerIcons` helper to take in options.

## 5.11.1
Wed, 29 Nov 2017 11:24:05 GMT

### Patches

- SemanticSlots: Updated inputBorderHovered color.

## 5.11.0
Tue, 28 Nov 2017 02:24:21 GMT

### Minor changes

- Moving `styled` and `getClassNameFunction` out of styling to utilities.

## 5.10.1
Thu, 23 Nov 2017 11:10:13 GMT

### Patches

- Theme: Updated menuItemBackgroundChecked for ContextualMenu.

## 5.10.0
Fri, 17 Nov 2017 17:36:36 GMT

### Minor changes

- Export functions used to create font sets based upon a given locale code

## 5.8.0
Thu, 16 Nov 2017 11:20:34 GMT

### Minor changes

- Adding `styled` and `classNameFunction` helpers, in addition to a variety of interface.

## 5.7.0
Fri, 10 Nov 2017 17:09:36 GMT

### Minor changes

- Adjusting the IFabricConfig interface to allow for mergeStyle settings to be included.
- Updating `getIconClassName` to return display: inline-block to be consistent with the styled used by `ms-Icon ms-Icon--*`.

## 5.6.1
Mon, 30 Oct 2017 10:23:09 GMT

### Patches

- Adding Button related semantic slots.

## 5.6.0
Fri, 27 Oct 2017 10:25:09 GMT

### Minor changes

- Added IconFontSizes

## 5.5.0
Thu, 26 Oct 2017 10:21:37 GMT

### Minor changes

- Updating the icon warning to link to documentation for assistance.

## 5.4.1
Tue, 24 Oct 2017 10:21:08 GMT

### Patches

- remove outdated semantic slots

## 5.4.0
Fri, 20 Oct 2017 18:42:08 GMT

### Minor changes

- Adjusting the `registerIcons` code to allow for icons to map to JSX.Elements or icon code strings.

## 5.3.0
Tue, 10 Oct 2017 10:24:47 GMT

### Minor changes

- "Add menuSelectedText to theme and semanticColors"

## 5.2.1
Fri, 06 Oct 2017 10:18:41 GMT

### Patches

- TSConfig: update to use preserveConstEnums so that certain builds s ystems don't break when importing const enums

## 5.2.0
Thu, 05 Oct 2017 17:03:43 GMT

### Minor changes

- Fixing version dependencies.

## 5.1.1
Wed, 04 Oct 2017 22:40:22 GMT

*Version update only*

## 5.1.0
Sat, 30 Sep 2017 01:26:37 GMT

### Minor changes

- Add a new success background color

## 5.0.1
Wed, 27 Sep 2017 00:20:58 GMT

### Patches

- The 5.0 Fabric release. See the [the wiki](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Fabric-5.0:-What's-new) for a full list of changes and how to work with the new bits.

## 0.24.2
Tue, 26 Sep 2017 20:42:17 GMT

### Patches

- Reverting Customizer changes, as they are breaking. Will include in 5.0.

## 0.24.1
Tue, 26 Sep 2017 10:09:04 GMT

### Patches

- Updating default theme registration to use the new `Customizations` helper.

## 0.24.0
Thu, 14 Sep 2017 00:34:57 GMT

### Minor changes

- Adding `MoreVertical` icon.

## 0.23.1
Tue, 12 Sep 2017 17:41:25 GMT

### Patches

- Fixing circular dependency issue.

## 0.23.0
Mon, 11 Sep 2017 10:08:07 GMT

### Minor changes

- Adding the `getIconClassName` function, which will provide a way for partners to generate a given icon class name. This replaces the implicit `ms-Icon--*` pattern being used now, as well as using IconClassNames, which will go away in Fabric 5.

## 0.22.1
Mon, 04 Sep 2017 10:16:56 GMT

### Patches

- Icons: Added textDocument back into the icon list

## 0.22.0
Fri, 01 Sep 2017 16:51:57 GMT

### Minor changes

- Add a new semantic slot for the warning foreground color

### Patches

- Add FullWidth icon.

## 0.21.1
Tue, 29 Aug 2017 20:55:35 GMT

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 0.21.0
Tue, 29 Aug 2017 10:20:56 GMT

### Minor changes

- Theming: added an accent color slot

## 0.20.2
Fri, 25 Aug 2017 20:31:51 GMT

### Patches

- Adding back sourcemap content to .map files, which should alleviate "../src/* missing" issues when using webpack.

## 0.20.1
Wed, 23 Aug 2017 19:04:55 GMT

### Patches

- add Comment icon

## 0.20.0
Fri, 18 Aug 2017 16:32:33 GMT

### Minor changes

- mergeStyleSets: tweaked the return type to be less restrictive.

## 0.19.2
Mon, 14 Aug 2017 10:20:31 GMT

### Patches

- getFocusStyle: Add -moz-focus-inner to fix outline bug

## 0.19.1
Fri, 11 Aug 2017 19:38:35 GMT

### Patches

- add StreamLogo and PowerBILogo icons

## 0.19.0
Tue, 08 Aug 2017 15:28:32 GMT

### Minor changes

- Styling: added a screenReaderText utility style
- Adding a color to the palette

## 0.18.0
Mon, 07 Aug 2017 10:22:46 GMT

### Minor changes

- Adding 4 icons that were missing in the codes map.

## 0.17.0
Fri, 04 Aug 2017 10:11:48 GMT

### Minor changes

- Theming: add semantic slots for warnings, and also legacy theme semantic slots

## 0.16.0
Thu, 03 Aug 2017 10:13:03 GMT

### Minor changes

- TypeScript 2.4.1 bump

### Patches

- add Spacer and Divider toolbox icon

## 0.15.4
Wed, 02 Aug 2017 10:22:40 GMT

*Version update only*

## 0.15.3
Tue, 01 Aug 2017 10:13:55 GMT

*Version update only*

## 0.15.2
Mon, 31 Jul 2017 10:12:08 GMT

*Version update only*

## 0.15.1
Fri, 28 Jul 2017 18:36:00 GMT

*Version update only*

## 0.15.0
Fri, 28 Jul 2017 10:23:10 GMT

### Minor changes

- Adding High contrast colors to the paletter

### Patches

- Theming: add settings to the interface so we can track whether the current theme is inverted or not

## 0.14.0
Thu, 27 Jul 2017 10:23:33 GMT

### Minor changes

- Icons: Added new icons from 2.38

## 0.13.16
Tue, 25 Jul 2017 10:22:35 GMT

*Version update only*

## 0.13.15
Mon, 24 Jul 2017 10:24:30 GMT

*Version update only*

## 0.13.14
Fri, 21 Jul 2017 10:21:45 GMT

### Patches

- Adding multi-column mapping to the icon map to be available in the ChoiceGroup
- Theming: fix color mapping for listItemBackgroundChecked

## 0.13.13
Thu, 20 Jul 2017 10:11:23 GMT

*Version update only*

## 0.13.12
Wed, 19 Jul 2017 21:40:34 GMT

### Patches

- Add statusCircleCheckmark to IconCodes.ts.  Add font file version to icon url in DefaultFontStyles.ts.

## 0.13.11
Mon, 17 Jul 2017 18:38:01 GMT

*Version update only*

## 0.13.10
Mon, 17 Jul 2017 10:22:38 GMT

*Version update only*

## 0.13.9
Fri, 14 Jul 2017 17:34:53 GMT

*Version update only*

## 0.13.8
Thu, 13 Jul 2017 10:21:52 GMT

### Patches

- Only initialize the default theme once, even if multiple instances of @uifabric/styling are executed.

## 0.13.7
Thu, 13 Jul 2017 02:58:02 GMT

*Version update only*

## 0.13.6
Wed, 12 Jul 2017 01:49:50 GMT

### Patches

- Fixing typings for TypeScript 2.4.1 compatibility.

## 0.13.5
Tue, 11 Jul 2017 10:14:04 GMT

*Version update only*

## 0.13.4
Mon, 10 Jul 2017 19:18:55 GMT

*Version update only*

## 0.13.3
Mon, 10 Jul 2017 10:22:21 GMT

*Version update only*

## 0.13.2
Sat, 08 Jul 2017 05:59:28 GMT

*Version update only*

## 0.13.1
Sat, 08 Jul 2017 03:34:35 GMT

### Patches

- Updating dev dependencies.

## 0.13.0
Fri, 07 Jul 2017 10:11:38 GMT

### Minor changes

- Styling package: remove optionals from interfaces, since consumers can now use partial interfaces to define overrides.

### Patches

- Enable strict null checks in the styling package

## 0.12.3
Thu, 06 Jul 2017 10:11:47 GMT

*Version update only*

## 0.12.2
Tue, 04 Jul 2017 10:21:53 GMT

*Version update only*

## 0.12.1
Mon, 03 Jul 2017 10:11:52 GMT

*Version update only*

## 0.12.0
Fri, 30 Jun 2017 19:44:26 GMT

### Minor changes

- Dependencies now use path based imports to various utilities to minimize the graph dependency.

## 0.11.10
Fri, 30 Jun 2017 10:23:15 GMT

*Version update only*

## 0.11.9
Thu, 29 Jun 2017 20:48:31 GMT

*Version update only*

## 0.11.8
Thu, 29 Jun 2017 10:13:16 GMT

*Version update only*

## 0.11.7
Wed, 28 Jun 2017 10:12:04 GMT

*Version update only*

## 0.11.6
Tue, 27 Jun 2017 01:26:31 GMT

### Patches

- Enable forceConsistentCasingInFileNames tsconfig option

## 0.11.5
Fri, 23 Jun 2017 20:02:00 GMT

*Version update only*

## 0.11.4
Fri, 23 Jun 2017 04:12:23 GMT

*Version update only*

## 0.11.3
Thu, 22 Jun 2017 21:45:08 GMT

*Version update only*

## 0.11.2
Thu, 22 Jun 2017 10:13:03 GMT

*Version update only*

## 0.11.1
Wed, 21 Jun 2017 01:52:48 GMT

### Patches

- Instrumenting the performance of css registration.

## 0.11.0
Wed, 21 Jun 2017 00:45:41 GMT

### Minor changes

- Consume latest version of createApp 

### Patches

- General class exports now register on demand, resulting in less unneeded evaluation of classnames.
- Fixing circular dependency between @uifabric/styling/utilities and @uifabric/styling/styles

## 0.10.5
Tue, 20 Jun 2017 10:22:47 GMT

*Version update only*

## 0.10.4
Sat, 17 Jun 2017 17:39:43 GMT

*Version update only*

## 0.10.2
Sat, 17 Jun 2017 06:27:45 GMT

*Version update only*

## 0.10.1
Sat, 17 Jun 2017 04:36:46 GMT

### Patches

- Fixing amd import that was broken byt the no-implicit-anys fix.

## 0.10.0
Fri, 16 Jun 2017 23:02:08 GMT

### Minor changes

- Enable no-implicit-any in the styling package

## 0.9.1
Fri, 16 Jun 2017 19:39:47 GMT

*Version update only*

## 0.9.0
Thu, 15 Jun 2017 23:55:18 GMT

### Minor changes

- Removed new icons that were added recently

## 0.8.1
Thu, 15 Jun 2017 10:09:15 GMT

*Version update only*

## 0.8.0
Wed, 14 Jun 2017 06:02:15 GMT

### Minor changes

- Updating FabricConfig support to allow themes to be providable at bundle load time without weird race conditions.
- Updates to version 2.30 of the icon font

### Patches

- Remove high contrast adjust from common styles
- Enable strictNullChecks in utilities package

## 0.7.4
Tue, 13 Jun 2017 10:13:21 GMT

*Version update only*

## 0.7.3
Mon, 12 Jun 2017 01:47:18 GMT

### Patches

- Enable no implicit any in utilities package

## 0.7.2
Fri, 09 Jun 2017 10:10:47 GMT

### Patches

- Update the version of rtl-css-js used to get latest bug fixes

## 0.7.1
Thu, 08 Jun 2017 10:20:07 GMT

*Version update only*

## 0.7.0
Thu, 08 Jun 2017 00:18:05 GMT

### Minor changes

- ITheme: Make palette a required prop

## 0.6.1
Tue, 06 Jun 2017 07:41:47 GMT

*Version update only*

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

*Version update only*

## 0.4.2
Thu, 01 Jun 2017 16:34:03 GMT

*Version update only*

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

