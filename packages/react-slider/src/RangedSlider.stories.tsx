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
  const [rangedSliderValue, setRangedSliderValue] = React.useState({ lowerValue: 10, upperValue: 20 });
  const styles = useStyles();

  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: { lowerValue: number; upperValue: number } },
  ) => {
    console.log(data.value);
    setRangedSliderValue(data.value);
  };

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <RangedSlider />
      <Label>
        Controlled Example [ Lower Value: {rangedSliderValue.lowerValue}, Upper Value: {rangedSliderValue.upperValue} ]
      </Label>
      <RangedSlider value={rangedSliderValue} min={0} max={50} step={10} onChange={sliderOnChange} marks />
      <Label>Vertical Ranged Slider</Label>
      <div className={styles.verticalWrapper}>
        <RangedSlider vertical marks />
        <RangedSlider vertical marks={[2, 4, 7, 8, 10]} max={10} />
      </div>
    </div>
  );
};

export default {
  title: 'Components/RangedSlider',
  component: RangedSlider,
} as Meta;
