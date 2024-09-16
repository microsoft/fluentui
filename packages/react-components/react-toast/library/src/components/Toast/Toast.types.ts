import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';

export type ToastSlots = {
  root: Slot<'div'>;
};

export type ToastContextValues = {
  backgroundAppearance: BackgroundAppearanceContextValue;
};

/**
 * Toast Props
 */
export type ToastProps = ComponentProps<ToastSlots> & {
  appearance?: BackgroundAppearanceContextValue;
};

/**
 * State used in rendering Toast
 */
export type ToastState = ComponentState<ToastSlots> & {
  backgroundAppearance: BackgroundAppearanceContextValue;
};
