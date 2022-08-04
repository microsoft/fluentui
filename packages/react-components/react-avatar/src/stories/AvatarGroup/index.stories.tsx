import { AvatarGroup } from '@fluentui/react-avatar';

import descriptionMd from './AvatarGroupDescription.md';

export { Default } from './AvatarGroupDefault.stories';
export { Layout } from './AvatarGroupLayout.stories';
export { SizeSpread } from './AvatarGroupSizeSpread.stories';
export { SizeStack } from './AvatarGroupSizeStack.stories';
export { Indicator } from './AvatarGroupIndicator.stories';

export default {
  title: 'Preview Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
