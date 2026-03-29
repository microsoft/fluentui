import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';
import { ToastContainerContextValue } from '../../contexts/toastContainerContext';

export type ToastTitleSlots = {
  root: NonNullable<Slot<'div'>>;
  media?: Slot<'div'>;
  action?: Slot<'div'>;
};

/**
 * ToastTitle Props
 */
export type ToastTitleProps = ComponentProps<ToastTitleSlots> & {};

/**
 * ToastTitle Props without design-only props.
 */
export type ToastTitleBaseProps = ToastTitleProps;

/**
 * State used in rendering ToastTitle
 */
export type ToastTitleState = ComponentState<ToastTitleSlots> &
  Pick<ToastContainerContextValue, 'intent'> & {
    backgroundAppearance: BackgroundAppearanceContextValue;
  };

/**
 * State used in rendering ToastTitle, without design-only state.
 */
export type ToastTitleBaseState = Omit<ToastTitleState, 'backgroundAppearance'>;
