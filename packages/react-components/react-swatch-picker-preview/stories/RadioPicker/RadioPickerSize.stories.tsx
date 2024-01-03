import * as React from 'react';
import { RadioPicker, RadioSwatch } from '@fluentui/react-swatch-picker-preview';

export const RadioPickerSize = () => {
  return (
    <>
      <h3>Extra small</h3>
      <RadioPicker layout={'grid'} columnCount={3} size="extraSmall">
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
      <h3>Small</h3>
      <RadioPicker layout={'grid'} columnCount={3} size="small">
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
      <h3>Medium</h3>
      <RadioPicker name="colors" layout={'grid'} columnCount={3}>
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
      <h3>Large</h3>
      <RadioPicker layout={'grid'} columnCount={3} size="large">
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
};
