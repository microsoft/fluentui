import { NavDrawer } from '@fluentui/react-nav-preview';

import descriptionMd from './NavDrawerDescription.md';
import bestPracticesMd from './NavDrawerBestPractices.md';

export { NavDrawerOverlay } from './NavDrawerOverlay.stories';
export { NavDrawerInline } from './NavDrawerInline.stories';

export default {
  title: 'Preview Components/NavDrawer',
  component: NavDrawer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
