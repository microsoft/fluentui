import * as React from 'react';
import { SwatchColorPikerCell, SwatchPicker } from '@fluentui/react-swatch-color-picker';
export const Default = () => {
  const [color, setColor] = React.useState('red');
  return (
    <>
      <SwatchPicker type="row" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        {/* <Radio name="color" value="red" />
        <Radio name="color" value="rgb(189, 255, 104)" />
        <Radio name="color" value="rgba(189, 255, 104,.4)" />
        <Radio name="color" value="#f09" /> */}
        <SwatchColorPikerCell name="color" value="red" color="red" />
        <SwatchColorPikerCell name="color" value="rgb(189, 255, 104)" color="rgb(189, 255, 104)" />
        <SwatchColorPikerCell name="color" value="rgba(189, 255, 104,.4)" color="rgba(189, 255, 104,.4)" />
        <SwatchColorPikerCell name="color" value="#f09" color="#f09" />
      </SwatchPicker>
      <div style={{ color }}>The text might change the color</div>
      Background also can be changed
      <div style={{ backgroundColor: color, width: 200, height: 200 }} />
    </>
  );
};
