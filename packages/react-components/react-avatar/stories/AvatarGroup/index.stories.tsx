import { AvatarGroup } from '@fluentui/react-components';

import bestPracticesMd from './AvatarGroupBestPractices.md';
import descriptionMd from './AvatarGroupDescription.md';

export { Default } from './AvatarGroupDefault.stories';
export { Layout } from './AvatarGroupLayout.stories';
export { Indicator } from './AvatarGroupIndicator.stories';
export { SizeSpread } from './AvatarGroupSizeSpread.stories';
export { SizeStack } from './AvatarGroupSizeStack.stories';
export { SizePie } from './AvatarGroupSizePie.stories';
export { Tooltip } from './AvatarGroupTooltip.stories';

export default {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
