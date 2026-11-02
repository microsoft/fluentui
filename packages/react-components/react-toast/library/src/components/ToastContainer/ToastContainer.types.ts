import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Announce } from '../AriaLive/AriaLive.types';
import type { Toast, ToastIntent } from '../../state';
import type { ToastContainerContextValue } from '../../contexts/toastContainerContext';
import type { TimerProps } from '../Timer/Timer';

export type ToastContainerContextValues = {
  toast: ToastContainerContextValue;
};

export type ToastContainerSlots = {
  root: NonNullable<Slot<'div'>>;
  timer: NonNullable<Slot<TimerProps>>;
};

/**
 * ToastContainer Props
 */
export type ToastContainerProps = Omit<ComponentProps<Partial<ToastContainerSlots>>, 'content'> &
  Toast & {
    visible: boolean;
    announce: Announce;
    intent: ToastIntent | undefined;
    tryRestoreFocus: () => void;
  };

/**
 * State used in rendering ToastContainer
 */
export type ToastContainerState = ComponentState<ToastContainerSlots> &
  Pick<ToastContainerProps, 'remove' | 'close' | 'updateId' | 'visible' | 'intent'> &
  Pick<ToastContainerContextValue, 'titleId' | 'bodyId'> & {
    /**
     * @deprecated Will be always "0".
     */
    transitionTimeout: number;
    timerTimeout: number;
    running: boolean;
    /**
     * @deprecated Will be always no-op.
     */
    onTransitionEntering: () => void;
    /**
     * @deprecated now merged with root ref
     */
    nodeRef: React.Ref<HTMLDivElement>;

    onMotionFinish?: (event: null, data: { direction: 'enter' | 'exit' }) => void;
  };
