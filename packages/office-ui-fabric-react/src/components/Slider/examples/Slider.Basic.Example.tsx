import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { IStackTokens, Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { maxWidth: 300 } };
const stackTokens: IStackTokens = { childrenGap: 20 };
const sliderAriaValueText = (value: number) => `${value} percent`;
const sliderValueFormat = (value: number) => `${value}%`;

export const SliderBasicExample: React.FunctionComponent = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderOnChange = (value: number) => setSliderValue(value);
  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <Slider />
      <Slider label="Snapping slider example" min={0} max={50} step={10} defaultValue={20} showValue snapToStep />
      <Slider label="Disabled example" min={50} max={500} step={50} defaultValue={300} showValue disabled />
      <Slider label="Controlled example" max={10} value={sliderValue} showValue onChange={sliderOnChange} />
      <Slider
        label="Example with formatted value"
        max={100}
        ariaValueText={sliderAriaValueText}
        valueFormat={sliderValueFormat}
        showValue
      />
      <Slider label="Origin from zero" min={-5} max={5} step={1} defaultValue={2} showValue originFromZero />
    </Stack>
  );
};
