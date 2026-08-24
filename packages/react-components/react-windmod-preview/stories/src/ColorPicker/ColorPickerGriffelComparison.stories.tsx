import * as React from 'react';
import { AlphaSlider, ColorArea, ColorPicker, ColorSlider, FluentProvider } from '@fluentui/react-windmod-preview';
import {
  AlphaSlider as GriffelAlphaSlider,
  ColorArea as GriffelColorArea,
  ColorPicker as GriffelColorPicker,
  ColorSlider as GriffelColorSlider,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type HsvColor = { h: number; s: number; v: number; a?: number };

const teal: HsvColor = { a: 0.5, h: 180, s: 0.5, v: 0.6 };

type Family = {
  AlphaSlider: React.ComponentType<Record<string, unknown>>;
  ColorArea: React.ComponentType<Record<string, unknown>>;
  ColorPicker: React.ComponentType<Record<string, unknown>>;
  ColorSlider: React.ComponentType<Record<string, unknown>>;
};

const windmod = { AlphaSlider, ColorArea, ColorPicker, ColorSlider } as unknown as Family;
const griffel = {
  AlphaSlider: GriffelAlphaSlider,
  ColorArea: GriffelColorArea,
  ColorPicker: GriffelColorPicker,
  ColorSlider: GriffelColorSlider,
} as unknown as Family;

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; render: (family: Family) => React.ReactNode }> = [
    { label: 'hue slider', render: F => <F.ColorSlider channel="hue" color={teal} /> },
    { label: 'saturation slider', render: F => <F.ColorSlider channel="saturation" color={teal} /> },
    { label: 'value slider', render: F => <F.ColorSlider channel="value" color={teal} /> },
    { label: 'vertical hue slider', render: F => <F.ColorSlider channel="hue" color={teal} vertical /> },
    { label: 'square slider', render: F => <F.ColorSlider color={teal} shape="square" /> },
    { label: 'alpha slider', render: F => <F.AlphaSlider color={teal} /> },
    { label: 'alpha slider, transparency', render: F => <F.AlphaSlider color={teal} transparency /> },
    { label: 'vertical alpha slider', render: F => <F.AlphaSlider color={teal} vertical /> },
    { label: 'colour area', render: F => <F.ColorArea color={teal} /> },
    { label: 'square colour area', render: F => <F.ColorArea color={teal} shape="square" /> },
    {
      label: 'composite picker',
      render: F => (
        <F.ColorPicker color={teal}>
          <F.ColorArea />
          <F.ColorSlider />
          <F.AlphaSlider />
        </F.ColorPicker>
      ),
    },
    {
      label: 'square composite picker',
      render: F => (
        <F.ColorPicker color={teal} shape="square">
          <F.ColorArea />
          <F.ColorSlider />
          <F.AlphaSlider />
        </F.ColorPicker>
      ),
    },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, render }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>{render(windmod)}</FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>{render(griffel)}</GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
