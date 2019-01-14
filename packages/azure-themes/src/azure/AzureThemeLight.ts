import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, LightSemanticColors } from './AzureColors';
import { IExtendedSemanticColors } from './IExtendedSemanticColors';

const lightExtendedSemanticColors: Partial<IExtendedSemanticColors> = {
  bodyBackground: LightSemanticColors.background,
  bodyText: LightSemanticColors.text.body,
  bodyDivider: CommonSemanticColors.dividers.lineSeparator,
  buttonBackground: LightSemanticColors.secondaryButton.rest.background,
  buttonBackgroundChecked: LightSemanticColors.secondaryButton.pressed.background,
  buttonBackgroundCheckedHovered: LightSemanticColors.secondaryButton.hover.background,
  buttonBackgroundDisabled: LightSemanticColors.disabledButton.background,
  buttonBackgroundHovered: LightSemanticColors.secondaryButton.hover.background,
  buttonBackgroundPressed: LightSemanticColors.secondaryButton.pressed.background,
  buttonText: LightSemanticColors.secondaryButton.rest.border,
  buttonTextChecked: LightSemanticColors.secondaryButton.pressed.border,
  buttonTextCheckedHovered: LightSemanticColors.secondaryButton.hover.border,
  buttonTextDisabled: LightSemanticColors.disabledButton.text,
  buttonTextHovered: LightSemanticColors.secondaryButton.hover.border,
  buttonTextPressed: LightSemanticColors.secondaryButton.pressed.border,
  disabledBackground: CommonSemanticColors.backgrounds.disabled,
  disabledBodyText: LightSemanticColors.text.disabled,
  errorBackground: LightSemanticColors.controlOutlines.error,
  errorText: LightSemanticColors.text.error,
  focusBorder: LightSemanticColors.controlOutlines.accent,
  inputBackground: LightSemanticColors.background,
  inputText: LightSemanticColors.text.value,
  inputBorder: CommonSemanticColors.textControlOutline.rest,
  inputBorderHovered: CommonSemanticColors.textControlOutline.hover,
  inputPlaceholderText: LightSemanticColors.text.placeholder,
  link: LightSemanticColors.controlOutlines.accent,
  linkHovered: LightSemanticColors.controlOutlines.accent,
  listBackground: LightSemanticColors.background,
  listHeaderBackgroundPressed: LightSemanticColors.item.hover,
  listItemBackgroundChecked: LightSemanticColors.item.select,
  listItemBackgroundCheckedHovered: LightSemanticColors.item.select,
  listItemBackgroundHovered: LightSemanticColors.item.hover,
  listText: LightSemanticColors.text.body,
  menuItemBackgroundHovered: LightSemanticColors.item.hover,
  menuItemBackgroundPressed: LightSemanticColors.item.select,
  primaryButtonBackground: LightSemanticColors.primaryButton.rest.background,
  primaryButtonBackgroundDisabled: LightSemanticColors.disabledButton.background,
  primaryButtonBackgroundHovered: LightSemanticColors.primaryButton.hover.background,
  primaryButtonBackgroundPressed: LightSemanticColors.primaryButton.pressed.background,
  primaryButtonText: LightSemanticColors.primaryButton.rest.text,
  primaryButtonTextDisabled: LightSemanticColors.disabledButton.text,
  primaryButtonTextHovered: LightSemanticColors.primaryButton.hover.text,
  primaryButtonTextPressed: LightSemanticColors.primaryButton.pressed.text,
  variantBorder: CommonSemanticColors.dividers.lineSeparator,
  // extended
  controlAccent: LightSemanticColors.controlOutlines.accent,
  controlOutline: LightSemanticColors.controlOutlines.rest,
  controlOutlineDisabled: LightSemanticColors.controlOutlines.disabled,
  controlOutlineHovered: LightSemanticColors.controlOutlines.hover,
  labelText: LightSemanticColors.text.label
};
export const AzureThemeLight: ITheme = createTheme({
  palette: {
    themePrimary: LightSemanticColors.controlOutlines.accent,
    neutralDark: LightSemanticColors.text.body,
    neutralLight: CommonSemanticColors.backgrounds.section, // shimmer elements
    neutralLighter: CommonSemanticColors.backgrounds.section, // shimmer elements
    neutralQuaternaryAlt: LightSemanticColors.item.select, // expand button on list controls
    white: LightSemanticColors.background // shimmer elements
  },
  semanticColors: lightExtendedSemanticColors
});
