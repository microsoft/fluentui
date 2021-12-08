import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '@fluentui/react-label';
import { Slider, SliderProps } from '../../../index';

export const Controlled = () => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange: SliderProps['onChange'] = ev => setSliderValue(Number(ev.target.value));

  return (
    <>
      <Label htmlFor="control-slider">Control Slider [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={20} max={200} onChange={onSliderChange} id="controlled-slider" />

      <Label htmlFor="controlled-slider">Controlled Slider</Label>
      <Slider value={sliderValue} min={20} max={200} id="controlled-slider" />
    </>
  );
};
