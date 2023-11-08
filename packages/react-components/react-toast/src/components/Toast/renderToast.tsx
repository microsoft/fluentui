/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import type { ToastState, ToastSlots, ToastContextValues } from './Toast.types';

/**
 * Render the final JSX of Toast
 */
export const renderToast_unstable = (state: ToastState, contextValues: ToastContextValues) => {
  assertSlots<ToastSlots>(state);

  return (
    <BackgroundAppearanceProvider value={contextValues.backgroundAppearance}>
      <state.root />
    </BackgroundAppearanceProvider>
  );
};
