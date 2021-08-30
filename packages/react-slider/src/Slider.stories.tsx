import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Slider } from './index';
import { Label } from '@fluentui/react-label';
import type { SliderProps } from './index';
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
});

export const BasicSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => setSliderValue(data.value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider tooltipDisplay />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider
        value={sliderValue}
        min={10}
        max={200}
        step={1}
        keyboardStep={2}
        onChange={sliderOnChange}
        tooltipDisplay
      />
      <Label>Snapping Example</Label>
      <Slider defaultValue={5} step={5} min={0} max={10} tooltipDisplay />
      <Label>Disabled Example</Label>
      <Slider defaultValue={30} disabled tooltipDisplay />
      <Label>Origin Example</Label>
      <Slider defaultValue={8} origin={3} min={0} max={10} tooltipDisplay />
    </div>
  );
};

export const VerticalSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => setSliderValue(data.value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider vertical />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={10} max={200} step={10} onChange={sliderOnChange} vertical />
      <Label>Disabled Example</Label>
      <Slider defaultValue={50} disabled vertical />
      <Label>Origin Example</Label>
      <Slider defaultValue={40} origin={60} vertical />
    </div>
  );
};

export const CustomSliderExample = (props: SliderProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Custom Styles</Label>
      <Slider defaultValue={4} className={styles.slider} />
      <Label>Size Example</Label>
      <Slider defaultValue={2} size={'small'} />
    </div>
  );
};

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;
