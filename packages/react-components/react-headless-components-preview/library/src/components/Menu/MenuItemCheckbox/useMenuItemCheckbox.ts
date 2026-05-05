'use client';

import type * as React from 'react';
import { useMenuItemCheckboxBase_unstable } from '@fluentui/react-menu';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';

/**
 * Returns the state for a MenuItemCheckbox.
 *
 * Delegates to v9's `useMenuItemCheckboxBase_unstable`. The base hook applies
 * `role="menuitemcheckbox"`, wires `aria-checked` from MenuList's
 * `checkedValues`, and toggles selection on click. It does NOT inject the
 * default `Checkmark16Filled` icon — headless consumers supply their own
 * checkmark via the `checkmark` slot.
 */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemCheckboxState => {
  return useMenuItemCheckboxBase_unstable(props, ref);
};
