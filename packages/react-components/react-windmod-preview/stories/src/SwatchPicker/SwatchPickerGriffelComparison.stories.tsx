import * as React from 'react';
import {
  ColorSwatch,
  EmptySwatch,
  FluentProvider,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
} from '@fluentui/react-windmod-preview';
import {
  ColorSwatch as GriffelColorSwatch,
  EmptySwatch as GriffelEmptySwatch,
  FluentProvider as GriffelFluentProvider,
  ImageSwatch as GriffelImageSwatch,
  SwatchPicker as GriffelSwatchPicker,
  SwatchPickerRow as GriffelSwatchPickerRow,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type Size = 'extra-small' | 'small' | 'medium' | 'large';
type Shape = 'rounded' | 'square' | 'circular';

type Family = {
  SwatchPicker: React.ComponentType<{
    size?: Size;
    shape?: Shape;
    spacing?: 'small' | 'medium';
    layout?: 'row' | 'grid';
    defaultSelectedValue?: string;
    'aria-label'?: string;
    children?: React.ReactNode;
  }>;
  SwatchPickerRow: React.ComponentType<{ children?: React.ReactNode }>;
  ColorSwatch: React.ComponentType<{
    color: string;
    value: string;
    borderColor?: string;
    disabled?: boolean;
    'aria-label'?: string;
  }>;
  ImageSwatch: React.ComponentType<{ src: string; value: string; 'aria-label'?: string }>;
  EmptySwatch: React.ComponentType<{ 'aria-label'?: string }>;
};

const windmod: Family = { SwatchPicker, SwatchPickerRow, ColorSwatch, ImageSwatch, EmptySwatch };

const griffel: Family = {
  SwatchPicker: GriffelSwatchPicker,
  SwatchPickerRow: GriffelSwatchPickerRow,
  ColorSwatch: GriffelColorSwatch,
  ImageSwatch: GriffelImageSwatch,
  EmptySwatch: GriffelEmptySwatch,
};

const sizes: Size[] = ['extra-small', 'small', 'medium', 'large'];
const shapes: Shape[] = ['rounded', 'square', 'circular'];

const swatch =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%228%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23038387%22%2F%3E%3C%2Fsvg%3E';

const Row = ({ family, size, shape }: { family: Family; size?: Size; shape?: Shape }): React.ReactNode => {
  const { SwatchPicker: Picker, ColorSwatch: Swatch } = family;

  return (
    <Picker size={size} shape={shape} defaultSelectedValue="b" aria-label="Swatches">
      <Swatch color="#D13438" value="a" aria-label="Red" />
      <Swatch color="#0F7B0F" value="b" aria-label="Green" />
      <Swatch color="#FFFFFF" borderColor="#D1D1D1" value="c" aria-label="White" />
    </Picker>
  );
};

const Mixed = ({ family }: { family: Family }): React.ReactNode => {
  const {
    SwatchPicker: Picker,
    SwatchPickerRow: PickerRow,
    ColorSwatch: Swatch,
    ImageSwatch: Image,
    EmptySwatch: Empty,
  } = family;

  return (
    <Picker layout="grid" defaultSelectedValue="a" aria-label="Mixed swatches">
      <PickerRow>
        <Swatch color="#D13438" value="a" aria-label="Red" />
        <Swatch color="#0078D4" value="b" disabled aria-label="Blue, unavailable" />
      </PickerRow>
      <PickerRow>
        <Image src={swatch} value="c" aria-label="Teal texture" />
        <Empty aria-label="No colour" />
      </PickerRow>
    </Picker>
  );
};

export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <span className={styles.header} />
    <span className={styles.header}>Windmod</span>
    <span className={styles.header}>Griffel</span>

    {sizes.map(size => (
      <React.Fragment key={size}>
        <span className={styles.label}>{size}</span>
        <FluentProvider>
          <Row family={windmod} size={size} />
        </FluentProvider>
        <GriffelFluentProvider theme={webLightTheme}>
          <Row family={griffel} size={size} />
        </GriffelFluentProvider>
      </React.Fragment>
    ))}

    {shapes.map(shape => (
      <React.Fragment key={shape}>
        <span className={styles.label}>{shape}</span>
        <FluentProvider>
          <Row family={windmod} shape={shape} />
        </FluentProvider>
        <GriffelFluentProvider theme={webLightTheme}>
          <Row family={griffel} shape={shape} />
        </GriffelFluentProvider>
      </React.Fragment>
    ))}

    <span className={styles.label}>mixed grid</span>
    <FluentProvider>
      <Mixed family={windmod} />
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <Mixed family={griffel} />
    </GriffelFluentProvider>
  </div>
);
