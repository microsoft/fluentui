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

const ITEMS_LIMIT = 8;

export const EmptySwatchExample = () => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<Array<{ color: string; value: string; 'aria-label': string }>>([
    { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
    { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'dark orange' },
    { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
    { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  ]);
  const emptyItems = new Array(ITEMS_LIMIT - items.length).fill(null);

  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };
  const handleAddColor = () => {
    const newColor = inputRef.current?.value as string;
    // "value" should be unique as it's used as a key and for selection
    const newValue = `custom-${newColor} [${items.length - ITEMS_LIMIT}]`;

    setItems([...items, { color: newColor, value: newValue, 'aria-label': newColor }]);
  };

  return (
    <>
      <SwatchPicker
        aria-label="SwatchPicker with empty swatch"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {items.map(item => (
          <ColorSwatch key={item.value} {...item} />
        ))}
        {emptyItems.map((_, index) => (
          <EmptySwatch key={index} />
        ))}
      </SwatchPicker>

      <div className={styles.example} style={{ backgroundColor: selectedColor }} />
      <input ref={inputRef} type="color" id="color-select" name="color-select" />
      <button disabled={items.length >= ITEMS_LIMIT} onClick={handleAddColor}>
        Add new color
      </button>
    </>
  );
};
