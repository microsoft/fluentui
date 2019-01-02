import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, DarkSemanticColors } from './AzureColors';

export const AzureThemeDark: ITheme = createTheme({
  palette: {
    accent: DarkSemanticColors.controlOutlines.accent
  },
  semanticColors: {
    bodyBackground: DarkSemanticColors.background,
    bodyText: DarkSemanticColors.text.body,
    buttonBackground: DarkSemanticColors.secondaryButton.rest.background,
    buttonBackgroundDisabled: DarkSemanticColors.disabledButton.background,
    buttonBackgroundHovered: DarkSemanticColors.secondaryButton.hover.background,
    buttonBackgroundPressed: DarkSemanticColors.secondaryButton.pressed.background,
    buttonText: DarkSemanticColors.secondaryButton.rest.border,
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
    menuItemBackgroundChecked: DarkSemanticColors.item.select,
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
    // extended colors
    controlAccent: DarkSemanticColors.controlOutlines.accent,
    controlOutline: DarkSemanticColors.controlOutlines.rest,
    controlOutlineDisabled: DarkSemanticColors.controlOutlines.disabled,
    controlOutlineHovered: DarkSemanticColors.controlOutlines.hover,
    labelText: DarkSemanticColors.text.label
  }
});
