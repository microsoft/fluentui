/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import type { ReactNode } from 'react';
import { getSlotsNext } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { Toast } from '../Toast';
import type { ToasterState, ToasterSlots, ToasterSlotsInternal } from './Toaster.types';
import { AriaLive } from '../AriaLive';

/**
 * Render the final JSX of Toaster
 */
export const renderToaster_unstable = (state: ToasterState) => {
  const { toastsToRender, announce, isToastVisible, announceRef, renderAriaLive } = state;
  const { slots, slotProps } = getSlotsNext<ToasterSlots & ToasterSlotsInternal>(state);
  const toastPositions = Array.from(toastsToRender.keys());

  return (
    <>
      {renderAriaLive ? <AriaLive announceRef={announceRef} /> : null}
      {toastPositions.length ? (
        <Portal>
          {toastPositions.map(position => {
            const PositionSlot = slots[position];
            return (
              <PositionSlot key={position} {...slotProps[position]}>
                {toastsToRender.get(position)?.map(toast => (
                  <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
                    {toast.content as ReactNode}
                  </Toast>
                ))}
              </PositionSlot>
            );
          })}
        </Portal>
      ) : null}
    </>
  );
};
