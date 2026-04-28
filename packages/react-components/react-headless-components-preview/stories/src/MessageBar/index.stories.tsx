import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-headless-components-preview/message-bar';

import descriptionMd from './MessageBarDescription.md';
import messageBarCss from './message-bar.module.css?raw';
import linkCss from '../Link/link.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource(
      { name: 'message-bar.module.css', source: messageBarCss },
      { name: 'link.module.css', source: linkCss },
    ),
  },
};
