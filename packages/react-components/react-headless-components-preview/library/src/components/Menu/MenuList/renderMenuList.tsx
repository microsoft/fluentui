import * as React from 'react';
import { renderMenuList_unstable } from '@fluentui/react-menu';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MenuListContextValues, MenuListState } from '@fluentui/react-menu';
import { MenuListPresenceProvider } from '../menuListPresenceContext';

export const renderMenuList = (state: MenuListState, contextValues: MenuListContextValues): JSXElement => (
  <MenuListPresenceProvider value={true}>{renderMenuList_unstable(state, contextValues)}</MenuListPresenceProvider>
);
