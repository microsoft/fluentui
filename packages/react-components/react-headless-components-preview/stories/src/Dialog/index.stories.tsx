import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview';

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
  subcomponents: { DialogSurface, DialogTrigger, DialogTitle, DialogHeader, DialogBody, DialogFooter },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
