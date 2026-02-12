import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, useId } from '@fluentui/react-components';
import { RangeSlider } from '@fluentui/react-slider';

export const Step = (): JSXElement => {
  const labelId = useId('rangeslider-step-label-');

  return (
    <>
      <Label id={labelId}>Step Example</Label>
      <RangeSlider aria-labelledby={labelId} step={5} min={0} max={50} defaultValue={{ start: 10, end: 40 }} />
    </>
  );
};

Step.parameters = {
  docs: {
    description: {
      story: 'Use the step prop so the start and end values always land on a multiple of the configured increment.',
    },
  },
};
