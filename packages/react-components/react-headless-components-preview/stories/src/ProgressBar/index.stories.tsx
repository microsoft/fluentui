import { ProgressBar } from '@fluentui/react-headless-components-preview/progress-bar';

import descriptionMd from './ProgressBarDescription.md';
export { Default } from './ProgressBarDefault.stories';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
