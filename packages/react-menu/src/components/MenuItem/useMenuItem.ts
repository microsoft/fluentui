import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  useOverrideNativeKeyboardClick,
} from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';

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

  const { onKeyDown: onKeyDownOriginal, onKeyUp: onKeyUpOriginal } = state;
  const { onOverrideClickKeyDown, onOverrideClickKeyUp } = useOverrideNativeKeyboardClick();
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    onOverrideClickKeyDown(e);
    onKeyDownOriginal?.(e);
  };

  state.onKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    onOverrideClickKeyUp(e);
    onKeyUpOriginal?.(e);
  };

  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    state.ref.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state);
  return state;
};
