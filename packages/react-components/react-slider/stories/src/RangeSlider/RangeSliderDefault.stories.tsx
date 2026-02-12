import * as React from 'react';
import { Label, useId } from '@fluentui/react-components';
import { RangeSlider, RangeSliderProps } from '@fluentui/react-slider';

export const Default = (props: Partial<RangeSliderProps>) => {
  const labelId = useId('rangeslider-label-');

  return (
    <>
      <Label id={labelId}>Basic Range Slider Example</Label>
      <RangeSlider aria-labelledby={labelId} defaultValue={{ start: 20, end: 80 }} {...props} />
    </>
  );
};
