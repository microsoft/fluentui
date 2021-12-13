import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Slider, SliderProps } from '../../../index';

export const Controlled = () => {
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange: SliderProps['onChange'] = (_, data) => setSliderValue(data.value);
  const controlId = useId('control');
  const controlledId = useId('controled');
  return (
    <>
      <Label htmlFor={controlId}>Control Slider [ Current Value: {sliderValue} ]</Label>
      <Slider value={sliderValue} min={20} max={200} onChange={onSliderChange} id={controlId} />

      <Label htmlFor={controlledId}>Controlled Slider</Label>
      <Slider value={sliderValue} min={20} max={200} id={controlledId} />
    </>
  );
};
