/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastFooterState, ToastFooterSlots } from './ToastFooter.types';

/**
 * Render the final JSX of ToastFooter
 */
export const renderToastFooter_unstable = (state: ToastFooterState) => {
  const { slots, slotProps } = getSlotsNext<ToastFooterSlots>(state);

  return <slots.root {...slotProps.root} />;
};
