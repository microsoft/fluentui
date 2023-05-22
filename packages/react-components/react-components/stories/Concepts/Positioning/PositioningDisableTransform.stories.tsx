import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

export const DisableTransform = () => {
  return (
    <Popover positioning={{ useTransform: false }}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
    </Popover>
  );
};

DisableTransform.parameters = {
  docs: {
    description: {
      story: [
        'By default, the positioned element is positioned using transform in the element style for better performance, but can be disabled by setting `useTransform` to `false`.',
        '',
        'Note:',
        'When disabling transforms, add `width: max-content` (or a fixed width) to the floating element to prevent positioning issues due to layout affecting the floating element ([Disabling transform](https://floating-ui.com/docs/react#disabling-transform)).',
        '',
        'If you would like to retain transform styles while allowing transform animations, leave the popover surface the positioned one, and make its child node the actual styled element.',
      ].join('\n'),
    },
  },
};
