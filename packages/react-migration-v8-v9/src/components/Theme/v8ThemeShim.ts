import { createTheme, DefaultPalette } from '@fluentui/react';
import type { IPalette, ISemanticColors, IFontStyles, IFontWeight, IEffects, Theme as ThemeV8 } from '@fluentui/react';

import { BrandVariants, Theme as ThemeV9 } from '@fluentui/react-components';

import { getBasePickerStyles } from './componentStyles/BasePicker.styles';
import { getBreadcrumbStyles } from './componentStyles/Breadcrumb.styles';
import { getDefaultButtonStyles, getIconButtonStyles } from './componentStyles/Button.styles';
import { getCalloutContentStyles } from './componentStyles/Callout.styles';
import { getCheckboxStyles, getM365CheckboxStyles } from './componentStyles/Checkbox.styles';
import { getChoiceGroupStyles, getM365ChoiceGroupStyles } from './componentStyles/ChoiceGroup.styles';
import { getChoiceGroupOptionStyles } from './componentStyles/ChoiceGroupOption.styles';
import { getColorPickerGridCellStyles } from './componentStyles/ColorPickerGridStyles.styles';
import { getCommandBarStyles } from './componentStyles/CommandBar.styles';
import { getCommandBarButtonStyles } from './componentStyles/CommandBarButton.styles';
import { getContextualMenuStyles } from './componentStyles/ContextualMenu.styles';
import { getDialogContentStyles, getDialogStyles } from './componentStyles/Dialog.styles';
import { getDropdownStyles } from './componentStyles/Dropdown.styles';
import { getMessageBarStyles } from './componentStyles/MessageBar.styles';
import { getModalStyles } from './componentStyles/Modal.styles';
import { getPivotStyles } from './componentStyles/Pivot.styles';
import { getSearchBoxStyles } from './componentStyles/SearchBox.styles';
import { getSliderStyles } from './componentStyles/Slider.styles';
import { getSpinButtonStyles } from './componentStyles/SpinButton.styles';
import { getSpinnerStyles } from './componentStyles/Spinner.styles';
import { getTagItemStyles } from './componentStyles/TagItem.styles';
import { getTextFieldStyles } from './componentStyles/TextField.styles';
import { getToggleStyles } from './componentStyles/Toggle.styles';

import { black, blackAlpha, grey, sharedColors, white, whiteAlpha } from './themeDuplicates';

const mappedNeutrals = {
  black,
  blackTranslucent40: blackAlpha[40],
  neutralDark: grey[8],
  neutralPrimary: grey[14],
  neutralPrimaryAlt: grey[22],
  neutralSecondary: grey[36],
  neutralSecondaryAlt: grey[52],
  neutralTertiary: grey[62],
  neutralTertiaryAlt: grey[78],
  neutralQuaternary: grey[82],
  neutralQuaternaryAlt: grey[88],
  neutralLight: grey[92],
  neutralLighter: grey[96],
  neutralLighterAlt: grey[98],
  white,
  whiteTranslucent40: whiteAlpha[40],
};

const invertedMappedNeutrals = {
  black: white,
  blackTranslucent40: whiteAlpha[40],
  neutralDark: grey[98],
  neutralPrimary: grey[96],
  neutralPrimaryAlt: grey[84],
  neutralSecondary: grey[82],
  neutralSecondaryAlt: grey[74],
  neutralTertiary: grey[44],
  neutralTertiaryAlt: grey[26],
  neutralQuaternary: grey[24],
  neutralQuaternaryAlt: grey[18],
  neutralLight: grey[16],
  neutralLighter: grey[14],
  neutralLighterAlt: grey[10],
  white: black,
  whiteTranslucent40: blackAlpha[40],
};

