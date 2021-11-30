import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider, SliderProps } from '../../../index';

export const Controlled = () => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange: SliderProps['onChange'] = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => setSliderValue(data.value);

  return (
    <>
      <Label htmlFor="controlled-slider">Controlled Example [ Current Value: {sliderValue} ]</Label>
      <Slider
        value={sliderValue}
        min={20}
        max={200}
        step={20}
        keyboardStep={10}
        onChange={onSliderChange}
        input={{ id: 'controlled-slider' }}
      />
    </>
  );
};
