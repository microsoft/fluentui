import * as React from 'react';
import { SlotProps } from '@fluentui/react-utilities';

/**
 * Merges disabled declaration with `aria-disabled`
 */
export function mergeARIADisabled(
  shorthand: SlotProps<{
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
