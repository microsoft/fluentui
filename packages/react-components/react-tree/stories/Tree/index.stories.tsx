import { Tree } from '@fluentui/react-tree';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

export { Default } from './TreeDefault.stories';
export { ControllingOpenAndClose } from './TreeControllingOpenAndClose.stories';
export { ExpandCollapseIconOnly } from './TreeExpandCollapseIconOnly.stories';
export { DefaultOpenTrees } from './TreeDefaultOpenTrees.stories';
export { Actions } from './TreeActions.stories';
export { Aside } from './TreeAside.stories';
export { ExpandIcon } from './TreeExpandIcon.stories';
export { IconBefore } from './TreeIconBefore.stories';
export { IconAfter } from './TreeIconAfter.stories';
export { Layout } from './TreeLayout.stories';
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
