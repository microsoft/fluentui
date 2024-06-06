import {
  MessageBar,
  MessageBarGroup,
  MessageBarBody,
  MessageBarTitle,
  MessageBarActions,
} from '@fluentui/react-components';

import descriptionMd from './MessageBarDescription.md';
import bestPracticesMd from './MessageBarBestPractices.md';

export { Default } from './Default.stories';
export { Intent } from './Intent.stories';
export { Shape } from './Shape.stories';
export { Actions } from './Actions.stories';
export { Dismiss } from './Dismiss.stories';
export { Animation } from './Animation.stories';
export { Reflow } from './Reflow.stories';
export { ManualLayout } from './ManualLayout.stories';

export default {
  title: 'Components/MessageBar',
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
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
