// ─── Compound Toast (standalone open/close) ──────────────────────────────────
export { Toast } from './Toast';
export { renderToast } from './renderToast';
export { useToast } from './useToast';
export { useToastContextValues } from './useToastContextValues';
export { ToastContext, useToastContext } from './toastContext';
export type { ToastProps, ToastState, ToastSlots, ToastContextValues } from './Toast.types';
export type { ToastContextValue, ToastOpenChangeData, ToastIntent } from './toastContext';

// ─── Sub-components ───────────────────────────────────────────────────────────
export { ToastTitle, renderToastTitle, useToastTitle } from './ToastTitle';
export type { ToastTitleBaseProps, ToastTitleBaseState, ToastTitleSlots } from './ToastTitle';

export { ToastBody, renderToastBody, useToastBody } from './ToastBody';
export type { ToastBodyBaseProps, ToastBodyBaseState, ToastBodySlots } from './ToastBody';

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
  ToastContainerContextValues,
  ToastContainerContextValue,
} from './ToastContainer';

// ─── Re-exported from @fluentui/react-toast for import convenience ────────────
export { useToastController } from '@fluentui/react-toast';
export type {
  ToastId,
  ToasterId,
  ToastStatus,
  ToastPosition,
  ToastPoliteness,
  DispatchToastOptions,
  UpdateToastOptions,
  ToastImperativeRef,
  ToastChangeHandler,
  ToastChangeData,
} from '@fluentui/react-toast';
