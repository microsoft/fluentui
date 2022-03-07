import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';

export const OffsetValue = () => {
  const [crossAxis, setCrossAxis] = React.useState(10);
  const [mainAxis, setMainAxis] = React.useState(10);

  const onChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrossAxis(parseInt(e.target.value, 10));
  };

  const onChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainAxis(parseInt(e.target.value, 10));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', gap: 10 }}>
        Cross axis
        <input onChange={onChangeY} value={crossAxis} type="number" />
      </label>
      <label style={{ display: 'flex', gap: 10 }}>
        Main axis
        <input onChange={onChangeX} value={mainAxis} type="number" />
      </label>
      <Popover positioning={{ position: 'after', offset: { crossAxis, mainAxis } }} noArrow>
        <PopoverTrigger>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
    </div>
  );
};

OffsetValue.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The positioned element can be offset from the target element. The offset value can be set either by:',
        'Offset is determined by',
        '',
        '- Cross axis: The distance the positioning element slides from the target',
        '- Main axis: The distance between positioning element and the target',
        '',
        'Offset is determined by',
        '',
        '- An object with cross axis and main axis values',
        '- A function that returns the offset object',
        '',
      ].join('\n'),
    },
  },
};
