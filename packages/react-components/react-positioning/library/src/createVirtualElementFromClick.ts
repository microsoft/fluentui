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

  function getBoundingClientRect() {
    return {
      left,
      top,
      right,
      bottom,
      x: left,
      y: top,
      height: 1,
      width: 1,
    };
  }

  return {
    getBoundingClientRect,
  };
}
