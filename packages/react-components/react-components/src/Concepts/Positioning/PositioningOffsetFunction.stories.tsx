import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { PositioningProps } from '@fluentui/react-positioning';

export const OffsetFunction = () => {
  const offset: PositioningProps['offset'] = ({ positioned, target, position, alignment }) => {
    return { crossAxis: 10, mainAxis: positioned.width / 2 };
  };

  return (
    <Popover positioning={{ position: 'after', offset }} noArrow>
      <PopoverTrigger>
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
        'The callback function provides the arguments and are a values used directly by Floating UI.',
        '',
        '- Dimensions and position of the positioned element',
        '- Dimensions and position of the reference element',
        '- The Floating UI placement value',
      ].join('\n'),
    },
  },
};
