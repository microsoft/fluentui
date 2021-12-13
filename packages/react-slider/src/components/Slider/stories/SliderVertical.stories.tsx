import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Vertical = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Vertical Example</Label>
      <Slider vertical step={2} defaultValue={6} min={0} max={10} id={id} />
    </>
  );
};
