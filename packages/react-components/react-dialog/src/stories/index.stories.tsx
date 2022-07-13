import { Dialog } from '@fluentui/react-dialog';

import descriptionMd from './DialogDescription.md';
import bestPracticesMd from './DialogBestPractices.md';

export { Default } from './DialogDefault.stories';
export { NonModal } from './DialogNonModal.stories';
export { Alert } from './DialogAlert.stories';
export { Nested } from './DialogNested.stories';
export { NoFocusableElement } from './DialogNoFocusableElement.stories';
export { ChangeFocus } from './DialogChangeFocus.stories';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
