import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index'; // codesandbox-dependency: @fluentui/react-slider ^9.0.0-beta

export const Origin = () => (
  <>
    <Label htmlFor={'origin-slider'}>Origin Example</Label>
    <Slider defaultValue={8} origin={3} min={0} max={10} input={{ id: 'origin-slider' }} />
  </>
);
