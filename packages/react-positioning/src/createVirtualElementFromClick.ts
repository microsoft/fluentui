import type { ClientRectObject } from '@floating-ui/dom';
import type { PositioningVirtualElement } from './types';

/**
 * Creates a virtual element based on the position of a click event
 * Can be used as a target for popper in scenarios such as context menus
 */
export function createVirtualElementFromClick(nativeEvent: MouseEvent): PositioningVirtualElement {
  const left = nativeEvent.clientX;
  const top = nativeEvent.clientY;
  const right = left + 1;
  const bottom = top + 1;

  function getBoundingClientRect(): ClientRectObject {
    return {
      x: left,
      y: top,

      left,
      top,
      right,
      bottom,

      height: 1,
      width: 1,
    };
  }

  return {
    getBoundingClientRect,
  };
}
