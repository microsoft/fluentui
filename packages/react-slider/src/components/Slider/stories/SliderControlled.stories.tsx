import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { Slider } from '../../../index';
import type { SliderProps } from '../../../index';

export const Controlled = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => setSliderValue(data.value);

  return (
    <div>
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
    </div>
  );
};
