import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

export const OffsetValue = () => {
  const [crossAxis, setCrossAxis] = React.useState(10);
  const [mainAxis, setMainAxis] = React.useState(10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', gap: 10 }}>
        <code>crossAxis</code>
        <input onChange={e => setCrossAxis(parseInt(e.target.value, 10))} value={crossAxis} type="number" />
      </label>
      <label style={{ display: 'flex', gap: 10 }}>
        <code>mainAxis</code>
        <input onChange={e => setMainAxis(parseInt(e.target.value, 10))} value={mainAxis} type="number" />
      </label>

      <Popover positioning={{ position: 'after', offset: { crossAxis, mainAxis } }}>
        <PopoverTrigger disableButtonEnhancement>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
      <Popover positioning={{ position: 'after', offset: () => ({ crossAxis, mainAxis }) }}>
        <PopoverTrigger disableButtonEnhancement>
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
        '- An object with `mainAxis` and `crossAxis` values',
        '- A function that returns the object value',
      ].join('\n'),
    },
  },
};
