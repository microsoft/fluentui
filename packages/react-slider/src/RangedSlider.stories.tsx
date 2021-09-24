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

const CustomLabel = () => (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: 'red',
    }}
  />
);

export const BasicRangedSliderExample = (props: RangedSliderProps) => {
  const [rangedSliderValue, setRangedSliderValue] = React.useState<[number, number]>([10, 20]);
  const styles = useStyles();

  const onSliderChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: [number, number] },
  ) => setRangedSliderValue(data.value);

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <RangedSlider defaultValue={[40, 80]} />
      <Label>
        Controlled Example [ Lower Value: {rangedSliderValue[0]}, Upper Value: {rangedSliderValue[1]} ]
      </Label>
      <RangedSlider value={rangedSliderValue} min={0} max={50} step={10} onChange={onSliderChange} marks />
      <Label>Vertical Range</Label>
      <div className={styles.verticalWrapper}>
        <RangedSlider vertical marks max={10} />
        <RangedSlider vertical marks={[2, 4, 7, 8, 10]} max={10} />
      </div>
      <Label>Disabled Range</Label>
      <RangedSlider defaultValue={[20, 90]} disabled />
      <RangedSlider defaultValue={[1, 5]} max={10} marks disabled />
      <RangedSlider
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
  );
};

export default {
  title: 'Components/RangedSlider',
  component: RangedSlider,
} as Meta;
