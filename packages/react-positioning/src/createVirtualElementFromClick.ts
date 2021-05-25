import * as PopperJs from '@popperjs/core';

export type PopperVirtualElement = PopperJs.VirtualElement;

/**
 * Creates a virtual element based on the position of a click event
 * Can be used as a target for popper in scenarios such as context menus
 */
export function createVirtualElementFromClick(nativeEvent: MouseEvent): PopperVirtualElement {
  const left = nativeEvent.clientX;
  const top = nativeEvent.clientY;
  const right = left + 1;
  const bottom = top + 1;

  function getBoundingClientRect(): ClientRect {
    return {
      left,
      top,
      right,
      bottom,

      height: 0,
      width: 0,
    };
  }

  return {
    getBoundingClientRect,
  };
}
