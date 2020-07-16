import { ShorthandValue } from '../../types';
import { PopperShorthandProps } from './types';

export function getPopperPropsFromShorthand<P>(
  value: ShorthandValue<P & { popper?: PopperShorthandProps }>,
): PopperShorthandProps | undefined {
  if (typeof value === 'object' && value !== null) {
    return (value as { popper: PopperShorthandProps }).popper;
  }

  return undefined;
}
