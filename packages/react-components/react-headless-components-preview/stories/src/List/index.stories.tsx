import { List, ListItem } from '@fluentui/react-headless-components-preview/list';

import descriptionMd from './ListDescription.md';
import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

import './list.module.css';

export { Default } from './ListDefault.stories';
export { SingleSelection } from './ListSingleSelection.stories';
export { Multiselect } from './ListMultiselect.stories';
export { SecondaryContentRight } from './ListSecondaryContentRight.stories';
export { SecondaryContentUnder } from './ListSecondaryContentUnder.stories';
export { ActionItems } from './ListActionItems.stories';

export default {
  title: 'Components/List',
  component: List,
  subcomponents: { ListItem },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('List')].join('\n'),
      },
    },
  },
};
