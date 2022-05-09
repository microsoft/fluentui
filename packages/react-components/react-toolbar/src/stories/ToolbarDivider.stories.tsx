import { ToolbarDivider } from '../index';

import descriptionMd from './ToolbarDividerDescription.md';
import bestPracticesMd from './ToolbarDividerBestPractices.md';

export { Default } from './ToolbarDividerDefault.stories';

export default {
  title: 'Components/ToolbarDivider',
  component: ToolbarDivider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
