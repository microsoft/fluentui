import { Toolbar } from '../index';

import descriptionMd from './ToolbarDescription.md';
import bestPracticesMd from './ToolbarBestPractices.md';

export { Default } from './ToolbarDefault.stories';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
