import { DrawerHeader } from '@fluentui/react-drawer';

import descriptionMd from './DrawerHeaderDescription.md';
import bestPracticesMd from './DrawerHeaderBestPractices.md';

export { Default } from './DrawerHeaderDefault.stories';

export default {
  title: 'Preview Components/DrawerHeader',
  component: DrawerHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
