import type { VirtualElement as PopperJsVirtualElement } from '@popperjs/core';

export function createReferenceFromClick(nativeEvent: MouseEvent): PopperJsVirtualElement {
  const left = nativeEvent.clientX;
  const top = nativeEvent.clientY;
  const right = left + 1;
  const bottom = top + 1;

  function getBoundingClientRect(): ClientRect {
    // @ts-expect-error - error exposed in TS 4.5 - caused by updated dom.lib.d.ts - missing the following properties from type 'ClientRect': x, y, toJSON
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
