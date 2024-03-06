import * as React from 'react';
import { makeStyles, shorthands, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import {
  SwatchPicker,
  ColorSwatch,
  SwatchPickerOnSelectEventHandler,
  SwatchPickerRow,
} from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
  },
  colorButton: {
    minWidth: '32px',
    height: '32px',
    ...shorthands.borderRadius(0),
    ...shorthands.border('none'),
    ...shorthands.margin('0', '10px'),
  },
});

export const SwatchPickerLayout = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedColor);
  };

  const [selectedValue1, setSelectedValue1] = React.useState('00B053');
  const [selectedColor1, setSelectedColor1] = React.useState('#00B053');
  const handleSelect1: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue1(data.selectedValue);
    setSelectedColor1(data.selectedColor);
  };

  const styles = useStyles();

  return (
    <>
      <h3>Row</h3>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        <SwatchPickerRow>
          <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
          <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" />
          <ColorSwatch color="#FEFF37" value="FEFF37" aria-label="yellow" />
          <ColorSwatch color="#90D057" value="90D057" aria-label="light green" />
          <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
          <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
          <ColorSwatch color="#011F5E" value="011F5E" aria-label="dark blue" />
          <ColorSwatch color="#712F9E" value="712F9E" aria-label="purple" />
        </SwatchPickerRow>
      </SwatchPicker>
      <h3>Grid</h3>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        <SwatchPickerRow>
          <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
          <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" />
          <ColorSwatch color="#FEFF37" value="FEFF37" aria-label="yellow" />
        </SwatchPickerRow>
        <SwatchPickerRow>
          <ColorSwatch color="#90D057" value="90D057" aria-label="light green" />
          <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
        </SwatchPickerRow>
        <SwatchPickerRow>
          <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
          <ColorSwatch color="#011F5E" value="011F5E" aria-label="dark blue" />
          <ColorSwatch color="#712F9E" value="712F9E" aria-label="purple" />
        </SwatchPickerRow>
      </SwatchPicker>
      <div
        className={styles.example}
        style={{
          backgroundColor: selectedColor,
        }}
      />
      <h3>Color sets</h3>
      Click to change color
      <Popover trapFocus>
        <PopoverTrigger disableButtonEnhancement>
          <Button className={styles.colorButton} style={{ backgroundColor: selectedColor1 }} />
        </PopoverTrigger>
        <PopoverSurface>
          <SwatchPicker
            aria-label="SwatchPicker default"
            selectedValue={selectedValue1}
            onSelectionChange={handleSelect1}
          >
            <SwatchPickerRow>
              <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
              <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" />
              <ColorSwatch color="#FEFF37" value="FEFF37" aria-label="yellow" />
            </SwatchPickerRow>
            <SwatchPickerRow>
              <ColorSwatch color="#90D057" value="90D057" aria-label="light green" />
              <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
              <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
            </SwatchPickerRow>
            <SwatchPickerRow>
              <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
              <ColorSwatch color="#011F5E" value="011F5E" aria-label="dark blue" />
              <ColorSwatch color="#712F9E" value="712F9E" aria-label="purple" />
            </SwatchPickerRow>
          </SwatchPicker>
        </PopoverSurface>
      </Popover>
    </>
  );
};
