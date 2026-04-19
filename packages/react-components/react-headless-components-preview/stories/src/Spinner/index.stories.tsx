import { Spinner } from '@fluentui/react-headless-components-preview';

import descriptionMd from './SpinnerDescription.md';

export { Default } from './SpinnerDefault.stories';
export { Labels } from './SpinnerLabels.stories';

export default {
  title: 'Headless Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
