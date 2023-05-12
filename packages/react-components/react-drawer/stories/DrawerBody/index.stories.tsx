import { DrawerBody } from '@fluentui/react-drawer';

import descriptionMd from './DrawerBodyDescription.md';
import bestPracticesMd from './DrawerBodyBestPractices.md';

export { Default } from './DrawerBodyDefault.stories';

export default {
  title: 'Preview Components/DrawerBody',
  component: DrawerBody,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
