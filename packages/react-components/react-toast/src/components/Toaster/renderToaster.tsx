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

  const hasToasts = !!slots.bottomLeft || !!slots.bottomRight || !!slots.topLeft || !!slots.topRight;

  return (
    <>
      {renderAriaLive ? <AriaLive announceRef={announceRef} /> : null}
      {hasToasts ? (
        <Portal>
          {slots.bottomLeft ? <slots.bottomLeft {...slotProps.bottomLeft} /> : null}
          {slots.bottomRight ? <slots.bottomRight {...slotProps.bottomRight} /> : null}
          {slots.topLeft ? <slots.topLeft {...slotProps.topLeft} /> : null}
          {slots.topRight ? <slots.topRight {...slotProps.topRight} /> : null}
        </Portal>
      ) : null}
    </>
  );
};
