/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';

import type { ToastAlertState, ToastAlertSlots } from './ToastAlert.types';

export const renderToastAlert_unstable = (state: ToastAlertState) => {
  const { slots, slotProps } = getSlotsNext<ToastAlertSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && <slots.media {...slotProps.media} />}
      {slotProps.root.children}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};
