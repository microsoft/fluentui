import * as React from 'react';
import * as _ from 'lodash';
import { ShorthandValue } from '../types';

export const getOrGenerateIdFromShorthand = <P extends Record<string, any>>(
  prefix: string,
  value: ShorthandValue<P>,
  currentValue?: string,
): string | undefined => {
  if (_.isNil(value)) {
    return undefined;
  }

  let result: string;

  if (React.isValidElement(value)) {
    result = (value as React.ReactElement<{ id?: string }>).props.id;
  } else if (_.isPlainObject(value)) {
    result = (value as Record<string, any>).id;
  }

  return result || currentValue || _.uniqueId(prefix);
};
