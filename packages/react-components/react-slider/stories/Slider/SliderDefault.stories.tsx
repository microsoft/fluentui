import * as React from 'react';
import { useId, Label, Slider } from '@fluentui/react-components';

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
