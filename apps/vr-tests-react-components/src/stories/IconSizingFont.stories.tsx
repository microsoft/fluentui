import type { Meta } from '@storybook/react-webpack5';
import meta, {
  DefaultTheme as ExistingDefaultTheme,
  OverriddenTokens as ExistingOverriddenTokens,
  OverriddenTokensHighContrast as ExistingHighContrast,
} from './IconSizing.stories';

export default {
  ...meta,
  title: 'Icon sizing fonts',
  parameters: {
    ...meta.parameters,
    iconRenderer: 'fonts',
  },
} satisfies Meta;

export const DefaultTheme = ExistingDefaultTheme;
export const OverriddenTokens = ExistingOverriddenTokens;
export const OverriddenTokensHighContrast = ExistingHighContrast;
