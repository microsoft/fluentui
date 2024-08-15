import { ObjectShorthandValue, ShorthandValue } from '../../types';
import { PopperShorthandProps } from './types';

export function partitionPopperPropsFromShorthand<P extends {}>(
  value: ShorthandValue<P & { popper?: PopperShorthandProps }>,
): [ShorthandValue<P> | ObjectShorthandValue<P>, PopperShorthandProps | undefined] {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const { popper, ...props } = value as ObjectShorthandValue<P> & { popper: PopperShorthandProps };

    return [props as ObjectShorthandValue<P>, popper];
  }

  return [value, {}];
}
