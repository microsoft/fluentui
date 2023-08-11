import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';

export const Default = (props: Partial<SwatchPickerProps>) => {
  const [color, setColor] = React.useState('red');
  return (
    <>
      <h2>row</h2>
      <SwatchPicker type="row" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        <SwatchColorPikerCell id={0} name="color" value="red" color="red" />
        <SwatchColorPikerCell id={1} name="color" value="rgb(189, 255, 104)" color="rgb(189, 255, 104)" />
        <SwatchColorPikerCell id={2} name="color" value="rgba(189, 255, 104,.4)" color="rgba(189, 255, 104,.4)" />
        <SwatchColorPikerCell id={3} name="color" value="#f09" color="#f09" />
        <SwatchColorPikerCell id={4} name="color" value="yellow" color="yellow" />
        <SwatchColorPikerCell id={5} name="color" value="cyan" color="cyan" />
        <SwatchColorPikerCell id={6} name="color" value="purple" color="purple" />
        <SwatchColorPikerCell id={7} name="color" value="magenta" color="magenta" />
      </SwatchPicker>
      <h2>grid</h2>
      <SwatchPicker type="grid" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        <SwatchColorPikerCell id={0} name="color" value="red" color="red" />
        <SwatchColorPikerCell id={1} name="color" value="rgb(189, 255, 104)" color="rgb(189, 255, 104)" />
        <SwatchColorPikerCell id={2} name="color" value="rgba(189, 255, 104,.4)" color="rgba(189, 255, 104,.4)" />
        <SwatchColorPikerCell id={3} name="color" value="#f09" color="#f09" />
        <SwatchColorPikerCell id={4} name="color" value="yellow" color="yellow" />
        <SwatchColorPikerCell id={5} name="color" value="cyan" color="cyan" />
        <SwatchColorPikerCell id={6} name="color" value="purple" color="purple" />
        <SwatchColorPikerCell id={7} name="color" value="magenta" color="magenta" />
      </SwatchPicker>
      Background can be changed
      <div style={{ backgroundColor: color, width: 200, height: 200 }} />
    </>
  );
};
