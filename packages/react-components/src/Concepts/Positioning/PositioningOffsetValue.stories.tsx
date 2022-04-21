import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';

export const OffsetValue = () => {
  const [offsetCross, setOffsetCross] = React.useState(10);
  const [offsetMain, setOffsetMain] = React.useState(10);

  const onChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetCross(parseInt(e.target.value, 10));
  };

  const onChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetMain(parseInt(e.target.value, 10));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', gap: 10 }}>
        Offset Y
        <input onChange={onChangeY} value={offsetCross} type="number" />
      </label>
      <label style={{ display: 'flex', gap: 10 }}>
        Offset X
        <input onChange={onChangeX} value={offsetMain} type="number" />
      </label>
      <Popover positioning={{ position: 'after', offset: { crossAxis: offsetCross, mainAxis: offsetMain } }} noArrow>
        <PopoverTrigger>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
      <Popover
        positioning={{ position: 'after', offset: () => ({ crossAxis: offsetCross, mainAxis: offsetMain }) }}
        noArrow
      >
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
        '',
        '- Simple array with X and Y axis values',
        '- A function that returns the array offset value',
      ].join('\n'),
    },
  },
};
