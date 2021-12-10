import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Small = () => (
  <>
    <Label htmlFor="basic-slider">Basic Example</Label>
    <Slider size="small" defaultValue={20} id="basic-slider" />
  </>
);
