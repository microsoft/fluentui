import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';
import { makeStyles, shorthands, mergeClasses } from '@fluentui/react-components';
import { background } from '@storybook/theming';

const customStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('8px'),
    boxShadow: 'rgb(46 46 46 / 43%) 0px 1px 2px 0px',
    ...shorthands.transition('all', '.5s', 'ease-in-out'),
    '&:hover': {
      transform: 'scale(1.3)',
    },
  },
  selected: {
    boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 6px black`,
    ...shorthands.border('none'),
    '&:hover': {
      transform: 'scale(1.3)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 5px black`,
    },
    '&:hover&:active': {
      transform: 'scale(1.3)',
      boxShadow: `inset 0px 0px 0px 3px #00ffff, inset 0px 0px 0px 6px black`,
    },
  },
  picker: {
    gridTemplateColumns: `repeat(4, 30px)`,
    columnGap: '4px',
    rowGap: '4px',
  },
  swatch: {
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 4px black`,
    },
    '&:hover&:active': {
      transform: 'scale(1.2)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 4px black`,
    },
  },
});

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
  const [gridColor, setGridColor] = React.useState('');
  const styles = customStyles();

  return (
    <>
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
      <h2>New</h2>
      <SwatchPicker
        layout="grid"
        value={gridColor}
        onChange={(_, data) => setGridColor(data.value)}
        aria-labelledby="colors"
        className={styles.picker}
      >
        {colorsLarge.map(item => (
          <SwatchColorPikerCell
            className={mergeClasses(styles.swatch, gridColor === item.swatch ? styles.selected : '')}
            key={item.id}
            id={item.id}
            name="color"
            value={item.swatch}
            swatch={item.swatch}
          />
        ))}
      </SwatchPicker>
      <h2>Dark Grid with a lots of colors</h2>
      <div style={{ backgroundColor: 'black', padding: 40 }}>
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
        <h2>New</h2>
        <SwatchPicker
          layout="grid"
          value={gridColor}
          onChange={(_, data) => setGridColor(data.value)}
          aria-labelledby="colors"
          className={styles.picker}
        >
          {colorsLarge.map(item => (
            <SwatchColorPikerCell
              className={mergeClasses(styles.swatch, gridColor === item.swatch ? styles.selected : '')}
              key={item.id}
              id={item.id}
              name="color"
              value={item.swatch}
              swatch={item.swatch}
            />
          ))}
        </SwatchPicker>
      </div>
      Background can be changed
      <div style={{ backgroundColor: gridColor, width: 50, height: 50 }} />
    </>
  );
};
