'use client';

import type * as React from 'react';
import type { DrawerProps } from '@fluentui/react-drawer';
import { Drawer } from '@fluentui/react-drawer';
import type { RefAttributes } from '@fluentui/react-utilities';
import { slot } from '@fluentui/react-utilities';

import { useNav_unstable } from '../Nav/useNav';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

/**
 * Create the state required to render NavDrawer.
 *
 * The returned state can be modified with hooks such as useNavDrawerStyles_unstable,
 * before being passed to renderNavDrawer_unstable.
 *
 * @param props - props from this instance of NavDrawer
 * @param ref - reference to root HTMLDivElement of NavDrawer
 */
export const useNavDrawer_unstable = (props: NavDrawerProps, ref: React.Ref<HTMLDivElement>): NavDrawerState => {
  const { size = undefined, tabbable = false } = props;
  // Nav-owned props are consumed by useNav_unstable and must not be forwarded to the Drawer root element.
  const {
    defaultSelectedValue: _defaultSelectedValue,
    defaultSelectedCategoryValue: _defaultSelectedCategoryValue,
    defaultOpenCategories: _defaultOpenCategories,
    openCategories: _openCategories,
    onNavItemSelect: _onNavItemSelect,
    selectedValue: _selectedValue,
    selectedCategoryValue: _selectedCategoryValue,
    multiple: _multiple,
    onNavCategoryItemToggle: _onNavCategoryItemToggle,
    density: _density,
    tabbable: _tabbable,
    ...drawerProps
  } = props;

  const navState = useNav_unstable(props, ref);

  return {
    ...navState,
    size,
    tabbable,
    components: {
      // TODO: remove once React v18 slot API is modified
      // this is a problem with the lack of support for union types on React v18
      // ComponentState is using React.ComponentType which will try to infer propType
      // propTypes WeakValidator signature will break distributive unions making this type invalid
      root: Drawer as React.FC<DrawerProps>,
    },

    root: slot.always(
      { ref, role: 'navigation', ...drawerProps },
      {
        // TODO: remove once React v18 slot API is modified
        // this is a problem with the lack of support for union types on React v18
        // ComponentState is using React.ComponentType which will try to infer propType
        // propTypes WeakValidator signature will break distributive unions making this type invalid
        elementType: Drawer as React.FC<DrawerProps & RefAttributes<HTMLDivElement>>,
      },
    ),
  };
};
