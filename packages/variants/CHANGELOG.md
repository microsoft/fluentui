# Change Log - @uifabric/variants

This log was last generated on Tue, 04 Dec 2018 13:36:40 GMT and should not be manually modified.

## 6.14.0
Tue, 04 Dec 2018 13:36:40 GMT

### Minor changes

- DevExp: const enums are replaced with constants, this allows the use of isolatedModules mode of compilation

## 6.13.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- semantic slot value updates

## 6.12.0
Mon, 22 Oct 2018 12:29:57 GMT

### Minor changes

- Add addVariants utility function.

## 6.11.1
Mon, 08 Oct 2018 12:24:15 GMT

### Patches

- Moving tslint/prettier dependencies 

## 6.11.0
Mon, 01 Oct 2018 12:27:24 GMT

### Minor changes

- semantic slot value updates per design direction

## 6.10.0
Fri, 21 Sep 2018 14:25:46 GMT

### Minor changes

- Variants: export everything

### Patches

- Adding a version stamp file

## 6.9.0
Thu, 13 Sep 2018 17:38:04 GMT

### Minor changes

- Adds new semantic slots per design direction

## 6.8.0
Fri, 07 Sep 2018 16:29:48 GMT

### Minor changes

- Updates button slots with correct pre-fluent palette values and scss fallbacks

## 6.7.0
Thu, 06 Sep 2018 10:28:35 GMT

### Minor changes

- add buttonBackgroundDisabled semantic slot

## 6.6.0
Tue, 28 Aug 2018 10:23:58 GMT

### Minor changes

- fixes makeThemeFromPartials function to create theme in steps, so palette can be updated, then the updated palette informs the creation of the semantic slots, then the re st of the theme is filled in'

## 6.5.0
Tue, 21 Aug 2018 10:28:16 GMT

### Minor changes

- adds variantBorderHovered and emptyStateBackground semantic slots to theme and variants logic

## 6.4.0
Mon, 20 Aug 2018 10:26:10 GMT

### Minor changes

- removes opacity function and import from color utilities from variants.ts

## 6.3.0
Mon, 13 Aug 2018 03:43:25 GMT

### Minor changes

- adds opacity function to variants

## 6.2.0
Fri, 03 Aug 2018 10:25:59 GMT

### Minor changes

- add bodyStandoutBackground default values to variants

## 6.1.0
Thu, 02 Aug 2018 10:23:19 GMT

### Minor changes

- Add variantThemeType enums and utility function to apply variant theme

## 6.0.6
Mon, 23 Jul 2018 10:28:08 GMT

### Patches

- Variants: new designs for bodyFrameBackground

## 6.0.5
Tue, 03 Jul 2018 10:23:19 GMT

### Patches

- Bump variants and file-type-icons packages to restore amd build output

## 6.0.4
Thu, 14 Jun 2018 20:52:57 GMT

### Patches

- Fix broken documentation links

## 6.0.3
Thu, 07 Jun 2018 16:35:34 GMT

### Patches

- Variant Theming: update soft variant logic for better accessibility

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

