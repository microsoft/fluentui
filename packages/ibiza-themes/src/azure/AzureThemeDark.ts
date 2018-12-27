import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, DarkSemanticColors } from './AzureColors';

export const AzureThemeDark: ITheme = createTheme({
  semanticColors: {
    bodyBackground: DarkSemanticColors.background,
    bodyText: DarkSemanticColors.text.body,
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
    menuItemBackgroundHovered: DarkSemanticColors.item.hover,
    menuItemBackgroundChecked: DarkSemanticColors.item.select,

    // // primary button
    primaryButtonBackground: DarkSemanticColors.primaryButton.rest.background,
    primaryButtonBackgroundDisabled: DarkSemanticColors.disabledButton.background,
    primaryButtonBackgroundHovered: DarkSemanticColors.primaryButton.hover.background,
    primaryButtonBackgroundPressed: DarkSemanticColors.primaryButton.pressed.background,
    primaryButtonText: DarkSemanticColors.primaryButton.rest.text,
    primaryButtonTextPressed: DarkSemanticColors.primaryButton.pressed.text,
    primaryButtonTextDisabled: DarkSemanticColors.disabledButton.text,
    primaryButtonTextHovered: DarkSemanticColors.primaryButton.hover.text,
    primaryButtonBorderDisabled: DarkSemanticColors.disabledButton.background,
    // // secondary button
    buttonBackground: DarkSemanticColors.secondaryButton.rest.background,
    buttonBackgroundDisabled: DarkSemanticColors.disabledButton.background,
    buttonBackgroundHovered: DarkSemanticColors.secondaryButton.hover.background,
    buttonBackgroundPressed: DarkSemanticColors.secondaryButton.pressed.background,
    buttonText: DarkSemanticColors.secondaryButton.rest.text,
    buttonTextPressed: DarkSemanticColors.secondaryButton.pressed.text,
    buttonTextDisabled: DarkSemanticColors.disabledButton.text,
    buttonTextHovered: DarkSemanticColors.secondaryButton.hover.text,
    // buttonBorder: DarkSemanticColors.secondaryButton.rest.border,
    buttonBorderDisabled: DarkSemanticColors.disabledButton.background,
    // extended
    labelText: DarkSemanticColors.text.label,
    controlOutline: DarkSemanticColors.controlOutlines.rest,
    controlOutlineDisabled: DarkSemanticColors.controlOutlines.disabled,
    controlOutlineHovered: DarkSemanticColors.controlOutlines.hover,
    controlAccent: DarkSemanticColors.controlOutlines.accent
  }
});
