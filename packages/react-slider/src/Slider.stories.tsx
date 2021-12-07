import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-make-styles';
import { Slider } from './index';
import { Label } from '@fluentui/react-label';
import type { SliderProps } from './index';
import type { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    width: '400px',
  },
  slider: {
    width: '500px',
    '--slider-thumb-size': '50px',
    '--slider-rail-size': '8px',
  },
  verticalWrapper: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },
});

const CustomMark = () => (
  <div
    style={{
      width: '2px',
      height: '8px',
      background: 'red',
      marginTop: '-2px',
    }}
  />
);

const CustomLabel = () => (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: 'red',
    }}
  />
);

export const BasicSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => setSliderValue(data.value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={'basic-slider'}>Basic Example</Label>
      <Slider input={{ id: 'basic-slider' }} />
      <Label htmlFor={'controlled-slider'}>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider
        value={sliderValue}
        min={10}
        max={200}
        step={10}
        keyboardStep={2}
        onChange={onSliderChange}
        input={{ id: 'controlled-slider' }}
      />
      <Label htmlFor={'snapping-slider'}>Snapping Example</Label>
      <Slider defaultValue={5} step={5} min={0} max={10} input={{ id: 'snapping-slider' }} />
      <Label htmlFor={'disabled-slider'}>Disabled Example</Label>
      <Slider defaultValue={30} disabled input={{ id: 'disabled-slider' }} />
      <Label htmlFor={'origin-slider'}>Origin Example</Label>
      <Slider defaultValue={8} origin={3} min={0} max={10} input={{ id: 'origin-slider' }} />
    </div>
  );
};

export const MarkedSliderExample = (props: SliderProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Slider marks={true} max={10} />
      <Label>Custom Mark Values</Label>
      <Slider marks={[3, 4, 8, 10]} max={10} />
      <Label>Mark Custom Label Example</Label>
      <Slider
        marks={[
          1,
          { value: 5, label: '5 oz' },
          {
            value: 7,
            label: <CustomLabel />,
          },
          { value: 9, label: '9 oz' },
        ]}
        max={10}
      />
      <Label>Disabled Marks</Label>
      <Slider disabled marks={[1, { value: 5, label: '5 oz' }, { value: 9, label: '9 oz' }]} max={10} />
      <Label>Custom Marks Example</Label>
      <Slider
        marks={[
          1,
          {
            value: 2,
            mark: <CustomMark />,
          },
          {
            value: 8,
            label: '8',
            mark: <CustomMark />,
          },
          {
            value: 9,
            mark: <CustomMark />,
          },
        ]}
        max={10}
      />
      <Label>Vertical Marks</Label>
      <div className={styles.verticalWrapper}>
        <Slider vertical marks max={10} />
        <Slider vertical marks={[2, 4, 7, 8, 10]} max={10} />
        <Slider vertical marks={[{ value: 6, label: '6' }]} max={10} disabled />
        <Slider
          vertical
          marks={[
            { value: 1, label: '1' },
            5,
            {
              value: 7,
              label: <CustomLabel />,
            },
            9,
          ]}
          max={10}
        />
      </div>
    </div>
  );
};

export const VerticalSliderExample = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => setSliderValue(data.value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={'vertical-basic-slider'}>Basic Example</Label>
      <Slider vertical input={{ id: 'vertical-basic-slider' }} />
      <Label htmlFor={'vertical-controlled-slider'}>Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider
        value={sliderValue}
        min={10}
        max={200}
        step={10}
        onChange={onSliderChange}
        vertical
        input={{ id: 'vertical-controlled-slider' }}
      />
      <Label htmlFor={'vertical-disabled-slider'}>Disabled Example</Label>
      <Slider defaultValue={50} disabled vertical input={{ id: 'vertical-disabled-slider' }} />
      <Label htmlFor={'vertical-origin-slider'}>Origin Example</Label>
      <Slider defaultValue={40} origin={60} vertical input={{ id: 'vertical-origin-slider' }} />
    </div>
  );
};

export const CustomSliderExample = (props: SliderProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={'custom-slider'}>Custom Styles</Label>
      <Slider defaultValue={4} className={styles.slider} input={{ id: 'custom-slider' }} />
      <Label htmlFor={'size-slider'}>Size Example</Label>
      <Slider defaultValue={2} size={'small'} input={{ id: 'size-slider' }} />
    </div>
  );
};

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;
