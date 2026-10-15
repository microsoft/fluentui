import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, RangeSlider, useId } from '@fluentui/react-components';

export const Size = (): JSXElement => {
  const mediumLabelId = useId('rangeslider-medium-label-');
  const smallLabelId = useId('rangeslider-small-label-');

  return (
    <>
      <Label id={mediumLabelId}>Medium Range Slider</Label>
      <RangeSlider aria-labelledby={mediumLabelId} size="medium" defaultValue={{ start: 30, end: 70 }} />

      <Label id={smallLabelId}>Small Range Slider</Label>
      <RangeSlider aria-labelledby={smallLabelId} size="small" defaultValue={{ start: 35, end: 65 }} />
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'RangeSlider is available in medium and small sizes. Medium is the default.',
    },
  },
};
