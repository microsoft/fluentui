import * as React from 'react';
import { ColorSwatch, SwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';
import styles from './swatch-picker.module.css';

const colors = [
  ['#e11d48', 'Red'],
  ['#f97316', 'Orange'],
  ['#84cc16', 'Green'],
  ['#06b6d4', 'Cyan'],
  ['#2563eb', 'Blue'],
  ['#9333ea', 'Purple'],
];

export const Default = (): React.ReactNode => {
  const [selected, setSelected] = React.useState(colors[0][0]);

  return (
    <div className={styles.demo}>
      <SwatchPicker
        aria-label="Colors"
        selectedValue={selected}
        onSelectionChange={(_, data) => setSelected(data.selectedValue)}
        className={styles.picker}
        focusMode="arrow"
        layout="row"
      >
        {colors.map(([color, label]) => (
          <ColorSwatch key={color} color={color} value={color} aria-label={label} className={styles.swatch} />
        ))}
      </SwatchPicker>
      <div className={styles.selectedColor} style={{ backgroundColor: selected }} />
    </div>
  );
};
