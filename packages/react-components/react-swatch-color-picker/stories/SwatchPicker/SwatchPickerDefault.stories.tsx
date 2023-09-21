import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';
import { makeStyles, shorthands, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

const customStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('8px'),
    boxShadow: 'rgb(46 46 46 / 43%) 0px 1px 2px 0px',
  },
  picker: {
    gridTemplateColumns: `repeat(3, 30px)`,
    columnGap: '4px',
    rowGap: '4px',
  },
});

const colors = [
  {
    id: 0,
    swatch: 'red',
  },
  {
    id: 1,
    swatch: 'rgb(189, 255, 104)',
  },
  {
    id: 2,
    swatch: 'rgba(189, 255, 104,.4)',
  },
  {
    id: 3,
    swatch: '#f09',
  },
  {
    id: 4,
    swatch: 'yellow',
  },
  {
    id: 5,
    swatch: 'cyan',
  },
  {
    id: 6,
    swatch: 'purple',
  },
  {
    id: 7,
    swatch: 'magenta',
  },
];

const colorsLarge = [
  {
    id: 0,
    swatch: 'red',
  },
  {
    id: 1,
    swatch: 'rgb(189, 255, 104)',
  },
  {
    id: 2,
    swatch: 'rgba(189, 255, 104,.4)',
  },
  {
    id: 3,
    swatch: '#f09',
  },
  {
    id: 4,
    swatch: 'yellow',
  },
  {
    id: 5,
    swatch: 'cyan',
  },
  {
    id: 6,
    swatch: 'purple',
  },
  {
    id: 7,
    swatch: 'magenta',
  },
  {
    id: 8,
    swatch: '#a43',
  },
  {
    id: 9,
    swatch: '#ff7',
  },
  {
    id: 10,
    swatch: '#ad5',
  },
  {
    id: 11,
    swatch: '#f49',
  },
  {
    id: 12,
    swatch: 'pink',
  },
  {
    id: 13,
    swatch: '#f56',
  },
  {
    id: 14,
    swatch: 'green',
  },
  {
    id: 15,
    swatch: 'blue',
  },
];

export const Default = (props: Partial<SwatchPickerProps>) => {
  const [color, setColor] = React.useState('red');
  const styles = customStyles();
  return (
    <>
      <h2>row</h2>
      <SwatchPicker layout="row" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        {colors.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
        ))}
      </SwatchPicker>
      <h2>grid</h2>
      <div style={{ width: '100px' }}>
        <SwatchPicker layout="grid" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
          {colors.map(item => (
            <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
          ))}
        </SwatchPicker>
      </div>
      <h2>With popover</h2>
      <Popover>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ width: '150px' }}>
          <SwatchPicker
            layout="grid"
            value={color}
            onChange={(_, data) => setColor(data.value)}
            aria-labelledby="colors"
          >
            {colors.map(item => (
              <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
            ))}
          </SwatchPicker>
        </PopoverSurface>
      </Popover>
      <h2>Grid with a lot of colors</h2>
      <SwatchPicker
        layout="grid"
        value={color}
        onChange={(_, data) => setColor(data.value)}
        aria-labelledby="colors"
        style={{ gridTemplateColumns: `repeat(4, 30px)` }}
      >
        {colorsLarge.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
        ))}
      </SwatchPicker>
      <h2>custom cell</h2>
      <SwatchPicker
        layout="grid"
        value={color}
        onChange={(_, data) => setColor(data.value)}
        aria-labelledby="colors"
        className={{}}
      >
        {colors.map(item => (
          <SwatchColorPikerCell
            id={item.id}
            key={item.id}
            name="color"
            value={item.swatch}
            swatch={item.swatch}
            className={styles.root}
          />
        ))}
      </SwatchPicker>
      Background can be changed
      <div style={{ backgroundColor: color, width: 200, height: 200 }} />
    </>
  );
};
