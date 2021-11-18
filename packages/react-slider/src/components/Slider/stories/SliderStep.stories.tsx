import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index'; // codesandbox-dependency: @fluentui/react-slider ^9.0.0-beta

export const Step = () => (
  <>
    <Label htmlFor={'snapping-slider'}>Snapping Example</Label>
    <Slider defaultValue={5} step={5} min={0} max={10} input={{ id: 'snapping-slider' }} />
  </>
);
