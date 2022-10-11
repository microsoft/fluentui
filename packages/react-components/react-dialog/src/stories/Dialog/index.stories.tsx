import { Dialog, DialogSurface, DialogTitle, DialogActions, DialogTrigger } from '@fluentui/react-dialog';

import descriptionMd from './DialogDescription.md';
import bestPracticesMd from './DialogBestPractices.md';
import { ComponentMeta } from '@storybook/react';

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
export { TitleCustomAction } from './DialogTitleCustomAction.stories';
export { TitleNoAction } from './DialogTitleNoAction.stories';

export default {
  title: 'Preview Components/Dialog',
  component: Dialog,
  subcomponents: {
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogActions,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as ComponentMeta<typeof Dialog>;
