import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuItemOnClickDismiss } from './useMenuItemOnClickDismiss';
import { useCloseSubmenusOnMouseEnter } from './useCloseSubmenusOnMouseEnter';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon'];

const mergeProps = makeMergeProps<MenuItemState>({ deepMerge: menuItemShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem = (
  props: MenuItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemProps,
): MenuItemState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span' },
      role: 'menuitem',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  useCloseSubmenusOnMouseEnter(state);
  useMenuItemOnClickDismiss(state);
  useCharacterSearch(state);
  return state;
};
