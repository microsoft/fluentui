import { useRestoreFocusSource } from '@fluentui/react-components';
import descriptionMd from './useRestoreFocusSourceDescription.md';

export { Default } from './Default.stories';
export { FocusRestoreHistory } from './FocusRestoreHistory';
export { UserRestoreFocus } from './UserRestoreFocus.stories';

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
