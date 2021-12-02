import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Vertical = () => (
  <>
    <Label htmlFor="vertical-slider">Vertical Example</Label>
    <Slider vertical step={2} defaultValue={6} min={0} max={10} id="vertical-slider" />
  </>
);
