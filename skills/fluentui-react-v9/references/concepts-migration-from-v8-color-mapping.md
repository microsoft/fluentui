# Color Mapping

The global and alias colors in v9 differ from those in the default v8 palette and theme. Here is our recommended mapping between v8 and v9 colors.

The team of designers and engineers considered several for each color choice:

- The closest color match in HSL (e.g. v8 neutralPrimaryAlt matches v9 grey[22])
- The semantic name match (e.g. v8 yellow matches v9 sharedColors.yellow.primary)
- The best intermediate colors in a ramp (e.g. v8 themeTertiary matches v9 brand[120])
- The best color and contrast perception (e.g. the choices for magenta of shade30, primary, and tint30)
- The holistic global colors defined in v9 (i.e. v9 colors are more neutral or cooler compared to v8)

We applied this mapping in the theme shim methods.

- The createV8Theme shim creates a v8 theme that closely matches v9.
- The createV9Theme shim creates v9 theme that closely matches v8.

v8 themes include an isInverted boolean to indicate they are a dark theme rather than a light theme, but v9 themes do not. The createV8Theme supports passing isDarkTheme to use inverted colors in the v8 palette.

## Neutral Colors

### v8 Palette

### v9 Global

palette

black

value

#000000

global

black

value

#000000

palette

blackTranslucent40

value

rgba(0,0,0,.4)

global

blackAlpha[40]

value

rgba(0, 0, 0, 0.4)

palette

neutralDark

value

#201f1e

global

grey[8]

value

#141414

palette

neutralPrimary

value

#323130

global

grey[14]

value

#242424

palette

neutralPrimaryAlt

value

#3b3a39

global

grey[22]

value

#383838

palette

neutralSecondary

value

#605e5c

global

grey[36]

value

#5c5c5c

palette

neutralSecondaryAlt

value

#8a8886

global

grey[52]

value

#858585

palette

neutralTertiary

value

#a19f9d

global

grey[62]

value

#9e9e9e

palette

neutralTertiaryAlt

value

#c8c6c4

global

grey[78]

value

#c7c7c7

palette

neutralQuaternary

value

#d2d0ce

global

grey[82]

value

#d1d1d1

palette

neutralQuaternaryAlt

value

#e1dfdd

global

grey[88]

value

#e0e0e0

palette

neutralLight

value

#edebe9

global

grey[92]

value

#ebebeb

palette

neutralLighter

value

#f3f2f1

global

grey[96]

value

#f5f5f5

palette

neutralLighterAlt

value

#faf9f8

global

grey[98]

value

#fafafa

palette

accent

value

#0078d4

global

brand[80]

value

#0f6cbd

palette

white

value

#ffffff

global

white

value

#ffffff

palette

whiteTranslucent40

value

rgba(255,255,255,.4)

global

whiteAlpha[40]

value

rgba(255, 255, 255, 0.4)

## Neutral Colors (inverted)

### v8 Palette

### v9 Global

palette

black

value

#000000

global

white

value

#ffffff

palette

blackTranslucent40

value

rgba(0,0,0,.4)

global

whieAlpha[40]

value

whieAlpha[40]

palette

neutralDark

value

#201f1e

global

grey[98]

value

#fafafa

palette

neutralPrimary

value

#323130

global

grey[96]

value

#f5f5f5

palette

neutralPrimaryAlt

value

#3b3a39

global

grey[94]

value

#f0f0f0

palette

neutralSecondary

value

#605e5c

global

grey[82]

value

#d1d1d1

palette

neutralSecondaryAlt

value

#8a8886

global

grey[74]

value

#bdbdbd

palette

neutralTertiary

value

#a19f9d

global

grey[44]

value

#707070

palette

neutralTertiaryAlt

value

#c8c6c4

global

grey[26]

value

#424242

palette

neutralQuaternary

value

#d2d0ce

global

grey[24]

value

#3d3d3d

palette

neutralQuaternaryAlt

value

#e1dfdd

global

grey[18]

value

#2e2e2e

palette

neutralLight

value

#edebe9

global

grey[16]

value

#292929

palette

neutralLighter

value

#f3f2f1

global

grey[14]

value

#242424

palette

neutralLighterAlt

value

#faf9f8

global

grey[10]

value

#1a1a1a

palette

accent

value

#0078d4

global

brand[90]

value

#2886de

