import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';

import descriptionMd from './DialogDescription.md';
import dialogCss from '../../../../../../bebop/components/dialog.module.css?raw';
import checkboxCss from '../../../../../../bebop/components/checkbox.module.css?raw';
import textareaCss from '../../../../../../bebop/components/textarea.module.css?raw';
import inputCss from '../../../../../../bebop/components/input.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource(
      { name: 'dialog.module.css', source: dialogCss },
      { name: 'checkbox.module.css', source: checkboxCss },
      { name: 'textarea.module.css', source: textareaCss },
      { name: 'input.module.css', source: inputCss },
    ),
  },
};
