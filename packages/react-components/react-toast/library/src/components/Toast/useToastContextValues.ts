import { ToastContextValues, ToastState } from './Toast.types';

export function useToastContextValues_unstable(state: ToastState): ToastContextValues {
  const { backgroundAppearance } = state;

  return {
    backgroundAppearance,
  };
}
