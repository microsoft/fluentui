import { SpinButtonField } from '@fluentui/react-components/unstable';

import descriptionMd from './SpinButtonFieldDescription.md';

export { Default } from './SpinButtonFieldDefault.stories';

export default {
  title: 'Preview Components/Field/SpinButtonField',
  component: SpinButtonField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
