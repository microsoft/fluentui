import { Dialog } from '@fluentui/react-dialog';

import descriptionMd from './DialogDescription.md';
import bestPracticesMd from './DialogBestPractices.md';

export { Default } from './DialogDefault.stories';
export { NonModal } from './DialogNonModal.stories';
export { Alert } from './DialogAlert.stories';
export { Nested } from './DialogNested.stories';
export { ScrollingLongContent } from './DialogScrollingLongContent.stories';
export { NoFocusableElement } from './DialogNoFocusableElement.stories';
export { ControllingOpenAndClose } from './DialogControllingOpenAndClose.stories';
export { ChangeFocus } from './DialogChangeFocus.stories';
export { TriggerOutsideDialog } from './DialogTriggerOutsideDialog.stories';
export { CustomTrigger } from './DialogCustomTrigger.stories';
export { WithForm } from './DialogWithForm.stories';

export default {
  title: 'Preview Components/Dialog/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
