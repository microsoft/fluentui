import { AvatarGroupOverflow } from '@fluentui/react-avatar';

import descriptionMd from './AvatarGroupOverflowDescription.md';
import bestPracticesMd from './AvatarGroupOverflowBestPractices.md';

export { Default } from './AvatarGroupOverflowDefault.stories';

export default {
  title: 'Preview Components/AvatarGroupOverflow',
  component: AvatarGroupOverflow,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
