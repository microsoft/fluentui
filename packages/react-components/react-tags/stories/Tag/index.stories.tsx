import { Tag } from '@fluentui/react-tags';

import descriptionMd from './TagDescription.md';
import bestPracticesMd from './TagBestPractices.md';

export { Default } from './TagDefault.stories';
export { Icon } from './TagIcon.stories';
export { Media } from './TagMedia.stories';
export { SecondaryText } from './TagSecondaryText.stories';
export { Dismiss } from './TagDismiss.stories';
export { Shape } from './TagShape.stories';

export default {
  title: 'Preview Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
