import { initializeIcons } from '@fluentui/font-icons-mdl2';
import 'cypress-storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withKeytipLayer, withStrictMode } from '@fluentui/storybook';

initializeIcons();

export const decorators = [withPerformance, withStrictMode, withKeytipLayer];

export const parameters = {
  a11y: /** @type {import('@storybook/addon-a11y').A11yParameters} */ ({
    manual: true,
  }),
};
