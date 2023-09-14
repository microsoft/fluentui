import * as React from 'react';
import { useId, Label, Slider } from '@fluentui/react-components';

export const Vertical = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Vertical Example</Label>
      <Slider vertical step={2} defaultValue={6} min={0} max={10} id={id} />
    </>
  );
};

Vertical.parameters = {
  docs: {
    description: {
      story: `A slider can be oriented vertically where the max value is at the top of the slider.`,
    },
  },
};
