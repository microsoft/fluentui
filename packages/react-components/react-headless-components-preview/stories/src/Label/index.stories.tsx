import { Label } from '@fluentui/react-headless-components-preview/label';

import descriptionMd from './LabelDescription.md';
export { Default } from './LabelDefault.stories';
export { Disabled } from './LabelDisabled.stories';
export { Required } from './LabelRequired.stories';

export default {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
