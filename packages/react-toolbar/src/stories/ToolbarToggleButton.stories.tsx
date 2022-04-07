import { ToolbarToggleButton } from '../index';

import descriptionMd from './ToolbarToggleButtonDescription.md';
import bestPracticesMd from './ToolbarToggleButtonBestPractices.md';

export { Default } from './ToolbarToggleButtonDefault.stories';

export default {
  title: 'Components/ToolbarToggleButton',
  component: ToolbarToggleButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
