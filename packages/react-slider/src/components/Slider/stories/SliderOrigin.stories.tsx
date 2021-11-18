import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';
import type { SliderProps } from '../../../index';

export const Origin = (props: SliderProps) => {
  <div>
    <Label htmlFor={'origin-slider'}>Origin Example</Label>
    <Slider defaultValue={8} origin={3} min={0} max={10} input={{ id: 'origin-slider' }} />
  </div>;
};
