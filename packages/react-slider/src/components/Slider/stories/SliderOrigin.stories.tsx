import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Origin = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Origin Example</Label>
      <Slider defaultValue={120} min={20} max={200} origin={80} id={id} />
    </>
  );
};

Origin.parameters = {
  docs: {
    description: {
      story: `A slider's progress can be represented with an origin so that values below the
      origin will have negative progress and those above will have positive progress.
      Origin, however, has no effect on the actual value of the slider.`,
    },
  },
};
