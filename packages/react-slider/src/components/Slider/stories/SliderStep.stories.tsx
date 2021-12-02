import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Step = () => (
  <>
    <Label htmlFor="snapping-slider">Snapping Example</Label>
    <Slider defaultValue={6} step={3} min={0} max={12} id="snapping-slider" />
  </>
);
