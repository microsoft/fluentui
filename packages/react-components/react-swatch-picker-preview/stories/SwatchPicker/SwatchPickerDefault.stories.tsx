import * as React from 'react';
import { SwatchPicker, ColorSwatch, SwatchPickerSelectEventHandler } from '@fluentui/react-swatch-picker-preview';

export const Default = () => {
  const [selectedColor, setSelectedColor] = React.useState('#fff');
  const handleSelect: SwatchPickerSelectEventHandler = (_, data) => {
    setSelectedColor(data.selectedValue);
  };

  return (
    <>
      <SwatchPicker selectedValue={selectedColor} aria-label="SwatchPicker no layout" onColorChange={handleSelect}>
        <ColorSwatch color="#C11016" aria-label="dark red" role="radio" />
        <ColorSwatch color="#FF1921" aria-label="red" role="radio" />
        <ColorSwatch color="#FFC12E" aria-label="orange" role="radio" />
        <ColorSwatch color="#FEFF37" aria-label="yellow" role="radio" />
        <ColorSwatch color="#90D057" aria-label="light green" role="radio" />
        <ColorSwatch color="#00B053" aria-label="green" role="radio" />
        <ColorSwatch color="#00AFED" aria-label="light blue" role="radio" />
        <ColorSwatch color="#006EBD" aria-label="blue" role="radio" />
        <ColorSwatch color="#011F5E" aria-label="dark blue" role="radio" />
        <ColorSwatch color="#712F9E" aria-label="purple" role="radio" />
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
