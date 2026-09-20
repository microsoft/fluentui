import type { Meta } from '@storybook/react-webpack5';
import {
  Dialog,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';

import descriptionMd from './DialogDescription.md';
import bestPracticesMd from './DialogBestPractices.md';
import a11yMd from './DialogA11y.md';
import ssrMd from './DialogSSR.md';

export { Default } from './DialogDefault.stories';
export { NonModal } from './DialogNonModal.stories';
export { Alert } from './DialogAlert.stories';
export { ScrollingLongContent } from './DialogScrollingLongContent.stories';
export { KeepRenderedInTheDOM } from './DialogKeepRenderedInTheDOM.stories';
export { Actions } from './DialogActions.stories';
export { FluidActions } from './DialogFluidDialogActions.stories';
export { NoFocusableElement } from './DialogNoFocusableElement.stories';
export { ControllingOpenAndClose } from './DialogControllingOpenAndClose.stories';
export { ChangeFocus } from './DialogChangeFocus.stories';
export { TriggerOutsideDialog } from './DialogTriggerOutsideDialog.stories';
export { CustomTrigger } from './DialogCustomTrigger.stories';
export { WithForm } from './DialogWithForm.stories';
export { TitleCustomAction } from './DialogTitleCustomAction.stories';
export { Confirmation } from './DialogConfirmation.stories';
export { MotionCustom } from './DialogMotionCustom.stories';

export default {
  title: 'Components/Dialog/Dialog',
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
        component: [descriptionMd, bestPracticesMd, a11yMd, ssrMd].join('\n'),
      },
    },
  },
} as Meta;
