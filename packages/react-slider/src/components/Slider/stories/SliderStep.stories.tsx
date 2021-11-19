import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Step = () => (
  <>
    <Label htmlFor='snapping-slider'>Snapping Example</Label>
    <Slider defaultValue={5} step={5} min={0} max={10} input={{ id: 'snapping-slider' }} />
  </>
);
