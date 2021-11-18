import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';
import type { SliderProps } from '../../../index';

export const Step = (props: SliderProps) => {
  <div>
    <Label htmlFor={'snapping-slider'}>Snapping Example</Label>
    <Slider defaultValue={5} step={5} min={0} max={10} input={{ id: 'snapping-slider' }} />
  </div>;
};
