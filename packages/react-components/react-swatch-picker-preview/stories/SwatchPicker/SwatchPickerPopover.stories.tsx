import * as React from 'react';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-swatch-picker-preview';
import { Button, Popover, PopoverSurface, PopoverTrigger, useArrowNavigationGroup } from '@fluentui/react-components';

const SwatchPickerRow = () => {
  return (
    <SwatchPicker layout={'row'}>
      <ColorSwatch color="#C11016" aria-label="dark red" />
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
      <ColorSwatch color="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
      <ColorSwatch color="#006EBD" aria-label="blue" />
      <ColorSwatch color="#011F5E" aria-label="dark blue" />
      <ColorSwatch color="#712F9E" aria-label="purple" />
    </SwatchPicker>
  );
};

const SwatchPickerGroup = () => {
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'grid-linear',
    memorizeCurrent: true,
    tabbable: true,
  });
  return (
    <div {...focusAttributes}>
      <h4>SwatchPicker Row</h4>
      <SwatchPicker aria-label="row group" layout={'row'}>
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
        <ColorSwatch color="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h4>Grid</h4>
      <SwatchPicker aria-label="grid group" layout={'grid'} columnCount={8}>
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
        <ColorSwatch color="#712F9E" aria-label="purple" />
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
        <ColorSwatch color="#712F9E" aria-label="purple" />
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
        <ColorSwatch color="#712F9E" aria-label="purple" />
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
        <ColorSwatch color="#712F9E" aria-label="purple" />
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
        <ColorSwatch color="#712F9E" aria-label="purple" />
      </SwatchPicker>
    </div>
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
