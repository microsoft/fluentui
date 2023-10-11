import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';
import { makeStyles, shorthands } from '@fluentui/react-components';

const customStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('8px'),
    boxShadow: 'rgb(46 46 46 / 43%) 0px 1px 2px 0px',
    ...shorthands.transition('all', '.5s', 'ease-in-out'),
    // transition: 'all .3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.3)',
    },
  },
  // selected: {
  //   ...shorthands.border('4px', 'solid', 'yellow'),
  // },
  picker: {
    gridTemplateColumns: `repeat(3, 30px)`,
    columnGap: '4px',
    rowGap: '4px',
  },
  customHoverStyles: {},
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

export const DesignStories = (props: Partial<SwatchPickerProps>) => {
  const [rowColor, setRowColor] = React.useState('red');
  const [gridColor, setGridColor] = React.useState('');
  const [rowCustomColor, setRowCustomColor] = React.useState('red');
  const styles = customStyles();
  return (
    <>
      <h2>row</h2>
      <SwatchPicker
        layout="row"
        value={rowColor}
        onChange={(_, data) => setRowColor(data.value)}
        aria-labelledby="colors"
      >
        {colors.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
        ))}
      </SwatchPicker>
      Background can be changed
      <div style={{ backgroundColor: rowColor, width: 50, height: 50 }} />
      <h2>Grid with a lots of colors</h2>
      <SwatchPicker
        layout="grid"
        value={gridColor}
        onChange={(_, data) => setGridColor(data.value)}
        aria-labelledby="colors"
        style={{ gridTemplateColumns: `repeat(4, 30px)` }}
      >
        {colorsLarge.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
        ))}
      </SwatchPicker>
      Background can be changed
      <div style={{ backgroundColor: gridColor, width: 50, height: 50 }} />
      <h2>custom cell</h2>
      <SwatchPicker
        layout="row"
        value={rowCustomColor}
        onChange={(_, data) => setRowCustomColor(data.value)}
        aria-labelledby="colors"
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
      <div style={{ backgroundColor: rowCustomColor, width: 50, height: 50 }} />
    </>
  );
};
