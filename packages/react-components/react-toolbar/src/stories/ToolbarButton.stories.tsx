import { ToolbarButton } from '../index';

import descriptionMd from './ToolbarButtonDescription.md';
import bestPracticesMd from './ToolbarButtonBestPractices.md';

export { Default } from './ToolbarButtonDefault.stories';

export default {
  title: 'Components/ToolbarButton',
  component: ToolbarButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
