import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import {
  SwatchPicker,
  EmptySwatch,
  ColorSwatch,
  SwatchPickerOnSelectEventHandler,
} from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
  },
});

const items = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FFC12E', value: 'FFC12E', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  {},
  {},
  {},
  {},
];

export const EmptySwatchExample = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const [idx, setIdx] = React.useState(4);
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const addNewColor = () => {
    const value = inputRef.current?.value;
    if (value && items.length < 9) {
      items[idx] = { color: value, value: `custom-${value}`, 'aria-label': value };
      setIdx(idx + 1);
    }
  };

  const styles = useStyles();

  return (
    <>
      <SwatchPicker
        aria-label="SwatchPicker with empty swatch"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {items.map(item =>
          item.color ? <ColorSwatch key={item.value} {...item} /> : <EmptySwatch key={item.value} />,
        )}
      </SwatchPicker>
      <div
        className={styles.example}
        style={{
          backgroundColor: selectedColor,
        }}
      />
      <input ref={inputRef} type="color" id="color-select" name="color-select" />
      <button onClick={addNewColor}>Add new color</button>
    </>
  );
};
