import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, useId } from '@fluentui/react-components';
import { RangeSlider } from '@fluentui/react-range-slider-preview';

export const Disabled = (): JSXElement => {
  const labelId = useId('rangeslider-disabled-label-');
  const thumbLabelId = useId('rangeslider-disabled-thumb-label-');

  return (
    <>
      <Label id={labelId}>Disabled Example</Label>
      <RangeSlider
        aria-labelledby={labelId}
        defaultValue={{ start: 20, end: 60 }}
        disabled
        startInput={{ 'aria-label': 'Minimum' }}
        endInput={{ 'aria-label': 'Maximum' }}
      />

      <Label id={thumbLabelId}>Price range, at least $20</Label>
      <RangeSlider
        aria-labelledby={thumbLabelId}
        defaultValue={{ start: 20, end: 60 }}
        startInput={{ 'aria-label': 'Minimum price', 'aria-valuetext': '$20', disabled: true }}
        endInput={{ 'aria-label': 'Maximum price' }}
      />
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story:
        'A disabled RangeSlider ignores pointer, touch, and keyboard interactions. To lock a single thumb, set `disabled` on its `startInput` or `endInput` slot: that thumb stays focusable and announces its value, keeps being submitted with a form, and pressing the rail moves the other thumb up to it.',
    },
  },
};
