import { ProgressBar } from '@fluentui/react-headless-components-preview/progress-bar';

import descriptionMd from './ProgressBarDescription.md';
import progressBarCss from '../../../../../../bebop/components/progress-bar.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'progress-bar.module.css', source: progressBarCss }),
  },
};
