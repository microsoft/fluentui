import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, RangeSlider, useId } from '@fluentui/react-components';

export const Default = (): JSXElement => {
  const labelId = useId('rangeslider-label-');

  return (
    <>
      <Label id={labelId}>Basic Range Slider Example</Label>
      <RangeSlider aria-labelledby={labelId} defaultValue={{ start: 20, end: 80 }} />
    </>
  );
};
