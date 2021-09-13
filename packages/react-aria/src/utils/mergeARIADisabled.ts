import * as React from 'react';
import { ObjectShorthandProps } from '@fluentui/react-utilities';

/**
 * Merges disabled declaration with `aria-disabled`
 */
export function mergeARIADisabled(
  shorthand: ObjectShorthandProps<{
    disabled?: boolean;
    'aria-disabled'?: string | boolean;
    children?: React.ReactNode;
  }>,
) {
  const disabled = shorthand.disabled || shorthand['aria-disabled'] || undefined;
  if (typeof disabled === 'string') {
    return disabled === 'false' ? false : true;
  }
  return disabled ?? false;
}
