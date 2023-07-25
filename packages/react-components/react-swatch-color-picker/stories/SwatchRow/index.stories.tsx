import { SwatchRow } from '@fluentui/react-swatch-color-picker';

import descriptionMd from './SwatchRowDescription.md';
import bestPracticesMd from './SwatchRowBestPractices.md';

export { Default } from './SwatchRowDefault.stories';

export default {
  title: 'Preview Components/SwatchRow',
  component: SwatchRow,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
