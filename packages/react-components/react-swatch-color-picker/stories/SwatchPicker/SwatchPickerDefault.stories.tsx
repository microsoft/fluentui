import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';
import { makeStyles, shorthands, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

const customStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('8px'),
    boxShadow: 'rgb(46 46 46 / 43%) 0px 1px 2px 0px',
  },
});

const colors = [
  {
    id: 0,
    color: 'red',
  },
  {
    id: 1,
    color: 'rgb(189, 255, 104)',
  },
  {
    id: 2,
    color: 'rgba(189, 255, 104,.4)',
  },
  {
    id: 3,
    color: '#f09',
  },
  {
    id: 4,
    color: 'yellow',
  },
  {
    id: 5,
    color: 'cyan',
  },
  {
    id: 6,
    color: 'purple',
  },
  {
    id: 7,
    color: 'magenta',
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
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.color} color={item.color} />
        ))}
      </SwatchPicker>
      <h2>grid</h2>
      <SwatchPicker layout="grid" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        {colors.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.color} color={item.color} />
        ))}
      </SwatchPicker>
      <h2>With popover</h2>
      <Popover>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <SwatchPicker
            layout="grid"
            value={color}
            onChange={(_, data) => setColor(data.value)}
            aria-labelledby="colors"
          >
            {colors.map(item => (
              <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.color} color={item.color} />
            ))}
          </SwatchPicker>
        </PopoverSurface>
      </Popover>
      <h2>custom cell</h2>
      <SwatchPicker layout="row" value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        {colors.map(item => (
          <SwatchColorPikerCell
            id={item.id}
            key={item.id}
            name="color"
            value={item.color}
            color={item.color}
            className={styles.root}
          />
        ))}
      </SwatchPicker>
      Background can be changed
      <div style={{ backgroundColor: color, width: 200, height: 200 }} />
    </>
  );
};
