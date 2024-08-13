import * as React from 'react';
import { makeStyles, Button, Label, SwatchPicker, EmptySwatch, ColorSwatch } from '@fluentui/react-components';
import type { SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    border: '1px solid #ccc',
    margin: '20px 0',
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
  button: {
    marginRight: '8px',
  },
  input: {
    display: 'block',
    margin: '10px 0',
  },
});

const ITEMS_LIMIT = 8;

const defaultItems = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'dark orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
];

export const EmptySwatchExample = () => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const colorFocusTargetRef = React.useRef<HTMLButtonElement>(null);
  const [colorFocusTarget, setColorFocusTarget] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Array<{ color: string; value: string; 'aria-label': string }>>(defaultItems);
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
    setColorFocusTarget(newValue);
  };

  const resetColors = () => {
    setItems(defaultItems);
    setColorFocusTarget(selectedValue);
  };

  React.useEffect(() => {
    if (colorFocusTarget) {
      colorFocusTargetRef.current?.focus();
    }
  }, [colorFocusTarget]);

  return (
    <>
      <SwatchPicker
        aria-label="SwatchPicker with empty swatches"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {items.map(item => (
          <ColorSwatch key={item.value} ref={item.value === colorFocusTarget ? colorFocusTargetRef : null} {...item} />
        ))}
        {emptyItems.map((_, index) => (
          <EmptySwatch disabled key={index} aria-label="empty swatch" />
        ))}
      </SwatchPicker>

      <div className={styles.example} style={{ backgroundColor: selectedColor }} />
      <Label htmlFor="color-select">Add more colors:</Label>
      <input className={styles.input} ref={inputRef} type="color" id="color-select" name="color-select" />
      <Button
        id="add-new-color"
        className={styles.button}
        appearance="primary"
        disabled={items.length >= ITEMS_LIMIT}
        onClick={handleAddColor}
      >
        Add new color
      </Button>
      <Button id="reset-example" className={styles.button} onClick={resetColors}>
        Reset example
      </Button>
    </>
  );
};

EmptySwatchExample.parameters = {
  docs: {
    description: {
      story: 'Empty swatch is used for cases where new swatches can be added.',
    },
  },
};
