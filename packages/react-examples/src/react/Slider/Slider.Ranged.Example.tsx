import * as React from 'react';
import { Slider, IStackTokens, Stack, IStackStyles } from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { maxWidth: 300 } };
const stackTokens: IStackTokens = { childrenGap: 20 };
const sliderAriaValueText = (value: number) => `${value} percent`;
const sliderValueFormat = (value: number) => `${value}%`;

export const SliderRangedExample: React.FunctionComponent = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderOnChange = (value: number) => setSliderValue(value);
  const onRangeChange = (range: [number, number]) => {
    console.log(range);
  };
  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <Slider ranged label="Range slider" min={0} max={100} defaultValue={10} onRangeChange={onRangeChange} />
      <Slider label="Disabled example" min={50} max={500} step={50} defaultValue={300} showValue disabled ranged />
      <Slider
        label="Example with formatted value"
        max={100}
        ariaValueText={sliderAriaValueText}
        valueFormat={sliderValueFormat}
        ranged
        showValue
      />
      <Slider label="Origin from zero" min={-5} max={5} step={1} defaultValue={2} showValue originFromZero ranged />
    </Stack>
  );
};
