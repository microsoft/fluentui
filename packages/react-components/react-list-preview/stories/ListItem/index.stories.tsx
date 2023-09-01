import { ListItem } from '@fluentui/react-list-preview';

import descriptionMd from './ListItemDescription.md';
import bestPracticesMd from './ListItemBestPractices.md';

export { Default } from './ListItemDefault.stories';

export default {
  title: 'Preview Components/ListItem',
  component: ListItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
