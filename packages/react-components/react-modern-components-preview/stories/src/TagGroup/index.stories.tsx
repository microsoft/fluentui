import { TagGroup } from '@fluentui/react-modern-components-preview/tag-group';

import descriptionMd from './TagGroupDescription.md';
import bestPracticesMd from './TagGroupBestPractices.md';

export { Default } from './TagGroupDefault.stories';
export { Dismiss } from './TagGroupDismiss.stories';
export { Sizes } from './TagGroupSizes.stories';
export { WithOverflow } from './TagGroupOverflow.stories';
export { Disabled } from './TagGroupDisabled.stories';
export { Select } from './TagGroupSelect.stories';

export default {
  title: 'Components/TagGroup/TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
