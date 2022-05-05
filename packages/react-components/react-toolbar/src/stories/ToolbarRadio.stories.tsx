import { ToolbarRadio } from '../index';

import descriptionMd from './ToolbarRadioDescription.md';
import bestPracticesMd from './ToolbarRadioBestPractices.md';

export { Default } from './ToolbarRadioDefault.stories';

export default {
  title: 'Components/ToolbarRadio',
  component: ToolbarRadio,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
