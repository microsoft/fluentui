'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import { renderMenu, useMenu, useMenuContextValues } from '@fluentui/react-headless-components-preview/menu';

import type { MenuProps } from './Menu.types';

/**
 * A Menu displays a list of actions anchored to a trigger. Windmod Menu: the headless menu
 * (native top layer + CSS anchor positioning) decorated with the Fluent visual contract.
 *
 * The headless hook already passes Griffel's positioning defaults verbatim, so there is no
 * offset or fallback-position restoration here, and no look prop to publish.
 */
export const Menu = (props: MenuProps): JSXElement => {
  const state = useMenu(props);

  const contextValues = useMenuContextValues(state);

  return renderMenu(state, contextValues);
};

Menu.displayName = 'Menu';
