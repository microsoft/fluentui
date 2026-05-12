import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';
import type { ToastContainerContextValue } from '../../contexts/toastContainerContext';

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
 * State used in rendering ToastTitle
 */
export type ToastTitleState = ComponentState<ToastTitleSlots> &
  Pick<ToastContainerContextValue, 'intent'> & {
    backgroundAppearance: BackgroundAppearanceContextValue;
  };