palette

white

value

#ffffff

global

black

value

#000000

palette

whiteTranslucent40

value

rgba(255,255,255,.4)

global

blackAlpha[40]

value

rgba(0, 0, 0, 0.4)

## Brand Colors

### v8 Palette

### v9 Global

palette

themeDarker

value

#004578

global

brand[40]

value

#0c3b5e

palette

themeDark

value

#005a9e

global

brand[60]

value

#0f548c

palette

themeDarkAlt

value

#106ebe

global

brand[70]

value

#115ea3

palette

themePrimary

value

#0078d4

global

brand[80]

value

#0f6cbd

palette

themeSecondary

value

#2b88d8

global

brand[90]

value

#2886de

palette

themeTertiary

value

#71afe5

global

brand[120]

value

#77b7f7

palette

themeLight

value

#c7e0f4

global

brand[140]

value

#b4d6fa

palette

themeLighter

value

#deecf9

global

brand[150]

value

#cfe4fa

palette

themeLighterAlt

value

#eff6fc

global

brand[160]

value

#ebf3fc

## Brand Colors (inverted)

### v8 Palette

### v9 Global

palette

themeDarker

value

#004578

global

brand[110]

value

#62abf5

palette

themeDark

value

#005a9e

global

brand[100]

value

#479ef5

palette

themeDarkAlt

value

#106ebe

global

brand[100]

value

#479ef5

palette

themePrimary

value

#0078d4

global

brand[90]

value

#2886de

palette

themeSecondary

value

#2b88d8

global

brand[90]

value

#2886de

palette

themeTertiary

value

#71afe5

global

brand[60]

value

#0f548c

palette

themeLight

value

#c7e0f4

global

brand[50]

value

#0e4775

palette

themeLighter

value

#deecf9

global

brand[40]

value

#0c3b5e

palette

themeLighterAlt

value

#eff6fc

global

brand[30]

value

#0a2e4a

## Semantic Colors

### v8 Semantic

### v9 Alias

semantic

accentButtonBackground

palette

palette.themePrimary

value

#0078d4

alias

colorBrandBackground

global

brand[80]

value

#0f6cbd

//

Used by Button when appearance=primary.

semantic

accentButtonText

palette

palette.white

value

#ffffff

alias

colorNeutralForegroundOnBrand

global

white

value

#ffffff

//

Used by Button when appearance=primary.

semantic

actionLink

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

semantic

actionLinkHovered

palette

palette.neutralDark

value

#201f1e

alias

colorNeutralForeground1Hover

global

grey[14]

value

#242424

semantic

bodyBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

semantic

bodyBackgroundChecked

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1Selected

global

grey[92]

value

#ebebeb

//

Used by ToggleButton when checked.

semantic

bodyBackgroundHovered

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Used by ToggleButton when hovered.

semantic

bodyDivider

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralStroke2

global

grey[88]

value

#e0e0e0

//

Used by Divider for the line

semantic

bodyFrameBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

semantic

bodyFrameDivider

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralStroke2

global

grey[88]

value

#e0e0e0

//

Used by Divider for the line

semantic

bodyStandoutBackground

palette

palette.neutralLighterAlt

value

#faf9f8

alias

colorNeutralBackground2

global

grey[98]

value

#fafafa

//

Closest color match

semantic

bodySubtext

palette

palette.neutralSecondary

value

#605e5c

alias

colorNeutralForeground2

global

grey[26]

value

#424242

//

Used by CompoundButton for secondary content.

semantic

bodyText

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

semantic

bodyTextChecked

palette

palette.black

value

#000000

alias

colorNeutralForeground1Selected

global

grey[14]

value

#242424

//

Not used in v9 yet, but seems like best name match.

semantic

buttonBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

//

Used by Button

semantic

buttonBackgroundChecked

palette

palette.neutralTertiaryAlt

value

#c8c6c4

alias

colorNeutralBackground1Selected

global

grey[92]

value

#ebebeb

//

Used by ToggleButton when checked

semantic

buttonBackgroundCheckedHovered

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Used by ToggleButton when hovered. No hover+selected color in v9.

semantic

buttonBackgroundDisabled

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackgroundDisabled

global

grey[94]

value

#f0f0f0

//

Used by Button when disabled

semantic

buttonBackgroundHovered

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Used by Button when hovered

semantic

