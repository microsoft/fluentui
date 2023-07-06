import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Announce } from '../AriaLive/AriaLive.types';
import { Toast, ToastIntent } from '../../state';
import { ToastContainerContextValue } from '../../contexts/toastContainerContext';
import { TimerProps } from '../Timer/Timer';

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
export type ToastContainerProps = ComponentProps<Partial<ToastContainerSlots>> &
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
    transitionTimeout: number;
    timerTimeout: number;
    running: boolean;
    onTransitionEntering: () => void;
    nodeRef: React.Ref<HTMLDivElement>;
  };
