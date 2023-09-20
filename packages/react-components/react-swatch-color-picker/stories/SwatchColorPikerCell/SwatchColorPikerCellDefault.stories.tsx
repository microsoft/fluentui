import * as React from 'react';
import { SwatchColorPikerCell, SwatchPicker } from '@fluentui/react-swatch-color-picker';
import { Tooltip } from '@fluentui/react-components';

const swatches = [
  {
    swatch: 'red',
    id: '0',
    label: 'red',
  },
  {
    swatch: 'rgb(189, 255, 104)',
    id: '1',
    label: 'light green',
  },
  {
    swatch: 'rgba(189, 255, 104,.4)',
    id: '2',
    label: 'transparent light green',
  },
  {
    swatch: '#f09',
    id: '3',
    label: 'pink',
  },
  {
    swatch: 'linear-gradient(#ff3335, #e6ff03)',
    type: 'color',
    id: 'gradient red to yellow',
  },
];

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
        {swatches.map(swatch => (
          <SwatchColorPikerCell
            name="color"
            value={swatch.swatch}
            color={swatch.swatch}
            id={swatch.id}
            label={swatch.label}
          />
        ))}
      </SwatchPicker>
      <SwatchPicker layout="row" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        {swatches.map(swatch => (
          <SwatchColorPikerCell
            name="color"
            value={swatch.swatch}
            color={swatch.swatch}
            id={swatch.id}
            label={swatch.label}
          />
        ))}
      </SwatchPicker>
      <SwatchPicker
        size="large"
        layout="row"
        shape="circular"
        value={color}
        onChange={(_, data) => setColor(data.value)}
        aria-labelledby="colors"
      >
        {swatches.map(swatch => (
          <Tooltip content={swatch.label}>
            <SwatchColorPikerCell
              name="color"
              value={swatch.swatch}
              color={swatch.swatch}
              id={swatch.id}
              aria-label={swatch.label}
            />
          </Tooltip>
        ))}
      </SwatchPicker>
      <div style={{ color }}>The text might change the color</div>
      Background also can be changed
      <div style={{ background: color, width: 200, height: 200 }} />
    </>
  );
};
