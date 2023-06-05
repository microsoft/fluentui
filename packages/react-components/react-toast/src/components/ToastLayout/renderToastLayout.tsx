/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastLayoutState, ToastLayoutSlots } from './ToastLayout.types';

/**
 * Render the final JSX of ToastLayout
 */
export const renderToastLayout_unstable = (state: ToastLayoutState) => {
  const { slots, slotProps } = getSlotsNext<ToastLayoutSlots>(state);

  return <slots.root {...slotProps.root} />;
};
