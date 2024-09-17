import * as React from 'react';
import { useId, Button, Label, Slider } from '@fluentui/react-components';
import type { SliderProps } from '@fluentui/react-components';

export const Controlled = () => {
  const id = useId();
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange: SliderProps['onChange'] = (_, data) => setSliderValue(data.value);
  const resetSlider = () => setSliderValue(0);
  return (
    <>
      <Label htmlFor={id}>Control Slider [ Current Value: {sliderValue} ]</Label>
      <Slider
        aria-valuetext={`Value is ${sliderValue}`}
        value={sliderValue}
        min={20}
        max={200}
        onChange={onSliderChange}
        id={id}
      />
      <Button onClick={resetSlider}>Reset</Button>
    </>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: `A slider can be a controlled input where the slider value is stored in state
      and updated with \`onChange\`. This is also useful for setting custom aria-valuetext`,
    },
  },
};
