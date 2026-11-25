import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, useId } from '@fluentui/react-components';
import { RangeSlider } from '@fluentui/react-range-slider-preview';

export const Default = (): JSXElement => {
  const labelId = useId('rangeslider-label-');

  return (
    <>
      <Label id={labelId}>Price range</Label>
      <RangeSlider
        aria-labelledby={labelId}
        defaultValue={{ start: 20, end: 80 }}
        startInput={{ 'aria-label': 'Minimum price' }}
        endInput={{ 'aria-label': 'Maximum price' }}
      />
    </>
  );
};

Default.parameters = {
  docs: {
    description: {
      story:
        'The label names the RangeSlider group. Give each thumb its own label through the `startInput` and `endInput` slots so screen reader users can tell the lower and upper values apart.',
    },
  },
};
