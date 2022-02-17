import { offset as middleware } from '@floating-ui/dom';
import { Offset } from '../types';
import { applyRtlToOffset } from '../utils/positioningHelper';

export function offset(value: Offset, rtl: boolean) {
  if (rtl) {
    return middleware(applyRtlToOffset(value));
  }

  return middleware(value);
}
