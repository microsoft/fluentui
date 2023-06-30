/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import type { ToastState, ToastSlots, ToastContextValues } from './Toast.types';

/**
 * Render the final JSX of Toast
 */
export const renderToast_unstable = (state: ToastState, contextValues: ToastContextValues) => {
  const { slots, slotProps } = getSlotsNext<ToastSlots>(state);

  return (
    <BackgroundAppearanceProvider value={contextValues.backgroundAppearance}>
      <slots.root {...slotProps.root} />
    </BackgroundAppearanceProvider>
  );
};
