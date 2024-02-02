import * as React from 'react';
import { RadioPicker, RadioSwatch } from '@fluentui/react-swatch-picker-preview';

export const RadioPickerShape = () => {
  return (
    <>
      <h3>Rounded (only row layout)</h3>
      <RadioPicker shape="rounded">
        <RadioSwatch value="#FF1921" aria-label="red" />
        <RadioSwatch value="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <RadioSwatch value="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <RadioSwatch
          value="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <RadioSwatch value="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <RadioSwatch
          value="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <RadioSwatch value="#006EBD" aria-label="blue" />
        <RadioSwatch value="#011F5E" aria-label="dark blue" />
        <RadioSwatch value="#712F9E" aria-label="purple" />
      </RadioPicker>
      <h3>Square</h3>
      <RadioPicker name="colors" layout={'grid'} columnCount={3}>
        <RadioSwatch value="#FF1921" aria-label="red" />
        <RadioSwatch value="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <RadioSwatch value="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <RadioSwatch
          value="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <RadioSwatch value="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <RadioSwatch
          value="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <RadioSwatch value="#006EBD" aria-label="blue" />
        <RadioSwatch value="#011F5E" aria-label="dark blue" />
        <RadioSwatch value="#712F9E" aria-label="purple" />
      </RadioPicker>
      <h3>Circular</h3>
      <RadioPicker layout={'grid'} columnCount={3} shape="circular">
        <RadioSwatch value="#FF1921" aria-label="red" />
        <RadioSwatch value="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <RadioSwatch value="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <RadioSwatch
          value="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <RadioSwatch value="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <RadioSwatch
          value="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <RadioSwatch value="#006EBD" aria-label="blue" />
        <RadioSwatch value="#011F5E" aria-label="dark blue" />
        <RadioSwatch value="#712F9E" aria-label="purple" />
      </RadioPicker>
    </>
  );
};
