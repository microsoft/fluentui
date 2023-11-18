import { Slider } from '@fluentui/react/lib/Slider';
import * as React from 'react';

export const V8BasicExample = () => <Slider label="Basic v8 example" />;

export const V8SnappingExample = () => (
  <Slider label="Snapping slider v8 example" min={0} max={50} step={10} defaultValue={20} snapToStep />
);

export const V8ControlledExample = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderOnChange = (value: number) => setSliderValue(value);
  return <Slider label="Controlled v8 example" max={10} value={sliderValue} onChange={sliderOnChange} />;
};

export const V8FormattedValueExample = () => {
  const sliderAriaValueText = (value: number) => value + ' percent';
  const sliderValueFormat = (value: number) => value + '%';
  return (
    <Slider
      label="v8 Example with formatted value"
      max={100}
      ariaValueText={sliderAriaValueText}
      valueFormat={sliderValueFormat}
      showValue
    />
  );
};
