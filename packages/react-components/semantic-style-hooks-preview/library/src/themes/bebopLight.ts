import { createLightTheme } from '@fluentui/semantic-tokens';
/**
 * A temporary testing theme for Bebop
 * This is not a production-ready theme and is subject to change.
 * It is intended for internal testing purposes only.
 * Fluent Semantic Themes package will eventually replace this.
 */
export const bebopSemanticTokens = createLightTheme({
  themeTokens: {
    lightnessSelectedHover: '7.5',
    lightnessSelectedPressed: '15',
    lightnessHover: '-7.5',
    lightnessPressed: '-15',
    groupButtonPrimaryLightnessHover: '7.5',
    groupButtonPrimaryLightnessPressed: '15',
    groupButtonOutlineStrokewidthSelected: '1px',
    groupButtonPrimaryBackground: '#242424',
    groupButtonPrimaryBackgroundSelected: '#242424',
    groupButtonOutlineBackgroundSelected: '#242424',
    groupButtonOutlineStrokeSelected: 'transparent',
    groupButtonSubtleBackgroundSelected: '#ebebeb',
    groupButtonSubtleForegroundSelected: '#242424',
    groupButtonSubtleIconForegroundSelected: '#242424',
    groupButtonTransparentForegroundSelected: '#242424',
    groupButtonPrimaryStroke: 'transparent',
    groupButtonPrimaryStrokeSelected: 'transparent',
    groupButtonNeutralStroke: 'transparent',
    groupButtonNeutralStrokeSelected: 'transparent',
    groupButtonSubtleIconForegroundHover: '#242424',
    groupButtonFontweight: '400',
    groupButtonFontweightSelected: '600',
  },
});
