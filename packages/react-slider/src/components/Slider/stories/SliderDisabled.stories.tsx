import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index'; // codesandbox-dependency: @fluentui/react-slider ^9.0.0-beta

export const Disabled = () => (
  <>
    <Label htmlFor={'disabled-slider'}>Disabled Example</Label>
    <Slider defaultValue={30} disabled input={{ id: 'disabled-slider' }} />
  </>
);
