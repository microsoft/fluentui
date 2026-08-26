export { Toaster, toasterClassNames, useToasterStyles } from './components/Toaster';
export type { ToasterProps, ToasterState } from './components/Toaster';

/** Headless building blocks, re-exported for consumers composing their own Toaster. */
export { renderToaster, useToaster } from '@fluentui/react-headless-components-preview/toast';

/**
 * The toast container and the imperative surface. windmod ships no styled ToastContainer — the
 * headless Toaster constructs those elements itself, so their look is a child rule inside the
 * Toaster's own position class. `useToastContainerContext().close` is the dismiss affordance in
 * place of Griffel's ToastTrigger.
 */
export {
  ToastContainer,
  renderToastContainer,
  useToastContainer,
  useToastContainerContext,
  useToastContainerContextValues,
  useToastController,
} from '@fluentui/react-headless-components-preview/toast';
export type {
  ToastChangeData,
  ToastChangeHandler,
  ToastContainerContextValue,
  ToastContainerProps,
  ToastContainerSlots,
  ToastContainerState,
  ToasterId,
  ToastId,
  ToastImperativeRef,
  ToastPoliteness,
  ToastPosition,
  ToastStatus,
} from '@fluentui/react-headless-components-preview/toast';
