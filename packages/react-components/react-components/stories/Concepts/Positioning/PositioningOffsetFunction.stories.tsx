import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningProps } from '@fluentui/react-components';

export const OffsetFunction = () => {
  const offset: PositioningProps['offset'] = ({ positionedRect, targetRect, position, alignment }) => {
    return { crossAxis: 10, mainAxis: positionedRect.width / 2 };
  };

  return (
    <Popover positioning={{ position: 'after', offset }}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
    </Popover>
  );
};

OffsetFunction.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The positioned element can be offset from the target element by using a callback function.',
        'The callback function provides the following arguments:',
        '',
        '- Dimensions and position of the positioned element',
        '- Dimensions and position of the reference element',
        '- The `position` value',
        '- (optionally) The `alignment` value',
      ].join('\n'),
    },
  },
};
