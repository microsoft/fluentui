import { Dialog, DialogSurface, DialogTitle, DialogActions, DialogTrigger } from '@fluentui/react-components';

import descriptionMd from './DialogDescription.md';
import bestPracticesMd from './DialogBestPractices.md';
import a11yMd from './DialogA11y.md';

export { Default } from './DialogDefault.stories';
export { NonModal } from './DialogNonModal.stories';
export { Alert } from './DialogAlert.stories';
export { ScrollingLongContent } from './DialogScrollingLongContent.stories';
export { Actions } from './DialogActions.stories';
export { FluidActions } from './DialogFluidDialogActions.stories';
export { NoFocusableElement } from './DialogNoFocusableElement.stories';
export { ControllingOpenAndClose } from './DialogControllingOpenAndClose.stories';
export { ChangeFocus } from './DialogChangeFocus.stories';
export { TriggerOutsideDialog } from './DialogTriggerOutsideDialog.stories';
export { CustomTrigger } from './DialogCustomTrigger.stories';
export { WithForm } from './DialogWithForm.stories';
export { TitleCustomAction } from './DialogTitleCustomAction.stories';
export { TitleNoAction } from './DialogTitleNoAction.stories';
export { Confirmation } from './DialogConfirmation.stories';

// Typing with Meta<typeof Dialog> generates a type error for the `subcomponents` property.
// https://github.com/storybookjs/storybook/issues/27535
//
// TODO: bring back typing when the issue is resolved
const metadata = {
  title: 'Components/Dialog',
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
        component: [descriptionMd, bestPracticesMd, a11yMd].join('\n'),
      },
    },
  },
};

export default metadata;
