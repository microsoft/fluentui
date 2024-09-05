import type { GlobalTypes } from '@storybook/types';

export function globalTypes(): GlobalTypes {
  return {
    strictMode: {
      description: 'Wrap the component in React.StrictMode.',
      defaultValue: 'off',
      type: 'string',
      toolbar: {
        icon: 'lock',
        items: [
          { value: 'on', title: 'On' },
          { value: 'off', title: 'Off' },
        ],
      },
    },
  };
}