const mappedSharedColors = {
  yellowDark: sharedColors.marigold.shade10,
  yellow: sharedColors.yellow.primary,
  yellowLight: sharedColors.yellow.tint40,
  orange: sharedColors.orange.primary,
  orangeLight: sharedColors.orange.tint20,
  orangeLighter: sharedColors.orange.tint40,
  redDark: sharedColors.darkRed.primary,
  red: sharedColors.red.primary,
  magentaDark: sharedColors.magenta.shade30,
  magenta: sharedColors.magenta.primary,
  magentaLight: sharedColors.magenta.tint30,
  purpleDark: sharedColors.darkPurple.primary,
  purple: sharedColors.purple.primary,
  purpleLight: sharedColors.purple.tint40,
  blueDark: sharedColors.darkBlue.primary,
  blueMid: sharedColors.royalBlue.primary,
  blue: sharedColors.blue.primary,
  blueLight: sharedColors.lightBlue.primary,
  tealDark: sharedColors.darkTeal.primary,
  teal: sharedColors.teal.primary,
  tealLight: sharedColors.lightTeal.primary,
  greenDark: sharedColors.darkGreen.primary,
  green: sharedColors.green.primary,
  greenLight: sharedColors.lightGreen.primary,
};

/**
 * Creates a v8 palette given a brand ramp
 */
const mapPalette = (brandColors: BrandVariants, inverted: boolean): IPalette => {
  const neutrals = inverted ? invertedMappedNeutrals : mappedNeutrals;
  const brands = inverted
    ? {
        themeDarker: brandColors[110],
        themeDark: brandColors[100],
        themeDarkAlt: brandColors[100],
        themePrimary: brandColors[90],
        themeSecondary: brandColors[90],
        themeTertiary: brandColors[60],
        themeLight: brandColors[50],
        themeLighter: brandColors[40],
        themeLighterAlt: brandColors[30],
      }
    : {
        themeDarker: brandColors[40],
        themeDark: brandColors[60],
        themeDarkAlt: brandColors[70],
        themePrimary: brandColors[80],
        themeSecondary: brandColors[90],
        themeTertiary: brandColors[120],
        themeLight: brandColors[140],
        themeLighter: brandColors[150],
        themeLighterAlt: brandColors[160],
      };

  return {
    ...DefaultPalette,
    ...neutrals,
    accent: brands.themePrimary,
    ...mappedSharedColors,
    ...brands,
  };
};

/**
 * Returns v9 theme colors overlaid on a base set of v8 semantic colors
 */
const mapSemanticColors = (baseColors: ISemanticColors, v8Palette: IPalette, isDarkTheme: boolean): ISemanticColors => {
  const p = v8Palette;

  if (!isDarkTheme) {
    return {
      ...baseColors,
      inputBorder: p.neutralQuaternary,

      // Checkbox
      inputBackgroundChecked: p.themePrimary,
      inputBackground: p.white,
      bodyTextChecked: p.neutralPrimary,
      inputBackgroundCheckedHovered: p.themeDarkAlt,

      // Errors and warnings
      warningText: p.neutralPrimary,

      // Message bar colors
      messageText: p.neutralPrimary,
      messageLink: p.themeDarkAlt,
      messageLinkHovered: p.themeDarker,
      infoIcon: p.neutralSecondary,
      warningIcon: p.neutralPrimary,
      infoBackground: p.neutralLighter,
    };
  } else {
    return {
      ...baseColors,
      primaryButtonText: p.black,
      primaryButtonTextHovered: p.black,
      primaryButtonTextPressed: p.black,
      primaryButtonTextDisabled: p.neutralTertiaryAlt,
      primaryButtonBackgroundDisabled: p.neutralLighter,
      accentButtonText: p.black,
      accentButtonBackground: p.themePrimary,
      inputPlaceholderText: p.neutralSecondaryAlt,
      inputForegroundChecked: p.black,
      inputBorder: p.neutralQuaternary,
    };
  }
};

/**
 * Overlays v9 fonts on a set of base v8 fonts.
 */
