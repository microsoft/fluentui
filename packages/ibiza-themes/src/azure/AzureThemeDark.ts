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
    // extended
    labelText: DarkSemanticColors.text.label,
    controlOutline: DarkSemanticColors.controlOutlines.rest,
    controlOutlineDisabled: DarkSemanticColors.controlOutlines.disabled,
    controlOutlineHovered: DarkSemanticColors.controlOutlines.hover,
    controlAccent: DarkSemanticColors.controlOutlines.accent
  }
});
