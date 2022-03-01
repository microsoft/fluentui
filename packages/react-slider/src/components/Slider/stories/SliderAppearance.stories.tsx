import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Appearance = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Vertical Example</Label>
      <Slider appearance="vertical" step={2} defaultValue={6} min={0} max={10} id={id} />
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: `A slider can be rendered vertically where the max value is at the top of the slider.`,
    },
  },
};
