import { ToolbarRadioGroup } from '../index';

import descriptionMd from './ToolbarRadioGroupDescription.md';
import bestPracticesMd from './ToolbarRadioGroupBestPractices.md';

export { Default } from './ToolbarRadioGroupDefault.stories';

export default {
  title: 'Components/ToolbarRadioGroup',
  component: ToolbarRadioGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
