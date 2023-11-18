import * as React from 'react';
import { useId, Label, Slider } from '@fluentui/react-components';

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
