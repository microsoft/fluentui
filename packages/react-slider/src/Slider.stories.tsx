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
    '--slider-rail-size': '8px',
  },
  verticalWrapper: {
    display: 'flex',
    gap: '10px',
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
      <Slider />
      <Label>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={10} max={200} step={1} keyboardStep={2} onChange={sliderOnChange} />
      <Label>Snapping Example</Label>
      <Slider defaultValue={5} step={5} min={0} max={10} />
      <Label>Disabled Example</Label>
      <Slider defaultValue={30} disabled />
      <Label>Origin Example</Label>
      <Slider defaultValue={8} origin={3} min={0} max={10} />
    </div>
  );
};

export const MarkedSliderExample = (props: SliderProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider marks={true} max={10} />
      <Label>Custom Marks</Label>
      <Slider
        step={2}
        max={10}
        marks={[
          {
            value: 2,
            mark: <div style={{ width: '1px', height: '8px', background: 'green', marginTop: '-2px' }} />,
          },
          6,
          8,
        ]}
      />
      <Label>Custom Mark Label</Label>
      <Slider
        max={10}
        marks={[
          { value: 0, label: '0 oz' },
          { value: 2, label: '2 oz' },
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
          { value: 8, label: '8 oz' },
          { value: 10, label: '10 oz' },
        ]}
        ariaValueText={value => value + 'ounces'}
      />
      <Label>Disabled Mark Label</Label>
      <Slider
        disabled
        max={10}
        marks={[
          { value: 2, label: '2 oz' },
          { value: 5, label: '5 oz' },
          { value: 8, label: '8 oz' },
        ]}
        ariaValueText={value => value + 'ounces'}
      />
      <Label>Vertical Marks</Label>
      <div className={styles.verticalWrapper}>
        <Slider vertical max={10} marks />
        <Slider vertical max={10} marks={[2, 4, 7, 8, 10]} />
        <Slider
          vertical
          max={10}
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
      <Slider defaultValue={4} className={styles.slider} max={10} />
      <Label>Size Example</Label>
      <Slider defaultValue={2} size={'small'} marks max={10} />
    </div>
  );
};

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;