buttonBackgroundPressed

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1Pressed

global

grey[88]

value

#e0e0e0

//

Used by Button when active

semantic

buttonBorder

palette

palette.neutralSecondaryAlt

value

#8a8886

alias

colorNeutralStroke1

global

grey[82]

value

#d1d1d1

//

Used by Button

semantic

buttonBorderDisabled

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralStrokeDisabled

global

grey[88]

value

#e0e0e0

//

Used by Button when disabled

semantic

buttonText

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by Button

semantic

buttonTextChecked

palette

palette.neutralDark

value

#201f1e

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by ToggleButton when checked

semantic

buttonTextCheckedHovered

palette

palette.black

value

#000000

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by ToggleButton when hovered. No hover+selected color in v9.

semantic

buttonTextDisabled

palette

palette.neutralTertiary

value

#a19f9d

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by Button when disabled

semantic

buttonTextHovered

palette

palette.neutralDark

value

#201f1e

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by Button when hovered

semantic

buttonTextPressed

palette

palette.neutralDark

value

#201f1e

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by Button when active

semantic

cardStandoutBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

//

Used by Card.

semantic

defaultStateBackground

palette

palette.neutralLighterAlt

value

#faf9f8

alias

colorNeutralBackground2

global

grey[98]

value

#fafafa

//

Closest color match.

semantic

disabledBackground

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackgroundDisabled

global

grey[94]

value

#f0f0f0

//

Used by multiple components when disabled.

semantic

disabledBodySubtext

palette

palette.neutralTertiaryAlt

value

#c8c6c4

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by multiple components when disabled. No secondary disabled color in v9.

semantic

disabledBodyText

palette

palette.neutralTertiary

value

#a19f9d

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by multiple components when disabled.

semantic

disabledBorder

palette

palette.neutralTertiaryAlt

value

#c8c6c4

alias

colorNeutralStrokeDisabled

global

grey[88]

value

#e0e0e0

//

Used by multiple components when disabled.

semantic

disabledSubtext

palette

palette.neutralQuaternary

value

#d2d0ce

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by multiple components when disabled. No secondary disabled color in v9.

semantic

disabledText

palette

palette.neutralTertiary

value

#a19f9d

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by multiple components when disabled.

semantic

focusBorder

palette

palette.neutralSecondary

value

#605e5c

alias

colorStrokeFocus2

global

black

value

#000000

//

Used by multiple components for outline.

semantic

inputBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

//

Used by Input.

semantic

inputBackgroundChecked

palette

palette.themePrimary

value

#0078d4

alias

colorCompoundBrandBackground

global

brand[80]

value

#0f6cbd

//

Used by Checkbox when checked.

semantic

inputBackgroundCheckedHovered

palette

palette.themeDark

value

#005a9e

alias

colorCompoundBrandBackgroundHover

global

brand[70]

value

#115ea3

//

Used by Checkbox when checked and hovered.

semantic

inputBorder

palette

palette.neutralSecondary

value

#605e5c

alias

colorNeutralStrokeAccessible

global

grey[38]

value

#616161

//

Used by Input.

semantic

inputBorderHovered

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralStrokeAccessibleHover

global

grey[34]

value

#575757

//

Used by Input when hovered.

semantic

inputFocusBorderAlt

palette

palette.themePrimary

value

#0078d4

alias

colorCompoundBrandStroke

global

brand[80]

value

#0f6cbd

//

Used by input when interactive.

semantic

inputForegroundChecked

palette

palette.white

value

#ffffff

alias

colorNeutralForegroundOnBrand

global

white

value

#ffffff

//

Used by Checkbox when checked.

semantic

inputIcon

palette

palette.themePrimary

value

#0078d4

alias

colorNeutralForeground3

global

grey[38]

value

#616161

//

Used by Input for content (includes icon).

semantic

inputIconDisabled

palette

palette.neutralTertiary

value

#a19f9d

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by Input for content (includes icon).

semantic

inputIconHovered

palette

palette.themeDark

value

#005a9e

alias

colorNeutralForeground3

global

grey[38]

value

#616161

//

Used by Input for content (includes icon). v9 does not apply a specific style for content when hovered.

semantic

inputPlaceholderBackgroundChecked

palette

palette.themeLighter

value

#deecf9

alias

colorBrandBackgroundInvertedSelected

global

brand[150]

