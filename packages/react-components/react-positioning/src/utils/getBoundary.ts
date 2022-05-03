import * as PopperJs from '@popperjs/core';

import { getScrollParent } from './getScrollParent';
import type { Boundary } from '../types';

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export function getBoundary(element: HTMLElement | null, boundary?: Boundary): PopperJs.Boundary | undefined {
  if (boundary === 'window') {
    return element?.ownerDocument!.documentElement;
  }

  if (boundary === 'scrollParent') {
    let boundariesNode: HTMLElement | undefined = getScrollParent(element);

    if (boundariesNode.nodeName === 'BODY') {
      boundariesNode = element?.ownerDocument!.documentElement;
    }

    return boundariesNode;
  }

  return boundary;
}
