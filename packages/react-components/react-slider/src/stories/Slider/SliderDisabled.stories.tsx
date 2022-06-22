import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '@fluentui/react-slider';

export const Disabled = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Disabled Example</Label>
      <Slider defaultValue={30} disabled id={id} />
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A disabled slider will not change or fire events on click or keyboard press.',
    },
  },
};
