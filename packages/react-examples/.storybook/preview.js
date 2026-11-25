import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { globalTypes, withKeytipLayer, withStrictMode } from '@fluentui/storybook';

initializeIcons();

export default /** @type {import('@storybook/react').Preview} */ ({
  decorators: [withStrictMode, withKeytipLayer],

  globalTypes: {
    ...globalTypes(),
  },

  parameters: {
    a11y: /** @type {import('@storybook/addon-a11y').A11yParameters} */ ({
      manual: true,
    }),
  },
});

export const tags = ['autodocs'];