value

#cfe4fa

//

Color match.

semantic

inputPlaceholderText

palette

palette.neutralSecondary

value

#605e5c

alias

colorNeutralForeground4

global

grey[44]

value

#707070

//

Used by Input.

semantic

inputText

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by Input.

semantic

inputTextHovered

palette

palette.neutralDark

value

#201f1e

alias

colorNeutralForeground1Hover

global

grey[14]

value

#242424

//

Closest name match. v9 Input does not apply a specific style to text when hovered.

semantic

link

palette

palette.themePrimary

value

#0078d4

alias

colorBrandForegroundLink

global

brand[70]

value

#115ea3

//

Used by Link.

semantic

linkHovered

palette

palette.themeDarker

value

#004578

alias

colorBrandForegroundLinkHover

global

brand[60]

value

#0f548c

//

Used by Link when hovered.

semantic

listBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

//

Closest color match

semantic

listHeaderBackgroundHovered

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Closest name and color match.

semantic

listHeaderBackgroundPressed

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1Pressed

global

grey[88]

value

#e0e0e0

//

Closest name and color match.

semantic

listItemBackgroundChecked

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1Selected

global

grey[92]

value

#ebebeb

//

Closest name and color match.

semantic

listItemBackgroundCheckedHovered

palette

palette.neutralQuaternaryAlt

value

#e1dfdd

alias

colorNeutralBackground1Selected

global

grey[92]

value

#ebebeb

//

Closest name match.

semantic

listItemBackgroundHovered

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Closest name and color match.

semantic

listText

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Closest color match.

semantic

listTextColor

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Closest color match.

semantic

menuBackground

palette

palette.white

value

#ffffff

alias

colorNeutralBackground1

global

white

value

#ffffff

//

Used by MenuItem. v9 does not apply a background for Menu or MenuList.

semantic

menuDivider

palette

palette.neutralTertiaryAlt

value

#c8c6c4

alias

colorNeutralStroke2

global

grey[88]

value

#e0e0e0

//

Used by MenuItem.

semantic

menuHeader

palette

palette.themePrimary

value

#0078d4

alias

colorNeutralForeground3

global

grey[38]

value

#616161

//

Used by MenuItem. v9 does not apply brand color to menu group headers.

semantic

menuIcon

palette

palette.themePrimary

value

#0078d4

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by MenuItem. v9 does not apply brand color to icons.

semantic

menuItemBackgroundChecked

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1

global

white

value

#ffffff

//

Used by MenuItemCheckbox when check. v9 does not change the background when checked.

semantic

menuItemBackgroundHovered

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Used by MenuItem.

semantic

menuItemBackgroundPressed

palette

palette.neutralLight

value

#edebe9

alias

colorNeutralBackground1Hover

global

grey[96]

value

#f5f5f5

//

Used by MenuItem when active. v9 does not change the background when active and uses the hover color.

semantic

menuItemText

palette

palette.neutralPrimary

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Used by MenuItem.

semantic

menuItemTextHovered

palette

palette.neutralDark

value

#201f1e

alias

colorNeutralForeground2Hover

global

grey[14]

value

#242424

//

Used by MenuItem when hovered.

semantic

messageLink

palette

#005A9E

value

#005A9E

alias

colorBrandForegroundLink

global

brand[70]

value

#115ea3

//

Used by Link.

semantic

messageLinkHovered

palette

#004578

value

#004578

alias

colorBrandForegroundLinkHover

global

brand[60]

value

#0f548c

//

Used by Link.

semantic

messageText

palette

#323130

value

#323130

alias

colorNeutralForeground1

global

grey[14]

value

#242424

//

Closest color match.

semantic

primaryButtonBackground

palette

palette.themePrimary

value

#0078d4

alias

colorBrandBackground

global

brand[80]

value

#0f6cbd

//

Used by Button when appearance=primary.

semantic

primaryButtonBackgroundDisabled

palette

palette.neutralLighter

value

#f3f2f1

alias

colorNeutralBackgroundDisabled

global

grey[94]

value

#f0f0f0

//

Used by Button when disabled. v9 does not specifically style appearance=primary and disabled.

semantic

primaryButtonBackgroundHovered

palette

palette.themeDarkAlt

value

#106ebe

alias

colorBrandBackgroundHover

global

brand[70]

value

#115ea3

//

