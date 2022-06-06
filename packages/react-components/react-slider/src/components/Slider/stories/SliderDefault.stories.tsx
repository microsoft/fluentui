import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Default = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Basic Example</Label>
      <Slider defaultValue={20} id={id} />
    </>
  );
};

Default.parameters = {
  docs: {
    description: {
      story: 'A default slider',
    },
  },
};
