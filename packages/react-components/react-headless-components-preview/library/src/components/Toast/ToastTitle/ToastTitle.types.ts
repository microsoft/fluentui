import type { ToastTitleBaseState } from '@fluentui/react-toast';
export type { ToastTitleBaseProps as ToastTitleProps, ToastTitleSlots } from '@fluentui/react-toast';

export type ToastTitleState = ToastTitleBaseState & {
  media?: ToastTitleBaseState['media'] & {
    /**
     * The intent of the toast, used for styling purposes.
     */
    'data-intent'?: ToastTitleBaseState['intent'];
  };
};
