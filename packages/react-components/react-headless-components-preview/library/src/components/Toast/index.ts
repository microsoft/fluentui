// ─── Compound Toast content ──────────────────────────────────────────────────
export { Toast } from './Toast';
export { renderToast } from './renderToast';
export { useToast } from './useToast';
export type { ToastProps, ToastState, ToastSlots } from './Toast.types';

// ─── Sub-components ───────────────────────────────────────────────────────────
export { ToastTitle, renderToastTitle, useToastTitle } from './ToastTitle';
export type { ToastTitleProps, ToastTitleState, ToastTitleSlots } from './ToastTitle';

export { ToastBody, renderToastBody, useToastBody } from './ToastBody';
export type { ToastBodyProps, ToastBodyState, ToastBodySlots } from './ToastBody';

export { ToastFooter, renderToastFooter, useToastFooter } from './ToastFooter';
export type { ToastFooterProps, ToastFooterSlots, ToastFooterState } from './ToastFooter';

// ─── Toaster DX (state-machine-driven) ───────────────────────────────────────
export { Toaster, renderToaster, useToaster } from './Toaster';
export type { ToasterProps, ToasterState } from './Toaster';

export {
  ToastContainer,
  renderToastContainer,
  useToastContainer,
  useToastContainerContextValues,
} from './ToastContainer';
export type {
  ToastContainerProps,
  ToastContainerSlots,
  ToastContainerState,
  ToastContainerContextValue,
} from './ToastContainer';

// ─── Re-exported from @fluentui/react-toast for import convenience ────────────
export { useToastController, useToastContainerContext } from '@fluentui/react-toast';
export type {
  ToastId,
  ToasterId,
  ToastIntent,
  ToastStatus,
  ToastPosition,
  ToastPoliteness,
  ToastImperativeRef,
  ToastChangeHandler,
  ToastChangeData,
} from '@fluentui/react-toast';
