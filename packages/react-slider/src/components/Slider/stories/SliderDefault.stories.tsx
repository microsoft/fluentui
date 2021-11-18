import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';
import type { SliderProps } from '../../../index';

export const Default = (props: SliderProps) => {
  <div>
    <Label htmlFor={'basic-slider'}>Basic Example</Label>
    <Slider input={{ id: 'basic-slider' }} />
  </div>;
};
