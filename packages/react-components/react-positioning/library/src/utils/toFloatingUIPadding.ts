import type { SideObject } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';

export function toFloatingUIPadding(
  padding: NonNullable<PositioningOptions['overflowBoundaryPadding']>,
  isRtl: boolean,
): number | Partial<SideObject> {
  if (typeof padding === 'number') {
    return padding;
  }

  const paddingObject: Partial<SideObject> = {};

  // Undefined sides override Floating UI's zero defaults and produce NaN overflow.
  if (padding.top !== undefined) {
    paddingObject.top = padding.top;
  }

  if (padding.bottom !== undefined) {
    paddingObject.bottom = padding.bottom;
  }

  const left = isRtl ? 'end' : 'start';
  const right = isRtl ? 'start' : 'end';

  if (padding[left]) {
    paddingObject.left = padding[left];
  }

  if (padding[right]) {
    paddingObject.right = padding[right];
  }

  return paddingObject;
}
