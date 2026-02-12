import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, useId } from '@fluentui/react-components';
import { RangeSlider } from '@fluentui/react-slider';

export const Disabled = (): JSXElement => {
  const labelId = useId('rangeslider-disabled-label-');

  return (
    <>
      <Label id={labelId}>Disabled Example</Label>
      <RangeSlider aria-labelledby={labelId} defaultValue={{ start: 20, end: 60 }} disabled />
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A disabled RangeSlider ignores pointer, touch, and keyboard interactions.',
    },
  },
};
