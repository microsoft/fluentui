import { AvatarGroupItem } from '../../index';

import descriptionMd from './AvatarGroupItemDescription.md';
import bestPracticesMd from './AvatarGroupItemBestPractices.md';

export { Default } from './AvatarGroupItemDefault.stories';

export default {
  title: 'Preview Components/AvatarGroupItem',
  component: AvatarGroupItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
