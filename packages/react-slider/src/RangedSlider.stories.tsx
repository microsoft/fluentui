import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { RangedSlider } from './index';
import { Label } from '@fluentui/react-label';
import type { RangedSliderProps } from './index';
import type { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '400px',
  },
  slider: {
    width: '500px',
    '--slider-thumb-size': '50px',
    '--slider-rail-size': '8px',
  },
  verticalWrapper: {
    display: 'flex',
    gap: '10px',
  },
});

export const BasicRangedSliderExample = (props: RangedSliderProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <RangedSlider />
    </div>
  );
};

export default {
  title: 'Components/RangedSlider',
  component: RangedSlider,
} as Meta;
