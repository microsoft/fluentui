import { Meta } from '@storybook/react';

export { BorderRadii } from './ThemeBorderRadii.stories';
export { Colors } from './ThemeColors.stories';
export { FontFamily, FontSize, FontWeight, LineHeight, TypographyStyles } from './ThemeTypography.stories';
export { MotionCurves, MotionDuration } from './ThemeMotion.stories';
export { Shadows } from './ThemeShadows.stories';
export { Spacing } from './ThemeSpacing.stories';
export { StrokeWidths } from './ThemeStrokeWidths.stories';

export default {
  title: 'Theme/Theme',
  parameters: {
    docs: {
      description: {},
    },
  },
} as Meta;
