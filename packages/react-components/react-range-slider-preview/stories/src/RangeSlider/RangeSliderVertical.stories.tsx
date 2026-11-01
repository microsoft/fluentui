import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, useId } from '@fluentui/react-components';
import { RangeSlider } from '@fluentui/react-range-slider-preview';

export const Vertical = (): JSXElement => {
  const labelId = useId('rangeslider-vertical-label-');

  return (
    <>
      <Label id={labelId}>Vertical Example</Label>
      <RangeSlider
        aria-labelledby={labelId}
        vertical
        step={5}
        min={0}
        max={50}
        defaultValue={{ start: 15, end: 40 }}
        startInput={{ 'aria-label': 'Minimum' }}
        endInput={{ 'aria-label': 'Maximum' }}
      />
    </>
  );
};

Vertical.parameters = {
  docs: {
    description: {
      story: 'Set vertical to orient the RangeSlider vertically with the maximum value at the top of the rail.',
    },
  },
};
