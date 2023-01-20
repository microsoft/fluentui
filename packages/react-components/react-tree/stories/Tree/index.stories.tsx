import { Tree } from '@fluentui/react-tree';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

export { Default } from './TreeDefault.stories';
export { ControllingOpenAndClose } from './TreeControllingOpenAndClose.stories';
export { DefaultOpenTrees } from './TreeDefaultOpenTrees.stories';
export { Actions } from './TreeActions.stories';
export { Badges } from './TreeBadges.stories';
export { ExpandIcon } from './TreeExpandIcon.stories';
export { IconBefore } from './TreeIconBefore.stories';
export { IconAfter } from './TreeIconAfter.stories';
export { Size } from './TreeSize.stories';
export { Appearance } from './TreeAppearance.stories';

export default {
  title: 'Preview Components/Tree',
  component: Tree,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
