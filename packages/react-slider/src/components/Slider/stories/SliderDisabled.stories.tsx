import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';
import type { SliderProps } from '../../../index';

export const Disabled = (props: SliderProps) => {
  <div>
    <Label htmlFor={'disabled-slider'}>Disabled Example</Label>
    <Slider defaultValue={30} disabled input={{ id: 'disabled-slider' }} />
  </div>;
};
