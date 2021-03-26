import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
} from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuItemOnClickDismiss } from './useMenuItemOnClickDismiss';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuItemState>({ deepMerge: menuItemShorthandProps });

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

  // useCloseSubmenusOnMouseEnter(state);
  useMenuItemOnClickDismiss(state);

  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    state.ref.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state);
  return state;
};
