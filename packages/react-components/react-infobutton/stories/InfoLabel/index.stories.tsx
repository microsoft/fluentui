import { InfoLabel } from '@fluentui/react-infobutton';

import descriptionMd from './InfoLabelDescription.md';
import bestPracticesMd from './InfoLabelBestPractices.md';

export { Default } from './InfoLabelDefault.stories';

export default {
  title: 'Preview Components/InfoLabel',
  component: InfoLabel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
