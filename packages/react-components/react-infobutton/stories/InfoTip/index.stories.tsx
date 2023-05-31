import { InfoTip } from '@fluentui/react-infobutton';

import descriptionMd from './InfoTipDescription.md';
import bestPracticesMd from './InfoTipBestPractices.md';

export { Default } from './InfoTipDefault.stories';

export default {
  title: 'Preview Components/InfoTip',
  component: InfoTip,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
