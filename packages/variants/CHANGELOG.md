# Change Log - @uifabric/variants

This log was last generated on Mon, 01 Oct 2018 11:24:38 GMT and should not be manually modified.

## 5.13.0
Mon, 01 Oct 2018 11:24:38 GMT

### Minor changes

- semantic slot value updates per design direction

## 5.12.0
Mon, 24 Sep 2018 11:27:12 GMT

### Minor changes

- Variants: export everything

## 5.11.0
Tue, 18 Sep 2018 11:25:16 GMT

### Minor changes

- Adds new semantic slots per design direction

## 5.10.0
Fri, 07 Sep 2018 01:32:10 GMT

### Minor changes

- Updates button slots with correct pre-fluent palette values and scss fallbacks
- add buttonBackgroundDisabled semantic slot

## 5.9.0
Tue, 28 Aug 2018 11:24:56 GMT

### Minor changes

- fixes makeThemeFromPartials function to create theme in steps, so palette can be updated, then the updated palette informs the creation of the semantic slots, then the re st of the theme is filled in'
- cherry picked for 5.0

## 5.8.0
Wed, 22 Aug 2018 11:23:37 GMT

### Minor changes

- adds variantBorderHovered and emptyStateBackground semantic slots to theme and variants logic

## 5.7.0
Tue, 21 Aug 2018 11:25:20 GMT

### Minor changes

- removes opacity function and import from color utilities from variants.ts

## 5.6.0
Sat, 11 Aug 2018 01:52:57 GMT

### Minor changes

- adds variantThemeType.ts and getVariant() function to variants.ts to handle variant control; adds changeOpacity() function to variants.ts to handle opacity control in semantic slot settings; adds semantic slots and fallback values to variants.ts

## 5.5.4
Mon, 16 Jul 2018 11:28:06 GMT

### Patches

- Variants: tweak background colors to look better in light and dark, and account for new semantic slots

## 5.5.3
Wed, 11 Jul 2018 13:26:02 GMT

### Patches

- Fix version

## 5.5.2
Thu, 24 May 2018 17:06:02 GMT

### Patches

- update variants algorithm for new semantic slot

## 5.5.1
Wed, 23 May 2018 10:28:50 GMT

### Patches

- Variants: update algorithm to match newest designs

## 5.5.0
Mon, 14 May 2018 10:14:42 GMT

### Minor changes

- have variants use OUFR instead of Styling as a dependency to ease bundling optimizations

## 5.4.0
Mon, 30 Apr 2018 10:16:44 GMT

### Minor changes

- Adds flags to theme to support controlling global class names

## 5.3.3
Mon, 16 Apr 2018 10:23:26 GMT

### Patches

- Removing module entry temporarily. (Will be added back in 6.0.)

## 5.3.2
Mon, 02 Apr 2018 22:15:06 GMT

### Patches

- Variants: improve algorithm for generating strong variant that better handles inversion

## 5.3.1
Thu, 29 Mar 2018 01:39:41 GMT

### Patches

- fix theme output from variants

## 5.3.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

## 5.2.0
Thu, 22 Mar 2018 10:14:03 GMT

### Minor changes

- add neutral variant

## 5.1.0
Mon, 19 Mar 2018 10:27:55 GMT

### Minor changes

- ThemePrimary: Updating this color along with an Office branding update.

### Patches

- fix imports so it works with amd

## 5.0.2
Wed, 14 Mar 2018 10:28:26 GMT

### Patches

- add a usage example to the readme

## 5.0.1
Mon, 12 Mar 2018 06:29:20 GMT

### Patches

- fix version for variants package
- update readme

## 5.11.2
Fri, 23 Feb 2018 03:05:53 GMT

*Initial release*

