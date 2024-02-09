import * as React from 'react';
import { SwatchPicker, ColorSwatch, SwatchPickerSelectEventHandler } from '@fluentui/react-swatch-picker-preview';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { Heart28Filled } from '@fluentui/react-icons';
import { tokens, makeStyles, shorthands, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    backgroundColor: '#f1f1f1',
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0,
    height: 'fit-content',
    minWidth: '200px',
    resize: 'horizontal',
    width: '600px',
  },
  root: {
    ...shorthands.outline(`2px solid ${tokens.colorTransparentStroke}`),
    '&:hover': {
      cursor: 'pointer',
      ...shorthands.outline(`2px solid ${tokens.colorBrandBackgroundStatic}`),
      // ...shorthands.border(`10px solid blue`),
      boxShadow: 'none',
    },
  },
  selected: {
    boxShadow: 'none',
    ...shorthands.outline(`2px solid ${tokens.colorBrandBackgroundStatic}`),
    ...shorthands.border(`10px solid ${tokens.colorBrandStroke1}`),
    ':hover': {
      boxShadow: 'none',
      ...shorthands.outline(`2px solid ${tokens.colorBrandBackgroundStatic}`),
    },
    ':hover:active': {
      boxShadow: 'none',
      ...shorthands.outline(`2px solid ${tokens.colorBrandBackgroundStatic}`),
    },
  },
});

const colorSet = [
  { color: '#C11016', label: 'dark red' },
  { color: '#FF1921', label: 'red' },
  { color: '#FFC12E', label: 'orange' },
  { color: '#FEFF37', label: 'yellow' },
  { color: '#90D057', label: 'light green' },
  { color: '#00B053', label: 'green' },
  { color: '#00AFED', label: 'light blue' },
  { color: '#006EBD', label: 'blue' },
  { color: '#011F5E', label: 'dark blue' },
  { color: '#712F9E', label: 'purple' },
];

// TODO - for preview color add onMouseOut & onMouseOver

export const SwatchPickerNav = () => {
  const [selectedColor, setSelectedColor] = React.useState('#fff');
  const [previewColor, setPreviewColor] = React.useState('#222');

  const handleSelect: SwatchPickerSelectEventHandler = (_, data) => {
    setSelectedColor(data.selectedValue);
  };

  const styles = useStyles();

  const swatchStyle = mergeClasses(styles.root, styles.selected);

  const rowFocusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'both',
    memorizeCurrent: true,
  });

  const gridFocusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'grid-linear',
    memorizeCurrent: true,
  });
  return (
    <>
      {/* <h2>No layout provided</h2>
      <SwatchPicker selectedValue={selectedColor} aria-label="SwatchPicker no layout" onColorChange={handleSelect}>
        {colorSet.map((item, index) => (
          <ColorSwatch key={index} color={item.color} aria-label={item.label} role="radio" className={swatchStyle} />
        ))}
      </SwatchPicker> */}
      <h2> Responsive layout</h2>
      <div className={styles.example}>
        <SwatchPicker
          selectedValue={selectedColor}
          onColorChange={handleSelect}
          aria-label="SwatchPicker row"
          responsive={true}
        >
          <ColorSwatch color="#C11016" aria-label="dark red" role="radio" icon={<Heart28Filled color="#fff" />} />
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
      </div>

      <div {...gridFocusAttributes}>
        <h2>SwatchPicker default grid</h2>
        <SwatchPicker
          selectedValue={selectedColor}
          onColorChange={handleSelect}
          layout="grid"
          aria-label="SwatchPicker grid"
        >
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
        <h2>SwatchPicker row</h2>
        <SwatchPicker aria-label="SwatchPicker row" selectedValue={selectedColor} onColorChange={handleSelect}>
          <ColorSwatch color="#C11016" aria-label="dark red" role="radio" icon={<Heart28Filled color="#fff" />} />
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
        <h2>SwatchPicker grid</h2>
        <SwatchPicker
          layout="grid"
          aria-label="SwatchPicker grid"
          selectedValue={selectedColor}
          onColorChange={handleSelect}
          columnCount={3}
        >
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
      </div>
      <h2 style={{ color: previewColor }}>Preview Color</h2>
      <div style={{ width: '100px', height: '100px', backgroundColor: selectedColor }} />
    </>
  );
};
