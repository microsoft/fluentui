import * as React from 'react';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-swatch-picker-preview';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

const SwatchPickerRow = () => {
  return (
    <SwatchPicker layout={'row'}>
      <ColorSwatch hex="#C11016" aria-label="dark red" />
      <ColorSwatch hex="#FF1921" aria-label="red" />
      <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
      <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
      <ColorSwatch hex="#90D057" aria-label="light green" contrastBorderColor="#66A52E" contrastStateColor="#385b19" />
      <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
      <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
      <ColorSwatch hex="#006EBD" aria-label="blue" />
      <ColorSwatch hex="#011F5E" aria-label="dark blue" />
      <ColorSwatch hex="#712F9E" aria-label="purple" />
    </SwatchPicker>
  );
};

const SwatchPickerGroup = () => {
  return (
    <>
      <h4>SwatchPicker Row</h4>
      <SwatchPicker layout={'row'}>
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h4>Grid</h4>
      <SwatchPicker layout={'grid'} columnCount={8}>
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
      </SwatchPicker>
    </>
  );
};

export const SwatchPickerInPopover = () => {
  return (
    <>
      <SwatchPickerRow />
      <h2>Example of swatch picker in color sets</h2>
      <Popover>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface tabIndex={-1}>
          <SwatchPickerGroup />
        </PopoverSurface>
      </Popover>
    </>
  );
};
