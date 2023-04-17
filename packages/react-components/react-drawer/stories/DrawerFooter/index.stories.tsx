import { DrawerFooter } from '@fluentui/react-drawer';

import descriptionMd from './DrawerFooterDescription.md';
import bestPracticesMd from './DrawerFooterBestPractices.md';

export { Default } from './DrawerFooterDefault.stories';

export default {
  title: 'Preview Components/DrawerFooter',
  component: DrawerFooter,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
