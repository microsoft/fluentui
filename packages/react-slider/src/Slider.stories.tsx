import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Slider, SliderProps } from './index';
import { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    width: '100px',
    backgroundColor: 'red',
  },
});

export const BasicSliderExample = (props: SliderProps) => {
  const styles = useStyles();
  return <Slider min={0} max={50} step={10} defaultValue={50} />;
};

export const ControlledSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderRef = React.useRef(null);
  const sliderOnChange = (value: number) => setSliderValue(value);

  const onClick = () => {
    console.log(sliderRef?.current.value);
  };

  return <Slider ref={sliderRef} value={sliderValue} min={0} max={50} onClick={onClick} onChange={sliderOnChange} />;
};

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;
