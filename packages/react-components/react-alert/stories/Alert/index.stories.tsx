import { Alert } from '@fluentui/react-alert';
import descriptionMd from './AlertDescription.md';

export { Default } from './AlertDefault.stories';
export { Intent } from './AlertIntent.stories';
export { Icon } from './AlertIcon.stories';
export { Avatar } from './AlertAvatar.stories';
export { Action } from './AlertAction.stories';
export { Appearance } from './AlertAppearance.stories';

export default {
  title: 'Preview Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
