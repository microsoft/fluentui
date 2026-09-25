import type {
  ToastProps as ToastBaseProps,
  ToastState as ToastBaseState,
} from '@fluentui/react-headless-components-preview/toast';

export type { ToastIntent, ToastSlots } from '@fluentui/react-headless-components-preview/toast';

export type ToastAppearance = 'brand' | 'inverted';

export type ToastProps = ToastBaseProps & {
  /** The background appearance used by the toast and its content. */
  appearance?: ToastAppearance;
};

export type ToastState = ToastBaseState & {
  appearance: ToastProps['appearance'];
  root: ToastBaseState['root'] & {
    'data-appearance'?: ToastAppearance;
  };
};
