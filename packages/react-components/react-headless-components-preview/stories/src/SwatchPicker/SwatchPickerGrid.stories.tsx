import * as React from 'react';
import { ColorSwatch, SwatchPicker, SwatchPickerRow } from '@fluentui/react-headless-components-preview/swatch-picker';
import styles from './swatch-picker.module.css';

const colors = [
  [
    ['#e11d48', 'Red'],
    ['#f97316', 'Orange'],
    ['#84cc16', 'Green'],
  ],
  [
    ['#06b6d4', 'Cyan'],
    ['#2563eb', 'Blue'],
    ['#9333ea', 'Purple'],
  ],
];

export const Grid = (): React.ReactNode => {
  const [selected, setSelected] = React.useState(colors[0][0][0]);

  return (
    <div className={styles.demo}>
      <SwatchPicker
        aria-label="Grid of colors"
        selectedValue={selected}
        onSelectionChange={(_, data) => setSelected(data.selectedValue)}
        layout="grid"
        className={styles.grid}
      >
        {colors.map((row, rowIndex) => (
          <SwatchPickerRow key={rowIndex} className={styles.gridRow}>
            {row.map(([color, label]) => (
              <ColorSwatch key={color} color={color} value={color} aria-label={label} className={styles.swatch} />
            ))}
          </SwatchPickerRow>
        ))}
      </SwatchPicker>
      <div className={styles.selectedColor} style={{ backgroundColor: selected }} />
    </div>
  );
};
