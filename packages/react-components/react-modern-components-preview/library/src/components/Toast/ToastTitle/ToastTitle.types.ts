import type {
  ToastTitleProps as ToastTitleBaseProps,
  ToastTitleState as ToastTitleBaseState,
} from '@fluentui/react-headless-components-preview/toast';

export type { ToastTitleSlots } from '@fluentui/react-headless-components-preview/toast';

export type ToastTitleProps = ToastTitleBaseProps;

export type ToastTitleState = ToastTitleBaseState & {
  media?: ToastTitleBaseState['media'] & {
    'data-intent'?: ToastTitleBaseState['intent'];
  };
};
