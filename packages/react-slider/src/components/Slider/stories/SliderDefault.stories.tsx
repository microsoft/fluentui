import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';

export const Default = () => (
  <>
    <Label htmlFor="basic-slider">Basic Example</Label>
    <Slider input={{ id: 'basic-slider' }} />
  </>
);
