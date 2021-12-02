import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Origin = () => (
  <>
    <Label htmlFor="origin-slider">Origin Example</Label>
    <Slider defaultValue={8} origin={3} min={0} max={10} id="origin-slider" />
  </>
);
