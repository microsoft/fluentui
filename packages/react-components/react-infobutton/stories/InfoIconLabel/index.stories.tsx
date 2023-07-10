import { InfoIconLabel } from '@fluentui/react-infobutton';

import descriptionMd from './InfoIconLabelDescription.md';
import bestPracticesMd from './InfoIconLabelBestPractices.md';

export { Default } from './InfoIconLabelDefault.stories';

export default {
  title: 'Preview Components/InfoIconLabel',
  component: InfoIconLabel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
