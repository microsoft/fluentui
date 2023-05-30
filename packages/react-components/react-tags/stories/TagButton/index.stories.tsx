import { TagButton } from '@fluentui/react-tags';

import descriptionMd from './TagButtonDescription.md';
import bestPracticesMd from './TagButtonBestPractices.md';

export { Default } from './TagButtonDefault.stories';
export { Icon } from './TagButtonIcon.stories';
export { Media } from './TagButtonMedia.stories';
export { SecondaryText } from './TagButtonSecondaryText.stories';
export { Dismiss } from './TagButtonDismiss.stories';
export { Shape } from './TagButtonShape.stories';

export default {
  title: 'Preview Components/Tag/TagButton',
  component: TagButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
