import { Radio } from '../index';

import descriptionMd from './RadioDescription.md';

export { Default } from './RadioDefault.stories';
export { Name } from './RadioName.stories';
export { Disabled } from './RadioDisabled.stories';
export { LabelBelow } from './RadioLabelBelow.stories';

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
