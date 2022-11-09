import { ProgressField } from '@fluentui/react-components/unstable';

import descriptionMd from './ProgressFieldDescription.md';

export { Default } from './ProgressFieldDefault.stories';

export default {
  title: 'Preview Components/Field/ProgressField',
  component: ProgressField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
