import * as React from 'react';
import { Radio } from '../index';

export const LabelBelow = () => <Radio label="Label below" labelPosition="below" />;
LabelBelow.storyName = 'Label Position: Below';
LabelBelow.parameters = {
  docs: {
    description: {
      story:
        'The label can be placed below the radio indicator.' +
        'This is used automatically inside `<RadioGroup layout="horizontalStacked">`',
    },
  },
};
