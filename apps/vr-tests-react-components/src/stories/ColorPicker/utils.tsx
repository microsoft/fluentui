import * as React from 'react';
import { ColorPicker, ColorArea, AlphaSlider, ColorSlider, type ColorPickerProps } from '@fluentui/react-color-picker';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

export const SampleColorPicker = (props: ColorPickerProps) => {
  const styles = useStyles();
  return (
    <ColorPicker className={styles.example} {...props}>
      <ColorArea />
      <ColorSlider />
      <AlphaSlider />
    </ColorPicker>
  );
};
