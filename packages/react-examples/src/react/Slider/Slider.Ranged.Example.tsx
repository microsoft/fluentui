import * as React from 'react';
import { Slider, IStackTokens, Stack, IStackStyles } from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { maxWidth: 300 } };
const stackTokens: IStackTokens = { childrenGap: 20 };
const sliderAriaValueText = (value: number) => `${value} percent`;
const sliderValueFormat = (value: number) => `${value}%`;

export const SliderRangedExample: React.FunctionComponent = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [sliderLowerValue, setSliderLowerValue] = React.useState(0);
  const onChange = (_: unknown, range: [number, number]) => {
    setSliderLowerValue(range[0]);
    setSliderValue(range[1]);
  };
  return (
    <>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <Slider ranged label="Range slider" min={0} max={10} defaultValue={8} defaultLowerValue={2} />
        <Slider label="Disabled example" min={50} max={500} step={50} defaultValue={300} showValue disabled ranged />
        <Slider
          label="Controlled example"
          max={10}
          ranged
          value={sliderValue}
          lowerValue={sliderLowerValue}
          showValue
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChange}
        />
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
      <Stack horizontal tokens={stackTokens} styles={{ root: { height: 200 } }}>
        <Slider // prettier-ignore
          label="Range slider vertical"
          ranged
          min={1}
          max={5}
          step={1}
          defaultValue={2}
          showValue
          vertical
        />
      </Stack>
    </>
  );
};
