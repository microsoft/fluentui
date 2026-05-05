'use client';

import type * as React from 'react';
import { useMenuItemRadioBase_unstable } from '@fluentui/react-menu';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';

/**
 * Returns the state for a MenuItemRadio.
 *
 * Delegates to v9's `useMenuItemRadioBase_unstable`. The base hook applies
 * `role="menuitemradio"`, enforces single-selection per `name` group via the
 * parent MenuList's `checkedValues`, and skips the default checkmark icon
 * (headless consumers supply their own).
 */
export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemRadioState => {
  return useMenuItemRadioBase_unstable(props, ref);
};
