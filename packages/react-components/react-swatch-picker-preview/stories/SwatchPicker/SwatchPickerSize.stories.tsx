import * as React from 'react';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-swatch-picker-preview';

export const SwatchPickerSize = () => {
  return (
    <>
      <h3>Extra small</h3>
      <SwatchPicker layout={'grid'} columnCount={3} size="extraSmall">
        <ColorSwatch color="#FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch color="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          color="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch color="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch
          color="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <ColorSwatch color="#006EBD" aria-label="blue" />
        <ColorSwatch color="#011F5E" aria-label="dark blue" />
        <ColorSwatch color="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h3>Small</h3>
      <SwatchPicker layout={'grid'} columnCount={3} size="small">
        <ColorSwatch color="#FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch color="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          color="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch color="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch
          color="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <ColorSwatch color="#006EBD" aria-label="blue" />
        <ColorSwatch color="#011F5E" aria-label="dark blue" />
        <ColorSwatch color="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h3>Medium</h3>
      <SwatchPicker layout={'grid'} columnCount={3}>
        <ColorSwatch color="#FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch color="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          color="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch color="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch
          color="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <ColorSwatch color="#006EBD" aria-label="blue" />
        <ColorSwatch color="#011F5E" aria-label="dark blue" />
        <ColorSwatch color="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h3>Large</h3>
      <SwatchPicker layout={'grid'} columnCount={3} size="large">
        <ColorSwatch color="#FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch color="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          color="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch color="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch
          color="#00AFED"
          aria-label="light blue"
          contrastBorderColor="#008EC0"
          contrastStateColor="#004b66"
        />
        <ColorSwatch color="#006EBD" aria-label="blue" />
        <ColorSwatch color="#011F5E" aria-label="dark blue" />
        <ColorSwatch color="#712F9E" aria-label="purple" />
      </SwatchPicker>
    </>
  );
};
