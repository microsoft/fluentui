import * as React from 'react';
import { RadioPicker, RadioSwatch } from '@fluentui/react-swatch-picker-preview';

export const Default = () => (
  <>
    <RadioPicker>
      <RadioSwatch value="red" label="Red" />
      <RadioSwatch value="green" label="Green" />
      <RadioSwatch value="blue" label="Blue" />
    </RadioPicker>
    <h2>Grid</h2>
    <RadioPicker layout={'grid'}>
      <RadioSwatch value="red" label="Red" />
      <RadioSwatch value="green" label="Green" />
      <RadioSwatch value="blue" label="Blue" />
      <RadioSwatch value="yellow" label="Yellow" />
      <RadioSwatch value="orange" label="Orange" />
      <RadioSwatch value="purple" label="Purple" />
      <RadioSwatch value="black" label="Black" />
      <RadioSwatch value="white" label="White" />
      <RadioSwatch value="#f09" label="#f09" />
    </RadioPicker>
  </>
);
