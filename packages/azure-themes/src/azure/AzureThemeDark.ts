import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, DarkSemanticColors } from './AzureColors';
import { IExtendedSemanticColors } from './IExtendedSemanticColors';
import { FontSizes } from './AzureType';
import * as StyleConstants from './Constants';

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
  link: DarkSemanticColors.text.hyperlink,
  linkHovered: DarkSemanticColors.text.hyperlink,
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
  labelText: DarkSemanticColors.text.label,
  statusErrorBackground: DarkSemanticColors.statusBar.error,
  statusErrorText: DarkSemanticColors.text.body,
  statusErrorIcon: CommonSemanticColors.icons.error,
  statusInformationBackground: DarkSemanticColors.statusBar.information,
  statusInformationText: DarkSemanticColors.text.body,
  statusInformationIcon: CommonSemanticColors.icons.information,
  statusSuccessBackground: DarkSemanticColors.statusBar.okay,
  statusSuccessText: DarkSemanticColors.text.body,
  statusSuccessIcon: CommonSemanticColors.icons.okay,
  statusWarningBackground: DarkSemanticColors.statusBar.warning,
  statusWarningText: DarkSemanticColors.text.body,
  statusWarningIcon: CommonSemanticColors.icons.warning
};

export const AzureThemeDark: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: StyleConstants.fontFamily,
      fontSize: FontSizes.size12
    }
  },
  palette: {
    themePrimary: DarkSemanticColors.controlOutlines.accent,
    neutralPrimary: DarkSemanticColors.text.body,
    neutralDark: DarkSemanticColors.text.body,
    neutralLighter: DarkSemanticColors.shimmer.secondary, // shimmer elements
    neutralLight: DarkSemanticColors.shimmer.primary, // shimmer elements
    neutralLighterAlt: DarkSemanticColors.item.hover, // nav highlight
    neutralQuaternaryAlt: DarkSemanticColors.item.select, // expand button on list controls
    neutralSecondary: DarkSemanticColors.text.label, // persona,
    white: DarkSemanticColors.background // shimmer elements
  },
  semanticColors: darkExtendedSemanticColors
});
