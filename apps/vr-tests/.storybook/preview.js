// @ts-check

import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProviderDecorator } from '../src/utilities';

/** @type {import('@storybook/react').Decorator[]} */
export const decorators = [
  (storyFn, context) => {
    setRTL(false);

    return storyFn(context);
  },
  ThemeProviderDecorator,
];

/** @type {import('@storybook/react').Parameters} */
export const parameters = { layout: 'none' };
