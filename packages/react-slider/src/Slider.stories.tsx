import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Slider, SliderProps } from './index';
import { Label } from '@fluentui/react-label';
import { Meta } from '@storybook/react';

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
    '--slider-color': 'green',
  },
});

export const BasicSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const sliderOnChange = (value: number) => setSliderValue(value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={10} max={200} step={10} onChange={sliderOnChange} />
      <Label>Custom Styles</Label>
      <Slider defaultValue={4} className={styles.slider} />
      <Label>Disabled Example</Label>
      <Slider defaultValue={3} disabled />
      <Label>Origin Example</Label>
      <Slider defaultValue={8} origin={3} />
    </div>
  );
};

export const MarkedSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const sliderOnChange = (value: number) => setSliderValue(value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider marks step={2} />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={10} max={200} step={10} onChange={sliderOnChange} marks />
      <Label>Custom Marked Steps</Label>
      <Slider marks={[1, 4, 5, 8]} />
      <Label>Mark Labels</Label>
      <Slider
        marks={[
          10,
          {
            value: 9,
            label: (
              <img
                src="https://s3.amazonaws.com/freecodecamp/relaxing-cat.jpg"
                alt="The cute kitten looking up hella cute"
                style={{ width: '100px', height: '100px' }}
              />
            ),
          },
        ]}
      />
      <Label>Vertical Marks</Label>
      <Slider marks vertical step={2} />
    </div>
  );
};

export const VerticalSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const sliderOnChange = (value: number) => setSliderValue(value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Slider defaultValue={3} vertical />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={10} max={200} step={10} onChange={sliderOnChange} vertical />
      <Label>Disabled Example</Label>
      <Slider defaultValue={8} disabled vertical />
      <Label>Origin Example</Label>
      <Slider defaultValue={8} origin={3} vertical />
    </div>
  );
};

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;
