import * as React from 'react';
import { ColorSwatch, EmptySwatch, SwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';
import styles from './swatch-picker.module.css';

const ITEMS_LIMIT = 8;

const defaultItems = [
  { color: '#e11d48', value: '#e11d48', label: 'Red' },
  { color: '#f97316', value: '#f97316', label: 'Orange' },
  { color: '#84cc16', value: '#84cc16', label: 'Green' },
  { color: '#06b6d4', value: '#06b6d4', label: 'Cyan' },
];

export const EmptySwatchExample = (): React.ReactNode => {
  const [items, setItems] = React.useState(defaultItems);
  const [selectedValue, setSelectedValue] = React.useState(defaultItems[0].value);
  const [customColor, setCustomColor] = React.useState('#2563eb');
  const addedSwatchRef = React.useRef<HTMLButtonElement>(null);

  const emptyItems = Array.from({ length: ITEMS_LIMIT - items.length });

  const addColor = () => {
    const value = `${customColor}-${items.length}`;
    setItems(currentItems => [...currentItems, { color: customColor, value, label: customColor }]);
    setSelectedValue(value);
  };

  React.useEffect(() => {
    if (items.length > defaultItems.length) {
      addedSwatchRef.current?.focus();
    }
  }, [items.length]);

  return (
    <div className={styles.demo}>
      <SwatchPicker
        aria-label="SwatchPicker with empty swatches"
        selectedValue={selectedValue}
        onSelectionChange={(_, data) => setSelectedValue(data.selectedValue)}
        className={styles.emptyPicker}
      >
        {items.map((item, index) => (
          <ColorSwatch
            key={item.value}
            ref={index === items.length - 1 && items.length > defaultItems.length ? addedSwatchRef : undefined}
            color={item.color}
            value={item.value}
            aria-label={item.label}
            className={styles.swatch}
          />
        ))}
        {emptyItems.map((_, index) => (
          <EmptySwatch disabled key={index} aria-label="Empty swatch" className={styles.emptySwatch} />
        ))}
      </SwatchPicker>

      <div className={styles.selectedColor} style={{ backgroundColor: selectedValue.split('-')[0] }} />

      <div className={styles.actions}>
        <input
          type="color"
          value={customColor}
          aria-label="Custom color"
          className={styles.colorInput}
          onChange={event => setCustomColor(event.target.value)}
        />
        <button type="button" className={styles.button} disabled={items.length >= ITEMS_LIMIT} onClick={addColor}>
          Add new color
        </button>
        <button
          type="button"
          className={styles.button}
          disabled={items.length === defaultItems.length}
          onClick={() => {
            setItems(defaultItems);
            setSelectedValue(defaultItems[0].value);
          }}
        >
          Reset example
        </button>
      </div>
    </div>
  );
};

EmptySwatchExample.parameters = {
  docs: {
    description: {
      story: 'Empty swatches reserve space for colors that can be added later.',
    },
  },
};
