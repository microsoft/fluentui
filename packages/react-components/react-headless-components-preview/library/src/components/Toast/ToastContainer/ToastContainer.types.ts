import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ToastAnnounce, ToastData } from '@fluentui/react-toast';
import type { ToastContainerContextValue } from '@fluentui/react-toast';

export type { ToastContainerContextValue };

export type ToastContainerContextValues = {
  toast: ToastContainerContextValue;
};

export type ToastContainerSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type ToastContainerProps = Omit<ComponentProps<Partial<ToastContainerSlots>>, 'content'> &
  ToastData & {
    visible: boolean;
    tryRestoreFocus: () => void;
    /**
     * Announcer used to narrate this toast's text content to screen readers.
     * Supplied by the parent `Toaster`; consumers do not need to pass this directly.
     */
    announce?: ToastAnnounce;
  };

export type ToastContainerState = ComponentState<ToastContainerSlots> &
  Pick<ToastContainerProps, 'remove' | 'close' | 'updateId' | 'visible' | 'intent'> &
  Pick<ToastContainerContextValue, 'titleId' | 'bodyId'> & {
    running: boolean;
    nodeRef: React.Ref<HTMLDivElement>;
  };