const mapFonts = (baseFonts: IFontStyles, theme: ThemeV9): IFontStyles => {
  return {
    ...baseFonts,
    tiny: {
      ...baseFonts.tiny,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase100,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    xSmall: {
      ...baseFonts.xSmall,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase100,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    small: {
      ...baseFonts.small,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase200,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    smallPlus: {
      ...baseFonts.smallPlus,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase200,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    medium: {
      ...baseFonts.medium,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase300,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    mediumPlus: {
      ...baseFonts.mediumPlus,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase400,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    large: {
      ...baseFonts.large,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase400,
      fontWeight: theme.fontWeightRegular as IFontWeight,
    },
    xLarge: {
      ...baseFonts.xxLarge,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeBase500,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
    xxLarge: {
      ...baseFonts.xxLarge,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeHero700,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
    superLarge: {
      ...baseFonts.superLarge,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeHero900,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
    mega: {
      ...baseFonts.mega,
      fontFamily: theme.fontFamilyBase,
      fontSize: theme.fontSizeHero1000,
      fontWeight: theme.fontWeightSemibold as IFontWeight,
    },
  };
};

import type { ISettings } from '@fluentui/react';

const getV9ComponentStyles: { [key: string]: ISettings } = {
  Breadcrumb: {
    styles: getBreadcrumbStyles,
  },
  CalloutContent: {
    styles: getCalloutContentStyles,
  },
  Checkbox: {
    styles: getCheckboxStyles,
  },
  ChoiceGroup: {
    styles: getChoiceGroupStyles,
  },
  ChoiceGroupOption: {
    styles: getChoiceGroupOptionStyles,
  },
  ColorPickerGridCell: {
    styles: getColorPickerGridCellStyles,
  },
  CommandBar: {
    styles: getCommandBarStyles,
  },
  CommandBarButton: {
    styles: getCommandBarButtonStyles,
  },
  CompoundButton: {
    styles: getDefaultButtonStyles,
  },
  ContextualMenu: {
    styles: getContextualMenuStyles,
  },
  DefaultButton: {
    styles: getDefaultButtonStyles,
  },
  Dialog: {
    styles: getDialogStyles,
  },
  DialogContent: {
    styles: getDialogContentStyles,
  },
  Dropdown: {
    styles: getDropdownStyles,
  },
  IconButton: {
    styles: getIconButtonStyles,
  },
  M365Checkbox: {
    styles: getM365CheckboxStyles,
  },
  M365ChoiceGroup: {
    styles: getM365ChoiceGroupStyles,
  },
  MessageBar: {
    styles: getMessageBarStyles,
  },
  Modal: {
    styles: getModalStyles,
  },
  Pivot: {
    styles: getPivotStyles,
  },
  // People Pickers
  NormalPeoplePicker: {
    styles: getBasePickerStyles,
  },
  CompactPeoplePicker: {
    styles: getBasePickerStyles,
  },
  ListPeoplePickerBase: {
    styles: getBasePickerStyles,
  },
  SearchBox: {
    styles: getSearchBoxStyles,
  },
  Slider: {
    styles: getSliderStyles,
  },
  SpinButton: {
    styles: getSpinButtonStyles,
  },
  Spinner: {
    styles: getSpinnerStyles,
  },
  TagItem: {
    styles: getTagItemStyles,
  },
  TagPicker: {
    styles: getBasePickerStyles,
  },
  Tag: {
    styles: getTagItemStyles,
  },
  TextField: {
    styles: getTextFieldStyles,
  },
  Toggle: {
    styles: getToggleStyles,
  },
};

/**
 * Overlays v9 shadows and border radii on a base set of v8 effects.
 */
const mapEffects = (baseEffects: IEffects, theme: ThemeV9): IEffects => {
  return {
    ...baseEffects,
    elevation4: theme.shadow4,
    elevation8: theme.shadow8,
    elevation16: theme.shadow16,
    elevation64: theme.shadow64,
    roundedCorner2: theme.borderRadiusSmall,
    roundedCorner4: theme.borderRadiusMedium,
    roundedCorner6: theme.borderRadiusLarge,
  };
};

/**
 * Creates a v8 theme from v9 brand colors and theme.
 * You can optionally pass a v8 base theme.
 * Otherwise the default v8 theme is used.
 *
 * The v9 colors, fonts, and effects are applied on top of the v8 theme
 * to allow v8 components to look as much like v9 components as possible.
 */
export const createV8Theme = (
  brandColors: BrandVariants,
  themeV9: ThemeV9,
  isDarkTheme: boolean = false,
  themeV8?: ThemeV8,
): ThemeV8 => {
  const palette = mapPalette(brandColors, isDarkTheme);
  const baseTheme =
    themeV8 || createTheme({ isInverted: isDarkTheme, palette: palette, components: getV9ComponentStyles });

  return {
    ...baseTheme,
    semanticColors: mapSemanticColors(baseTheme.semanticColors, palette, isDarkTheme),
    fonts: mapFonts(baseTheme.fonts, themeV9),
    effects: mapEffects(baseTheme.effects, themeV9),
    isInverted: isDarkTheme || themeV8?.isInverted === true,
  };
};
