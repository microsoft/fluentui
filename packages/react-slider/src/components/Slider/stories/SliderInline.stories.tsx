import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Inline = () => {
  const id = useId();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Label htmlFor={id}>Basic Example</Label>
      <Slider inline defaultValue={20} id={id} />
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: `A slider can be set to inline, and flow with sibling content.
        Block is the default. Note custom vertical alignment.`,
    },
  },
};
