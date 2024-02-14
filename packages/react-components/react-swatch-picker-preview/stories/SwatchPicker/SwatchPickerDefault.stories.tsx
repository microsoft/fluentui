import * as React from 'react';
import { SwatchPicker, ColorSwatch, SwatchPickerSelectEventHandler } from '@fluentui/react-swatch-picker-preview';

export const Default = () => {
  const [selectedColor, setSelectedColor] = React.useState('#fff');
  const handleSelect: SwatchPickerSelectEventHandler = (_, data) => {
    setSelectedColor(data.selectedValue);
  };
  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedColor} onSelectionChange={handleSelect}>
        <ColorSwatch color="#FF1921" value="#FF1921" aria-label="red" role="radio" />
        <ColorSwatch color="#FFC12E" value="#FFC12E" aria-label="orange" role="radio" />
        <ColorSwatch color="#FEFF37" value="#FEFF37" aria-label="yellow" role="radio" />
        <ColorSwatch color="#90D057" value="#90D057" aria-label="light green" role="radio" />
        <ColorSwatch color="#00B053" value="#00B053" aria-label="green" role="radio" />
        <ColorSwatch color="#00AFED" value="#00AFED" aria-label="light blue" role="radio" />
        <ColorSwatch color="#006EBD" value="#006EBD" aria-label="blue" role="radio" />
        <ColorSwatch color="#011F5E" value="#011F5E" aria-label="dark blue" role="radio" />
        <ColorSwatch color="#712F9E" value="#712F9E" aria-label="purple" role="radio" />
      </SwatchPicker>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: selectedColor,
          border: '1px solid #ccc',
          marginTop: 20,
        }}
      />
    </>
  );
};
