import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-headless-components-preview';

import descriptionMd from './MessageBarDescription.md';

export { Default } from './MessageBarDefault.stories';
export { Intent } from './MessageBarIntent.stories';

export default {
  title: 'Headless Components/MessageBar',
  component: MessageBar,
  subcomponents: {
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
