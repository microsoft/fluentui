import { InfoLabel } from '@fluentui/react-infobutton';

import descriptionMd from './InfoLabelDescription.md';

export { Default } from './InfoLabelDefault.stories';
export { Required } from './InfoLabelRequired.stories';
export { InField } from './InfoLabelInField.stories';

export default {
  title: 'Preview Components/InfoLabel',
  component: InfoLabel,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
