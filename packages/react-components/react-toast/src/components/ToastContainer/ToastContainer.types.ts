import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Announce } from '../AriaLive/AriaLive.types';
import { Toast, ToastIntent } from '../../state';
import { ToastContextValue } from '../../contexts/toastContext';
import { TimerProps } from '../Timer/Timer';

export type ToastContainerContextValues = {
  toast: ToastContextValue;
};

export type ToastContainerSlots = {
  root: NonNullable<Slot<'div'>>;
  timer: NonNullable<Slot<TimerProps>>;
};

/**
 * ToastContainer Props
 */
export type ToastContainerProps = ComponentProps<Partial<ToastContainerSlots>> &
  Pick<
    Toast,
    'close' | 'remove' | 'updateId' | 'data' | 'timeout' | 'politeness' | 'pauseOnHover' | 'pauseOnWindowBlur'
  > & {
    visible: boolean;
    announce: Announce;
    intent: ToastIntent | undefined;
  };

/**
 * State used in rendering ToastContainer
 */
export type ToastContainerState = ComponentState<ToastContainerSlots> &
  Pick<ToastContainerProps, 'remove' | 'close' | 'updateId' | 'visible' | 'intent'> & {
    transitionTimeout: number;
    timerTimeout: number;
    running: boolean;
    onTransitionEntering: () => void;
    nodeRef: React.Ref<HTMLDivElement>;
  };
