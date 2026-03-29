import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';
import type { ToastIntent } from '../../state/types';

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
 * Toast Props without design-only props.
 */
export type ToastBaseProps = Omit<ToastProps, 'appearance'>;

/**
 * State used in rendering Toast
 */
export type ToastState = ComponentState<ToastSlots> & {
  backgroundAppearance: BackgroundAppearanceContextValue;
  intent?: ToastIntent | undefined;
};

/**
 * State used in rendering Toast, without design-only state.
 */
export type ToastBaseState = Omit<ToastState, 'backgroundAppearance'>;
