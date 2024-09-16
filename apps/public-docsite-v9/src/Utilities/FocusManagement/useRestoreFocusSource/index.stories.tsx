import { useRestoreFocusSource } from '@fluentui/react-components';
import descriptionMd from './useRestoreFocusSourceDescription.md';

export { Default } from './Default.stories.stories';
export { FocusRestoreHistory } from './FocusRestoreHistory.stories';
export { UserRestoreFocus } from './UserRestoreFocus.stories.stories';

export default {
  title: 'Utilities/Focus Management/useRestoreFocusSource',
  component: useRestoreFocusSource,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
