import { InfoIcon } from '@fluentui/react-infobutton';

import descriptionMd from './InfoIconDescription.md';
import bestPracticesMd from './InfoIconBestPractices.md';

export { Default } from './InfoIconDefault.stories';

export default {
  title: 'Preview Components/InfoIcon',
  component: InfoIcon,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
