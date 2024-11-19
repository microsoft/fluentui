import type { StorybookConfig } from '@storybook/html-vite';

export default {
  // helpers.stories.ts is a file that contains helper functions for stories,
  // and should not be treated as a story itself.
  stories: ['../src/**/!(helpers)*.stories.@(ts|mdx)'],
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  framework: '@storybook/html-vite',
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        viewport: false,
        toolbars: false,
        actions: true,
      },
    },
  ],
  docs: {
    autodocs: true,
  },
} satisfies StorybookConfig;
