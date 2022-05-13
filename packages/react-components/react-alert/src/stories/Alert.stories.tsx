import { Alert } from '../index';
import descriptionMd from './AlertDescription.md';

export { Default } from './AlertDefault.stories';
export { Icon } from './AlertIcon.stories';
export { Intent } from './AlertIntent.stories';
export { Action } from './AlertAction.stories';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
