import { offset as middleware } from '@floating-ui/dom';
import { Offset } from '../types';
import { applyRtlToOffset } from '../utils/positioningHelper';

interface OffsetMiddewareOptions {
  value: Offset;
  isRtl?: boolean;
}

export function offset(options: OffsetMiddewareOptions) {
  const { value, isRtl } = options;

  if (isRtl) {
    return middleware(applyRtlToOffset(value));
  }

  return middleware(value);
}
