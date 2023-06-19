/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { ToasterState, ToasterSlotsInternal } from './Toaster.types';
import { AriaLive } from '../AriaLive';

/**
 * Render the final JSX of Toaster
 */
export const renderToaster_unstable = (state: ToasterState) => {
  const { announceRef, renderAriaLive } = state;
  const { slots, slotProps } = getSlotsNext<ToasterSlotsInternal>(state);

  const hasToasts = !!slots.bottomStart || !!slots.bottomEnd || !!slots.topStart || !!slots.topEnd;

  return (
    <>
      {renderAriaLive ? <AriaLive announceRef={announceRef} /> : null}
      {hasToasts ? (
        <Portal>
          {slots.bottomStart ? <slots.bottomStart {...slotProps.bottomStart} /> : null}
          {slots.bottomEnd ? <slots.bottomEnd {...slotProps.bottomEnd} /> : null}
          {slots.topStart ? <slots.topStart {...slotProps.topStart} /> : null}
          {slots.topEnd ? <slots.topEnd {...slotProps.topEnd} /> : null}
        </Portal>
      ) : null}
    </>
  );
};
