import { TeachingPopoverButton } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverButtonDescription.md';
import bestPracticesMd from './TeachingPopoverButtonBestPractices.md';

export { Default } from './TeachingPopoverButtonDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverButton',
  component: TeachingPopoverButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
