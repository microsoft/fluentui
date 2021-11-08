import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';

export const AnchorToTarget = () => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Popover positioning={{ position: 'above', align: 'start', target }} noArrow>
        <PopoverTrigger>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
      <Button ref={setTarget}>Target</Button>
    </div>
  );
};

AnchorToTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Components with positioned slots will generally also contain the target which the positioned element will',
        'anchor on. It is also possible to select another DOM element for the anchor of the positioned slot. This',
        'can be useful in scenarios where the same instance of a positioned component needs to be reused.',
      ].join('\n'),
    },
  },
};
