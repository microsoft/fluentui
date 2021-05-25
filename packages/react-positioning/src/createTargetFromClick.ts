import * as PopperJs from '@popperjs/core';

export type PopperVirtualElement = PopperJs.VirtualElement;

/**
 * Creates a virtual target for popper based on the position of a click event
 * Useful for scenarios such as context menus
 */
export function createTargetFromClick(nativeEvent: MouseEvent): PopperVirtualElement {
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
