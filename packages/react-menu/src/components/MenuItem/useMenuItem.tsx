import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';
import { ChevronRightIcon } from '../../utils/DefaultIcons';

/**
 * Consts listing which props are shorthand props.
 */
// TODO introduce content slot for styling
export const menuItemShorthandProps = ['icon', 'submenuIndicator'] as const;

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
  const hasSubmenu = useMenuTriggerContext();

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span' },
      submenuIndicator: { as: 'span', children: <ChevronRightIcon /> },
      role: 'menuitem',
      tabIndex: 0,
      hasSubmenu,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  const { onKeyDown: onKeyDownOriginal } = state;
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();
      (e.target as HTMLElement)?.click();
    }

    onKeyDownOriginal?.(e);
  };

  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    state.ref.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state);
  return state;
};
