import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Slider, SliderProps } from './index';
import { Label } from '@fluentui/react';
import { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    width: '100px',
    backgroundColor: 'red',
  },
});

export const BasicSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(10);
  const sliderOnChange = (value: number) => setSliderValue(value);

  const styles = useStyles();

  return (
    <div>
      <Label>Basic Example</Label>
      <Slider />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={10} max={200} step={10} onChange={sliderOnChange} />
    </div>
  );
};

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;
