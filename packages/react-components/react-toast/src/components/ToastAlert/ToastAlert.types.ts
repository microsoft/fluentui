import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToastAlertSlots = {
  /**
   * The root slot is the top level container for the toastAlert component
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The icon slot renders the icon determined by the `icon` or `intent` prop
   */
  media?: Slot<'div'>;
  /**
   * The action slot renders a button that prompts the user to take action on the toastAlert
   */
  action?: Slot<'div'>;
};

/**
 * ToastAlert Props
 */
export type ToastAlertProps = ComponentProps<ToastAlertSlots> & {
  /**
   * The intent prop, if present, determines the icon to be rendered in the icon slot. The icon prop
   * overrides the intent prop
   */
  intent?: 'info' | 'success' | 'error' | 'warning';
  /**
   * The appearance of the ToastAlert.
   * @default 'primary'
   */
  appearance?: 'primary' | 'inverted';
};

/**
 * State used in rendering ToastAlert
 */
export type ToastAlertState = ComponentState<ToastAlertSlots> &
  Pick<ToastAlertProps, 'intent'> &
  Required<Pick<ToastAlertProps, 'appearance'>>;
