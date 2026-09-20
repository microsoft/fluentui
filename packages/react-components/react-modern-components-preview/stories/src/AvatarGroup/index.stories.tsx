import { Avatar } from '@fluentui/react-modern-components-preview/avatar';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
} from '@fluentui/react-modern-components-preview/avatar-group';

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
  title: 'Components/AvatarGroup/AvatarGroup',
  component: AvatarGroup,
  subcomponents: {
    AvatarGroupItem,
    Avatar,
    AvatarGroupPopover,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
