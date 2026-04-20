import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
} from '@fluentui/react-headless-components-preview';

import descriptionMd from './MessageBarDescription.md';

export { Default } from './MessageBarDefault.stories';
export { Group } from './MessageBarGroup.stories';

export default {
  title: 'Headless Components/MessageBar',
  component: MessageBar,
  subcomponents: {
    MessageBarGroup,
    MessageBarBody,
    MessageBarTitle,
    MessageBarActions,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
