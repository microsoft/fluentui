import { Tag } from '@fluentui/react-components';

import descriptionMd from './TagDescription.md';
import bestPracticesMd from './TagBestPractices.md';

export { Default } from './TagDefault.stories';
export { Icon } from './TagIcon.stories';
export { Media } from './TagMedia.stories';
export { SecondaryText } from './TagSecondaryText.stories';
export { Dismiss } from './TagDismiss.stories';
export { Shape } from './TagShape.stories';
export { Size } from './TagSize.stories';
export { Appearance } from './TagAppearance.stories';
export { Disabled } from './TagDisabled.stories';

export default {
  title: 'Components/Tag/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
