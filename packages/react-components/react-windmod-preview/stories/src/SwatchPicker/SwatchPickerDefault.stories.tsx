import * as React from 'react';
import {
  ColorSwatch,
  EmptySwatch,
  FluentProvider,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
} from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const sizes = ['extra-small', 'small', 'medium', 'large'] as const;
const shapes = ['rounded', 'square', 'circular'] as const;

const swatch =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%228%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23038387%22%2F%3E%3C%2Fsvg%3E';

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <SwatchPicker key={size} size={size} defaultSelectedValue="b" aria-label={`${size} swatches`}>
            <ColorSwatch color="#D13438" value="a" aria-label="Red" />
            <ColorSwatch color="#0F7B0F" value="b" aria-label="Green" />
            <ColorSwatch color="#0078D4" value="c" aria-label="Blue" />
          </SwatchPicker>
        ))}
      </div>

      <div className={styles.row}>
        {shapes.map(shape => (
          <SwatchPicker key={shape} shape={shape} defaultSelectedValue="a" aria-label={`${shape} swatches`}>
            <ColorSwatch color="#D13438" value="a" aria-label="Red" />
            <ColorSwatch color="#0F7B0F" value="b" aria-label="Green" />
          </SwatchPicker>
        ))}
      </div>

      <div className={styles.row}>
        <SwatchPicker spacing="small" aria-label="Tight spacing">
          <ColorSwatch color="#D13438" value="a" aria-label="Red" />
          <ColorSwatch color="#0F7B0F" value="b" aria-label="Green" />
        </SwatchPicker>
        <SwatchPicker spacing="medium" aria-label="Default spacing">
          <ColorSwatch color="#D13438" value="a" aria-label="Red" />
          <ColorSwatch color="#0F7B0F" value="b" aria-label="Green" />
        </SwatchPicker>
      </div>

      <div className={styles.row}>
        <SwatchPicker layout="grid" defaultSelectedValue="a" aria-label="Grid of swatches">
          <SwatchPickerRow>
            <ColorSwatch color="#D13438" value="a" aria-label="Red" />
            <ColorSwatch color="#0F7B0F" value="b" aria-label="Green" />
          </SwatchPickerRow>
          <SwatchPickerRow>
            <ColorSwatch color="#0078D4" value="c" aria-label="Blue" />
            <ColorSwatch color="#FFFFFF" borderColor="#D1D1D1" value="d" aria-label="White" />
          </SwatchPickerRow>
        </SwatchPicker>
      </div>

      <div className={styles.row}>
        <SwatchPicker aria-label="Disabled swatches">
          <ColorSwatch color="#D13438" value="a" disabled aria-label="Red, unavailable" />
          <ColorSwatch color="#0F7B0F" value="b" aria-label="Green" />
        </SwatchPicker>
      </div>

      <div className={styles.row}>
        <SwatchPicker aria-label="Image and empty swatches">
          <ImageSwatch src={swatch} value="a" aria-label="Teal texture" />
          <EmptySwatch aria-label="No colour" />
        </SwatchPicker>
      </div>
    </div>
  </FluentProvider>
);
