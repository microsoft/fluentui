import { InfoButtonLabel } from '@fluentui/react-infobutton';

import descriptionMd from './InfoButtonLabelDescription.md';
import bestPracticesMd from './InfoButtonLabelBestPractices.md';

export { Default } from './InfoButtonLabelDefault.stories';

export default {
  title: 'Preview Components/InfoButtonLabel',
  component: InfoButtonLabel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
