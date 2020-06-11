import { ShorthandValue } from './types';
import * as React from 'react';

export function mergeShorthandProp<TProps>(
  shorthandProp: ShorthandValue<TProps>,
  newProps: TProps,
): ShorthandValue<TProps> {
  if (typeof shorthandProp === 'object' && !React.isValidElement(shorthandProp)) {
    return {
      ...shorthandProp,
      ...newProps,
    };
  } else {
    return {
      children: shorthandProp,
      ...newProps,
    };
  }
}
