import * as React from 'react';
import { RadioPicker, RadioSwatch } from '@fluentui/react-swatch-picker-preview';

export const RadioNavigation = () => {
  return (
    <>
      <div>
        <h3>Row radio picker</h3>
        <RadioPicker name="row-picker" shape="rounded">
          <RadioSwatch value="red" aria-label="Red" />
          <RadioSwatch value="green" aria-label="Green" />
          <RadioSwatch value="blue" aria-label="Blue" />
        </RadioPicker>
      </div>
      <div>
        <h3>Radio Group</h3>
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
        <h3>Circular</h3>
        <RadioPicker layout={'grid'} columnCount={3} shape="circular">
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
      </div>
    </>
  );
};