Used by Button when appearance=primary and hovered.

semantic

primaryButtonBackgroundPressed

palette

palette.themeDark

value

#005a9e

alias

colorBrandBackgroundPressed

global

brand[40]

value

#0c3b5e

//

Used by Button when appearance=primary and active.

semantic

primaryButtonBorder

palette

transparent

value

transparent

alias

colorTransparentStroke

global

transparent

value

transparent

//

Used by Button when appearance=primary.

semantic

primaryButtonText

palette

palette.white

value

#ffffff

alias

colorNeutralForegroundOnBrand

global

white

value

#ffffff

//

Used by Button when appearance=primary.

semantic

primaryButtonTextDisabled

palette

palette.neutralQuaternary

value

#d2d0ce

alias

colorNeutralForegroundDisabled

global

grey[74]

value

#bdbdbd

//

Used by Button when disabled. v9 does not specifically style appearance=primary and disabled.

semantic

primaryButtonTextHovered

palette

palette.white

value

#ffffff

alias

colorNeutralForegroundOnBrand

global

white

value

#ffffff

//

Used by Button when appearance=primary and hovered.

semantic

primaryButtonTextPressed

palette

palette.white

value

#ffffff

alias

colorNeutralForegroundOnBrand

global

white

value

#ffffff

//

Used by Button when appearance=primary and active.

## Named Colors

### v8 Palette

### v9 Global

palette

yellowDark

value

#d29200

global

sharedColors.marigold.shade10

value

#d39300

//

Closest color match. Marigold is darker yellow moving toward orange.

palette

yellow

value

#ffb900

global

sharedColors.yellow.primary

value

#fde300

//

Name match

palette

yellowLight

value

#fff100

global

sharedColors.yellow.tint40

value

#fef7b2

//

Name match tinted light.

palette

orange

value

#d83b01

global

sharedColors.orange.primary

value

#f7630c

//

Name match.

palette

orangeLight

value

#ea4300

global

sharedColors.orange.tint20

value

#f98845

//

Name match tinted light.

palette

orangeLighter

value

#ff8c00

global

sharedColors.orange.tint40

value

#fdcfb4

//

Name match tinted lighter.

palette

redDark

value

#a4262c

global

sharedColors.darkRed.primary

value

#750b1c

//

Name match

palette

red

value

#e81123

global

sharedColors.red.primary

value

#d13438

//

Name match. v9 does not have a closer color match.

palette

magentaDark

value

#5c005c

global

sharedColors.magenta.shade30

value

#6b0043

//

Magenta shaded dark.

palette

magenta

value

#b4009e

global

sharedColors.magenta.primary

value

#bf0077

//

Name match.

palette

magentaLight

value

#e3008c

global

sharedColors.magenta.tint30

value

#d957a8

//

Magenta tinted light.

palette

purpleDark

value

#32145a

global

sharedColors.darkPurple.primary

value

#401b6c

//

Name match.

palette

purple

value

#5c2d91

global

sharedColors.purple.primary

value

#5c2e91

//

Name and color match.

palette

purpleLight

value

#b4a0ff

global

sharedColors.purple.tint40

value

#c6b1de

//

Name match tinted light.

palette

blueDark

value

#002050

global

sharedColors.darkBlue.primary

value

#003966

//

Name match.

palette

blueMid

value

#00188f

global

sharedColors.royalBlue.primary

value

#004e8c

//

Closest match between darkBlue and blue.

palette

blue

value

#0078d4

global

sharedColors.blue.primary

value

#0078d4

//

Name and color match.

palette

blueLight

value

#00bcf2

global

sharedColors.lightBlue.primary

value

#3a96dd

//

Name match.

palette

tealDark

value

#004b50

global

sharedColors.darkTeal.primary

value

#006666

//

Name match.

palette

teal

value

#008272

global

sharedColors.teal.primary

value

#038387

//

Name match

palette

tealLight

value

#00b294

global

sharedColors.lightTeal.primary

value

#00b7c3

//

Name match

palette

greenDark

value

#004b1c

global

sharedColors.darkGreen.primary

value

#0b6a0b

//

Name match.

palette

green

value

#107c10

global

sharedColors.green.primary

value

#107c10

//

Name and color match.

palette

greenLight

value

#bad80a

global

sharedColors.lightGreen.primary

value

#13a10e

//

Name match.
