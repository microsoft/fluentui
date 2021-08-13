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
  verticalWrapper: {
    display: 'flex',
    gap: '10px',
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
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider marks={true} />
      <Label>Custom Marks</Label>
      <Slider
        step={2}
        marks={[
          0,
          {
            value: 2,
            mark: <div style={{ width: '1px', height: '8px', background: 'green' }} />,
          },
          10,
        ]}
      />
      <Label>Custom Mark Label</Label>
      <Slider
        marks={[
          3,
          {
            value: 4,
            label: (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'red',
                }}
              />
            ),
          },
          8,
          10,
        ]}
      />
      <Label>Vertical Marks</Label>
      <div className={styles.verticalWrapper}>
        <Slider vertical marks />
        <Slider vertical marks={[2, 4, 7, 8, 10]} />
        <Slider
          vertical
          marks={[
            3,
            {
              value: 6,
              label: (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    background: 'red',
                  }}
                />
              ),
            },
            8,
            10,
          ]}
        />
      </div>
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
