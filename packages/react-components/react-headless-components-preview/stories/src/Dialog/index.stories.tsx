import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';

import descriptionMd from './DialogDescription.md';
export { Default } from './DialogDefault.stories';
export { NonModal } from './DialogNonModal.stories';
export { Alert } from './DialogAlert.stories';
export { Controlled } from './DialogControlled.stories';
export { WithCloseButton } from './DialogWithCloseButton.stories';
export { KeepMounted } from './DialogKeepMounted.stories';
export { Nested } from './DialogNested.stories';
export { NoTrigger } from './DialogNoTrigger.stories';

export default {
  title: 'Headless Components/Dialog',
  component: Dialog,
  subcomponents: { DialogSurface, DialogTrigger, DialogTitle, DialogBody, DialogActions },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
