import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
  useDescendant,
} from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';
import { ChevronRightIcon } from '../../utils/DefaultIcons';
import {
  MenuListDescendant,
  MenuListDescendantContext,
  useMenuListHasIconSlots,
} from '../../contexts/menuListDescendants';

/**
 * Consts listing which props are shorthand props.
 */
// TODO introduce content slot for styling
export const menuItemShorthandProps = ['icon', 'submenuIndicator', 'content', 'secondaryContent'] as const;

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
      content: { as: 'span', children: props.children },
      secondaryContent: { as: 'span' },
      role: 'menuitem',
      tabIndex: 0,
      hasSubmenu,
      'aria-disabled': props.disabled,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  useDescendant<MenuListDescendant>(
    {
      element: state.ref.current,
      hasIconSlot: !!props.icon,
    },
    MenuListDescendantContext,
  );

  const { hasIconSlot } = useMenuListHasIconSlots();

  // One of the menu item's siblings contains an icon
  // render the icon slot so that items are aligned
  console.log(props.icon, !!props.icon);
  if (hasIconSlot && !props.icon) {
    state.icon.children = '';
  }

  const { onClick: onClickOriginal, onKeyDown: onKeyDownOriginal } = state;
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      if (state.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      (e.target as HTMLElement)?.click();
    }

    onKeyDownOriginal?.(e);
  };

  state.onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    onClickOriginal?.(e);
  };

  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    state.ref.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state);
  return state;
};
