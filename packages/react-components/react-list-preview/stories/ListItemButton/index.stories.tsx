import { ListItemButton } from '@fluentui/react-list-preview';

import descriptionMd from './ListItemButtonDescription.md';
import bestPracticesMd from './ListItemButtonBestPractices.md';

export { Default } from './ListItemButtonDefault.stories';

export default {
  title: 'Preview Components/ListItemButton',
  component: ListItemButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
