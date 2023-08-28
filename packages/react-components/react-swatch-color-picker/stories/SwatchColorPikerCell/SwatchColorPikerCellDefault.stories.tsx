import * as React from 'react';
import { SwatchColorPikerCell, SwatchPicker } from '@fluentui/react-swatch-color-picker';
export const Default = () => {
  const [color, setColor] = React.useState('red');
  return (
    <>
      <SwatchPicker
        size="small"
        layout="row"
        shape="circular"
        value={color}
        onChange={(_, data) => setColor(data.value)}
        aria-labelledby="colors"
      >
        <SwatchColorPikerCell name="color" value="red" color="red" />
        <SwatchColorPikerCell name="color" value="rgb(189, 255, 104)" color="rgb(189, 255, 104)" />
        <SwatchColorPikerCell name="color" value="rgba(189, 255, 104,.4)" color="rgba(189, 255, 104,.4)" />
        <SwatchColorPikerCell name="color" value="#f09" color="#f09" />
        <SwatchColorPikerCell
          name="color"
          value="linear-gradient(#ff3335, #e6ff03)"
          color="linear-gradient(#ff3335, #e6ff03)"
        />
      </SwatchPicker>
      <SwatchPicker layout="row" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        <SwatchColorPikerCell name="color" value="red" color="red" />
        <SwatchColorPikerCell name="color" value="rgb(189, 255, 104)" color="rgb(189, 255, 104)" />
        <SwatchColorPikerCell name="color" value="rgba(189, 255, 104,.4)" color="rgba(189, 255, 104,.4)" />
        <SwatchColorPikerCell name="color" value="#f09" color="#f09" />
        <SwatchColorPikerCell
          name="color"
          value="linear-gradient(#ff3335, #e6ff03)"
          color="linear-gradient(#ff3335, #e6ff03)"
        />
      </SwatchPicker>
      <SwatchPicker
        size="large"
        layout="row"
        shape="circular"
        value={color}
        onChange={(_, data) => setColor(data.value)}
        aria-labelledby="colors"
      >
        <SwatchColorPikerCell name="color" value="red" color="red" />
        <SwatchColorPikerCell name="color" value="rgb(189, 255, 104)" color="rgb(189, 255, 104)" />
        <SwatchColorPikerCell name="color" value="rgba(189, 255, 104,.4)" color="rgba(189, 255, 104,.4)" />
        <SwatchColorPikerCell name="color" value="#f09" color="#f09" />
        <SwatchColorPikerCell
          name="color"
          value="linear-gradient(#ff3335, #e6ff03)"
          color="linear-gradient(#ff3335, #e6ff03)"
        />
      </SwatchPicker>
      <div style={{ color }}>The text might change the color</div>
      Background also can be changed
      <div style={{ background: color, width: 200, height: 200 }} />
    </>
  );
};
