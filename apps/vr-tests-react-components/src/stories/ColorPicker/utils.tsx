import * as React from 'react';
import { ColorPicker, ColorArea, AlphaSlider, ColorSlider, type ColorPickerProps } from '@fluentui/react-color-picker';

import styles from './utils.module.css';

export const SampleColorPicker = (props: ColorPickerProps) => {
  return (
    <ColorPicker className={styles.example} {...props}>
      <ColorArea />
      <ColorSlider />
      <AlphaSlider />
    </ColorPicker>
  );
};
