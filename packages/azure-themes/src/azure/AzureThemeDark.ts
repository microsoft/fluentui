import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, DarkSemanticColors } from './AzureColors';
import { IExtendedSemanticColors } from './IExtendedSemanticColors';

const darkExtendedSemanticColors: Partial<IExtendedSemanticColors> = {
  bodyBackground: DarkSemanticColors.background,
  bodyText: DarkSemanticColors.text.body,
  bodyDivider: CommonSemanticColors.dividers.lineSeparator,
  buttonBackground: DarkSemanticColors.secondaryButton.rest.background,
  buttonBackgroundChecked: DarkSemanticColors.secondaryButton.pressed.background,
  buttonBackgroundCheckedHovered: DarkSemanticColors.secondaryButton.hover.background,
  buttonBackgroundDisabled: DarkSemanticColors.disabledButton.background,
  buttonBackgroundHovered: DarkSemanticColors.secondaryButton.hover.background,
  buttonBackgroundPressed: DarkSemanticColors.secondaryButton.pressed.background,
  buttonText: DarkSemanticColors.secondaryButton.rest.border,
  buttonTextChecked: DarkSemanticColors.secondaryButton.pressed.border,
  buttonTextCheckedHovered: DarkSemanticColors.secondaryButton.hover.border,
  buttonTextDisabled: DarkSemanticColors.disabledButton.text,
  buttonTextHovered: DarkSemanticColors.secondaryButton.hover.border,
  buttonTextPressed: DarkSemanticColors.secondaryButton.pressed.border,
  disabledBackground: CommonSemanticColors.backgrounds.disabled,
  disabledBodyText: DarkSemanticColors.text.disabled,
  errorBackground: DarkSemanticColors.controlOutlines.error,
  errorText: DarkSemanticColors.text.error,
  focusBorder: DarkSemanticColors.controlOutlines.accent,
  inputBackground: DarkSemanticColors.background,
  inputText: DarkSemanticColors.text.value,
  inputBorder: CommonSemanticColors.textControlOutline.rest,
  inputBorderHovered: CommonSemanticColors.textControlOutline.hover,
  inputPlaceholderText: DarkSemanticColors.text.placeholder,
  link: DarkSemanticColors.controlOutlines.accent,
  linkHovered: DarkSemanticColors.controlOutlines.accent,
  listBackground: DarkSemanticColors.background,
  listHeaderBackgroundPressed: DarkSemanticColors.item.hover,
  listItemBackgroundChecked: DarkSemanticColors.item.select,
  listItemBackgroundCheckedHovered: DarkSemanticColors.item.select,
  listItemBackgroundHovered: DarkSemanticColors.item.hover,
  listText: DarkSemanticColors.text.body,
  menuItemBackgroundHovered: DarkSemanticColors.item.hover,
  menuItemBackgroundPressed: DarkSemanticColors.item.select,
  primaryButtonBackground: DarkSemanticColors.primaryButton.rest.background,
  primaryButtonBackgroundDisabled: DarkSemanticColors.disabledButton.background,
  primaryButtonBackgroundHovered: DarkSemanticColors.primaryButton.hover.background,
  primaryButtonBackgroundPressed: DarkSemanticColors.primaryButton.pressed.background,
  primaryButtonText: DarkSemanticColors.primaryButton.rest.text,
  primaryButtonTextDisabled: DarkSemanticColors.disabledButton.text,
  primaryButtonTextHovered: DarkSemanticColors.primaryButton.hover.text,
  primaryButtonTextPressed: DarkSemanticColors.primaryButton.pressed.text,
  variantBorder: CommonSemanticColors.dividers.lineSeparator,
  // extended
  controlAccent: DarkSemanticColors.controlOutlines.accent,
  controlOutline: DarkSemanticColors.controlOutlines.rest,
  controlOutlineDisabled: DarkSemanticColors.controlOutlines.disabled,
  controlOutlineHovered: DarkSemanticColors.controlOutlines.hover,
  labelText: DarkSemanticColors.text.label
};

export const AzureThemeDark: ITheme = createTheme({
  palette: {
    themePrimary: DarkSemanticColors.controlOutlines.accent,
    neutralDark: DarkSemanticColors.text.body,
    neutralLight: DarkSemanticColors.item.hover, // shimmer elements
    neutralLighter: DarkSemanticColors.item.hover, // shimmer elements
    neutralQuaternaryAlt: DarkSemanticColors.item.select, // expand button on list controls
    white: DarkSemanticColors.background // shimmer elements
  },
  semanticColors: darkExtendedSemanticColors
});
