/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

'use client';

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CarouselDirectionTooltip } from './CarouselDirectionTooltip';
import type { CarouselDirectionButtonSlots, CarouselDirectionButtonState } from './CarouselDirectionButton.types';

export const renderCarouselDirectionButton = (state: CarouselDirectionButtonState): JSXElement | null => {
  assertSlots<CarouselDirectionButtonSlots>(state);
  if (!state.rendered) {
    return null;
  }
  // Unmounting the tooltip at a boundary closes it and cancels its pending timers.
  // Non-string content keeps Tooltip mounted while hidden, so `aria-labelledby` always resolves.
  return (
    <state.root>
      {!state.hidden && (
        <CarouselDirectionTooltip
          content={{ ...state.tooltip, children: <span>{state.tooltip.children}</span> }}
          position={state.kind === 'previous' ? 'before' : 'after'}
          unavailable={state.unavailable}
          onFocus={state.button.onFocus}
          onBlur={state.button.onBlur}
          onPointerEnter={state.button.onPointerEnter}
          onPointerLeave={state.button.onPointerLeave}
        >
          <state.button />
        </CarouselDirectionTooltip>
      )}
    </state.root>
  );
};
