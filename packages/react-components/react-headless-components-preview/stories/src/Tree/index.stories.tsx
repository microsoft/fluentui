import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-headless-components-preview/tree';

import descriptionMd from './TreeDescription.md';
import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

import './tree.module.css';

export { Default } from './TreeDefault.stories';
export { OpenItemsControlled } from './TreeOpenItemsControlled.stories';
export { Multiselect } from './TreeMultiselect.stories';
export { SingleSelection } from './TreeSingleSelection.stories';
export { WithActions } from './TreeWithActions.stories';

export default {
  title: 'Components/Tree',
  component: Tree,
  subcomponents: { TreeItem, TreeItemLayout },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('Tree')].join('\n'),
      },
    },
  },
};
