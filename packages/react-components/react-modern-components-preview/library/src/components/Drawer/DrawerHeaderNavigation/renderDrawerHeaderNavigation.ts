import { renderDrawerHeaderNavigation as renderDrawerHeaderNavigationBase } from '@fluentui/react-headless-components-preview/drawer';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

export const renderDrawerHeaderNavigation = renderDrawerHeaderNavigationBase as (
  state: DrawerHeaderNavigationState,
) => JSXElement;
