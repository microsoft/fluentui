import { AvatarGroup } from '@fluentui/react-avatar';

import descriptionMd from './AvatarGroupDescription.md';
import bestPracticesMd from './AvatarGroupBestPractices.md';

export { Default } from './AvatarGroupDefault.stories';
export { Layout } from './AvatarGroupLayout.stories';
export { SizeSpread } from './AvatarGroupSizeSpread.stories';
export { SizeStack } from './AvatarGroupSizeStack.stories';
export { SizePie } from './AvatarGroupSizePie.stories';
export { MaxAvatars } from './AvatarGroupMaxAvatars.stories';
export { Indicator } from './AvatarGroupIndicator.stories';
export { Color } from './AvatarGroupColor.stories';

export default {
  title: 'Preview Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
