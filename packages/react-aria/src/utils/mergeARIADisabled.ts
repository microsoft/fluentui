import * as React from 'react';
import { ObjectShorthandProps } from '@fluentui/react-utilities';

/**
 * Merges disabled declaration with `aria-disabled`
 */
export function mergeARIADisabled(
  shorthand: ObjectShorthandProps<{
    'aria-disabled'?: string | boolean;
    children?: React.ReactNode;
    disabled?: boolean;
  }>,
) {
  const disabled = shorthand.disabled ?? shorthand['aria-disabled'];
  if (typeof disabled === 'string') {
    return disabled === 'false' ? false : true;
  }
  return disabled ?? false;
}
