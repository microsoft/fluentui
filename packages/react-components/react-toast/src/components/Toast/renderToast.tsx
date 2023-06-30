/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import type { ToastState, ToastSlots, ToastContextValues } from './Toast.types';

/**
 * Render the final JSX of Toast
 */
export const renderToast_unstable = (state: ToastState, contexts: ToastContextValues) => {
  const { slots, slotProps } = getSlotsNext<ToastSlots>(state);

  return (
    <BackgroundAppearanceProvider value={contexts.backgroundAppearance}>
      <slots.root {...slotProps.root} />
    </BackgroundAppearanceProvider>
  );
};
