import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Small = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Basic Example</Label>
      <Slider size="small" defaultValue={20} id={id} />
    </>
  );
};
