import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ToastData, ToastIntent } from '@fluentui/react-toast';
import type { ToastContextValue } from '../toastContext';
import type { ToastContextValues } from '../Toast.types';

export type { ToastContextValues as ToastContainerContextValues };

export type ToastContainerSlots = {
  root: Slot<'div'>;
};

/**
 * All fields from the state machine's ToastData object, plus the rendering extras
 * added by useToaster (visible, tryRestoreFocus).
 * ComponentProps<ToastContainerSlots> is required for ForwardRefComponent to infer
 * the correct ref element type (HTMLDivElement) from the root slot.
 */
export type ToastContainerProps = Omit<ComponentProps<ToastContainerSlots>, 'content'> &
  ToastData & {
    /** Whether the toast is currently in the visible set. */
    visible: boolean;
    /** Children — the toast content dispatched via dispatchToast(). */
    children?: React.ReactNode;
    /** Callback to restore focus after the toast closes. Provided by Toaster. */
    tryRestoreFocus: () => void;
  };

export type ToastContainerState = ComponentState<ToastContainerSlots> & {
  intent: ToastIntent | undefined;
  bodyId: string;
  titleId: string;
  /** Calls the state machine close(); used by context consumers (e.g. dismiss button). */
  close: () => void;
};

export type { ToastContextValue as ToastContainerContextValue };
