'use client';

import type * as React from 'react';
import type { MenuProps } from './Menu.types';
import { renderMenu } from './renderMenu';
import { useMenu, useMenuContextValues } from './useMenu';

export const Menu = (props: MenuProps): React.ReactElement => {
  const state = useMenu(props);
  const contextValues = useMenuContextValues(state);

  return renderMenu(state, contextValues);
};

Menu.displayName = 'Menu';
