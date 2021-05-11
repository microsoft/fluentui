import * as PopperJs from '@popperjs/core';

import { getScrollParent } from './getScrollParent';
import { Boundary } from './types';

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export function getBoundary(element: HTMLElement, boundary: Boundary): PopperJs.Boundary {
  if (boundary === 'window') {
    return element.ownerDocument.documentElement;
  }

  if (boundary === 'scrollParent') {
    let boundariesNode = getScrollParent(element);

    if (boundariesNode.nodeName === 'BODY') {
      boundariesNode = element.ownerDocument.documentElement;
    }

    return boundariesNode as HTMLElement;
  }

  return boundary;
}
