import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';

export type ToastBodySlots = {
  root: Slot<'div'>;
  subtitle?: Slot<'div'>;
};

/**
 * ToastBody Props
 */
export type ToastBodyProps = ComponentProps<ToastBodySlots> & {};

/**
 * State used in rendering ToastBody
 */
export type ToastBodyState = ComponentState<ToastBodySlots> & {
  backgroundAppearance: BackgroundAppearanceContextValue;
};
