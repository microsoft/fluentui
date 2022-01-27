import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Size = () => {
  const smallId = useId('small');
  const mediumId = useId('medium');
  return (
    <>
      <Label htmlFor={mediumId}>Medium Slider</Label>
      <Slider size="medium" defaultValue={20} id={mediumId} />

      <Label htmlFor={smallId}>Small Slider</Label>
      <Slider size="small" defaultValue={20} id={smallId} />
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: `A slider comes in both medium and small size. Medium is the default.`,
    },
  },
};
