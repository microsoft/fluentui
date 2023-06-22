import { Toast, ToastTitle, ToastBody, ToastFooter, Toaster } from '@fluentui/react-toast';
export { Default } from './Default.stories';
export { Intent } from './Intent.stories';
export { DefaultToastOptions } from './DefaultToastOptions.stories';
export { CustomTimeout } from './CustomTimeout.stories';
export { DismissToastWithAction } from './DismissToastWithAction.stories';
export { ToastPositions } from './ToastPositions.stories';
export { Offset } from './Offset.stories';
export { DismissToast } from './DismissToast.stories';
export { DismissAll } from './DismissAll.stories';
export { PauseOnWindowBlur } from './PauseOnWindowBlur.stories';
export { PauseOnHover } from './PauseOnHover.stories';
export { ToastLifecycle } from './ToastLifecycle.stories';
export { UpdateToast } from './UpdateToast.stories';
export { MultipleToasters } from './MultipleToasters.stories';
export { ToasterLimit } from './ToasterLimit.stories';
export { CustomAnnounce } from './CustomAnnounce.stories';

import descriptionMd from './ToastDescription.md';

export default {
  title: 'Preview Components/Toast',
  component: Toast,
  subcomponents: {
    ToastTitle,
    ToastBody,
    ToastFooter,
    Toaster,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
