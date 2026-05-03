import { Toast, ToastTitle, ToastBody, ToastFooter, Toaster } from '@fluentui/react-headless-components-preview/toast';

import descriptionMd from './ToastDescription.md';

export { Default } from './ToastDefault.stories';
export { Intent } from './ToastIntent.stories';
export { DismissToast } from './ToastDismissToast.stories';
export { DismissToastWithAction } from './ToastDismissToastWithAction.stories';
export { UpdateToast } from './ToastUpdateToast.stories';
export { DismissAll } from './ToastDismissAll.stories';
export { CustomTimeout } from './ToastCustomTimeout.stories';
export { PauseOnHover } from './ToastPauseOnHover.stories';
export { PauseOnWindowBlur } from './ToastPauseOnWindowBlur.stories';
export { PauseAndPlay } from './ToastPauseAndPlay.stories';
export { ToastLifecycle } from './ToastLifecycle.stories';
export { MultipleToasters } from './ToastMultipleToasters.stories';
export { ProgressToast } from './ToastProgressToast.stories';

export default {
  title: 'Headless Components/Toast',
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
        component: descriptionMd,
      },
    },
  },
};
