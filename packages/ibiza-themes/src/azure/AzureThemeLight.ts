import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, LightSemanticColors } from './AzureColors';

export const AzureThemeLight: ITheme = createTheme({
  semanticColors: {
    bodyBackground: LightSemanticColors.background,
    bodyText: LightSemanticColors.text.body,
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
    menuItemBackgroundHovered: LightSemanticColors.item.hover,
    menuItemBackgroundChecked: LightSemanticColors.item.select,
    menuItemBackgroundPressed: LightSemanticColors.item.select,

    // primary button
    primaryButtonBackground: LightSemanticColors.primaryButton.rest.background,
    primaryButtonBackgroundDisabled: LightSemanticColors.disabledButton.background,
    primaryButtonBackgroundHovered: LightSemanticColors.primaryButton.hover.background,
    primaryButtonBackgroundPressed: LightSemanticColors.primaryButton.pressed.background,
    primaryButtonText: LightSemanticColors.primaryButton.rest.text,
    primaryButtonTextPressed: LightSemanticColors.primaryButton.pressed.text,
    primaryButtonTextDisabled: LightSemanticColors.disabledButton.text,
    primaryButtonTextHovered: LightSemanticColors.primaryButton.hover.text,

    // secondary button
    buttonBackground: LightSemanticColors.secondaryButton.rest.background,
    buttonBackgroundDisabled: LightSemanticColors.disabledButton.background,
    buttonBackgroundHovered: LightSemanticColors.secondaryButton.hover.background,
    buttonBackgroundPressed: LightSemanticColors.secondaryButton.pressed.background,
    buttonText: LightSemanticColors.secondaryButton.rest.border,
    buttonTextPressed: LightSemanticColors.secondaryButton.pressed.border,
    buttonTextDisabled: LightSemanticColors.disabledButton.text,
    buttonTextHovered: LightSemanticColors.secondaryButton.hover.border,
    // buttonBorder: LightSemanticColors.secondaryButton.rest.border,

    // extended
    labelText: LightSemanticColors.text.label,
    controlOutline: LightSemanticColors.controlOutlines.rest,
    controlOutlineDisabled: LightSemanticColors.controlOutlines.disabled,
    controlOutlineHovered: LightSemanticColors.controlOutlines.hover,
    controlAccent: LightSemanticColors.controlOutlines.accent
  }
});
