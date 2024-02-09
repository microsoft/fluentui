import * as React from 'react';
import { SwatchPicker, ColorSwatch, SwatchPickerSelectEventHandler } from '@fluentui/react-swatch-picker-preview';
import { makeStyles, shorthands } from '@fluentui/react-components';

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
});

const colorSet = [
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

export const SwatchPickerLayout = () => {
  const [selectedColor, setSelectedColor] = React.useState('#fff');

  const handleSelect: SwatchPickerSelectEventHandler = (_, data) => {
    setSelectedColor(data.selectedValue);
  };

  const styles = useStyles();

  return (
    <>
      <h2>Default layout (row)</h2>
      <SwatchPicker selectedValue={selectedColor} aria-label="SwatchPicker no layout" onColorChange={handleSelect}>
        {colorSet.map((item, index) => (
          <ColorSwatch key={index} color={item.color} aria-label={item.label} />
        ))}
      </SwatchPicker>
      <h2> Responsive layout</h2>
      <div className={styles.example}>
        <SwatchPicker
          selectedValue={selectedColor}
          onColorChange={handleSelect}
          aria-label="SwatchPicker row"
          responsive={true}
        >
          {colorSet.map((item, index) => (
            <ColorSwatch key={index} color={item.color} aria-label={item.label} />
          ))}
        </SwatchPicker>
      </div>
      <h2>SwatchPicker grid</h2>
      <SwatchPicker
        layout="grid"
        aria-label="SwatchPicker grid"
        selectedValue={selectedColor}
        onColorChange={handleSelect}
        columnCount={3}
      >
        {colorSet.map((item, index) => (
          <ColorSwatch key={index} color={item.color} aria-label={item.label} />
        ))}
      </SwatchPicker>
      <h2>SwatchPicker row instead of grid (items less than 4)</h2>
      <SwatchPicker
        selectedValue={selectedColor}
        onColorChange={handleSelect}
        layout="grid"
        aria-label="SwatchPicker grid"
      >
        <ColorSwatch color="#C11016" aria-label="dark red" />
        <ColorSwatch color="#FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" aria-label="orange" />
      </SwatchPicker>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: selectedColor,
          marginTop: 20,
          border: '1px solid #ccc',
        }}
      />
    </>
  );
};
