import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Origin = () => (
  <>
    <Label htmlFor="origin-slider">Origin Example</Label>
    <Slider defaultValue={120} min={20} max={200} origin={80} id="origin-slider" />
  </>
);
