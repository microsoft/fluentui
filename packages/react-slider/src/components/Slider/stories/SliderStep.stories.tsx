import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider } from '../../../index';

export const Step = () => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Snapping Example</Label>
      <Slider defaultValue={6} step={3} min={0} max={12} id={id} />
    </>
  );
};
