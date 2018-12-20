import { createTheme, ITheme } from 'office-ui-fabric-react';
import { CommonSemanticColors, LightSemanticColors } from './AzureColors';

export const AzureThemeLight: ITheme = createTheme({
  semanticColors: {
    bodyBackground: LightSemanticColors.background,
    bodyText: LightSemanticColors.text.body,
    disabledBackground: CommonSemanticColors.backgrounds.disabled,
    disabledBodyText: LightSemanticColors.text.disabledText,
    errorBackground: LightSemanticColors.controlOutlines.error,
    errorText: LightSemanticColors.text.error,
    focusBorder: LightSemanticColors.controlOutlines.accent,
    inputBackground: LightSemanticColors.background,
    inputText: LightSemanticColors.text.value,
    inputBorder: CommonSemanticColors.textControlOutline.rest
  }
});
