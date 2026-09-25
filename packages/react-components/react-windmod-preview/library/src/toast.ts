export { Toast, toastClassNames, useToastStyles } from './components/Toast';
export type { ToastAppearance, ToastIntent, ToastProps, ToastSlots, ToastState } from './components/Toast';

export { ToastBody, toastBodyClassNames, useToastBodyStyles } from './components/ToastBody';
export type { ToastBodyProps, ToastBodySlots, ToastBodyState } from './components/ToastBody';

export { ToastFooter, toastFooterClassNames, useToastFooterStyles } from './components/ToastFooter';
export type { ToastFooterProps, ToastFooterSlots, ToastFooterState } from './components/ToastFooter';

export { ToastTitle, toastTitleClassNames, useToastTitleStyles } from './components/ToastTitle';
export type { ToastTitleProps, ToastTitleSlots, ToastTitleState } from './components/ToastTitle';

export { Toaster, toasterClassNames, useToasterStyles } from './components/Toaster';
export type { ToasterProps, ToasterState } from './components/Toaster';

/**
 * Headless building blocks, re-exported for consumers composing their own Toast.
 *
 * Includes the toast container and the imperative surface. windmod ships no styled ToastContainer —
 * the headless Toaster constructs those elements itself, so their look is a child rule inside the
 * Toaster's own position class. `useToastContainerContext().close` is the dismiss affordance in
 * place of Griffel's ToastTrigger.
 */
export {
  ToastContainer,
  renderToast,
  renderToastBody,
  renderToastContainer,
  renderToastFooter,
  renderToastTitle,
  renderToaster,
  useToast,
  useToastBody,
  useToastContainer,
  useToastContainerContext,
  useToastContainerContextValues,
  useToastController,
  useToastFooter,
  useToastTitle,
  useToaster,
} from '@fluentui/react-headless-components-preview/toast';
export type {
  ToastChangeData,
  ToastChangeHandler,
  ToastContainerContextValue,
  ToastContainerProps,
  ToastContainerSlots,
  ToastContainerState,
  ToastId,
  ToastImperativeRef,
  ToastPoliteness,
  ToastPosition,
  ToastStatus,
  ToasterId,
} from '@fluentui/react-headless-components-preview/toast';
