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
import { useMenuListContext } from '../../contexts/menuListContext';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon', 'submenuIndicator', 'content', 'secondaryContent', 'checkmark'] as const;

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
  const hasIcons = useMenuListContext(context => context.hasIcons);
  const hasCheckmarks = useMenuListContext(context => context.hasCheckmarks);

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span', children: hasIcons && '' },
      checkmark: { as: 'span', children: hasCheckmarks && '' },
      submenuIndicator: { as: 'span', children: <ChevronRightIcon /> },
      content: { as: 'span', children: props.children },
      secondaryContent: { as: 'span' },
      role: 'menuitem',
      tabIndex: 0,
      hasSubmenu,
      'aria-disabled': props.disabled,
    },
    defaultProps && resolveShorthandProps(defaultProps, menuItemShorthandProps),
    resolveShorthandProps(props, menuItemShorthandProps),
  );

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
