import { TagGroup } from '@fluentui/react-tags';

import descriptionMd from './TagGroupDescription.md';
import bestPracticesMd from './TagGroupBestPractices.md';

export { Default } from './TagGroupDefault.stories';
export { Dismiss } from './TagGroupDismiss.stories';
export { Sizes } from './TagGroupSizes.stories';

export default {
  title: 'Preview Components/Tag/TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
