import { ProgressBar } from '@fluentui/react-headless-components-preview';

import descriptionMd from './ProgressBarDescription.md';

export { Default } from './ProgressBarDefault.stories';

export default {
  title: 'Headless Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
