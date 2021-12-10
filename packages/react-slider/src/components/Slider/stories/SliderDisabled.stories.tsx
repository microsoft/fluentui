import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Disabled = () => (
  <>
    <Label htmlFor="disabled-slider">Disabled Example</Label>
    <Slider defaultValue={30} disabled id="disabled-slider" />
  </>
);
