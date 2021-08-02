import { withFluentProvider, withStrictMode } from '@fluentui/react-storybook';
import 'cypress-storybook/react';

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = [withFluentProvider, withStrictMode];

/** @type {import('@storybook/react').Parameters} */
export const parameters = {
  controls: {
    disable: true,
    expanded: true,
  },
};
