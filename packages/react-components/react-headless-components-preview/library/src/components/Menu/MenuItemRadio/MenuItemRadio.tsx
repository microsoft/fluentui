'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useMenuItemRadio } from './useMenuItemRadio';
import { renderMenuItemRadio } from './renderMenuItemRadio';
import type { MenuItemRadioProps } from './MenuItemRadio.types';

/**
 * Headless MenuItemRadio component.
 *
 * Renders a single-select item with `role="menuitemradio"` whose checked
 * state is driven by the parent MenuList's controlled `checkedValues`.
 */
export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> = React.forwardRef<
  ARIAButtonElement<'div'>,
  MenuItemRadioProps
>((props, ref) => {
  const state = useMenuItemRadio(props, ref);
  return renderMenuItemRadio(state);
}) as ForwardRefComponent<MenuItemRadioProps>;

MenuItemRadio.displayName = 'MenuItemRadio';
