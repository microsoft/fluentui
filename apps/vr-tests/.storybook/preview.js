// @ts-check

import { setRTL } from '@fluentui/react/lib/Utilities';

/** @type {import('@storybook/react').DecoratorFn[]} */
export const decorators = [
  (storyFn, context) => {
    setRTL(false);

    return storyFn(context);
  },
];

/** @type {import('@storybook/react').Parameters} */
export const parameters = { layout: 'none' };
