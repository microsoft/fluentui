import * as React from 'react';
import { RadioPicker, RadioSwatch } from '@fluentui/react-swatch-picker-preview';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

const SwatchPickerRow = () => {
  return (
    <RadioPicker name="row-picker" layout={'row'}>
      <RadioSwatch value="#C11016" aria-label="dark red" />
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
      <RadioSwatch value="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
      <RadioSwatch value="#006EBD" aria-label="blue" />
      <RadioSwatch value="#011F5E" aria-label="dark blue" />
      <RadioSwatch value="#712F9E" aria-label="purple" />
    </RadioPicker>
  );
};

const SwatchPickerGroup = () => {
  return (
    <>
      <h4>SwatchPicker Row</h4>
      <RadioPicker name="grid-picker" layout={'row'}>
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
        <RadioSwatch value="#712F9E" aria-label="purple" />
      </RadioPicker>
      <h4>Grid</h4>
      <RadioPicker name="grid-picker" layout={'grid'} columnCount={8}>
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
        <RadioSwatch value="#712F9E" aria-label="purple" />
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
        <RadioSwatch value="#712F9E" aria-label="purple" />
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
        <RadioSwatch value="#712F9E" aria-label="purple" />
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
        <RadioSwatch value="#712F9E" aria-label="purple" />
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
        <RadioSwatch value="#712F9E" aria-label="purple" />
      </RadioPicker>
    </>
  );
};

export const RadioInPopover = () => {
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
