/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import type { ReactNode } from 'react';
import { getSlotsNext } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { Toast } from '../Toast';
import { getPositionStyles } from '../../state';
import type { ToasterState, ToasterSlots } from './Toaster.types';
import { AriaLive } from '../AriaLive';

/**
 * Render the final JSX of Toaster
 */
export const renderToaster_unstable = (state: ToasterState) => {
  const { toastsToRender, announce, isToastVisible, announceRef, offset, renderAriaLive } = state;
  const { slots, slotProps } = getSlotsNext<ToasterSlots>(state);
  const toastPositions = Array.from(toastsToRender.keys());

  return (
    <>
      {renderAriaLive ? <AriaLive announceRef={announceRef} /> : null}
      {toastPositions.length ? (
        <Portal>
          {toastPositions.map(position => (
            <slots.root
              key={position}
              {...slotProps.root}
              data-toaster-position={position}
              style={{ ...getPositionStyles(position, offset), ...slotProps.root.style }}
            >
              {toastsToRender.get(position)?.map(toast => (
                <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
                  {toast.content as ReactNode}
                </Toast>
              ))}
            </slots.root>
          ))}
        </Portal>
      ) : null}
    </>
  );
};
