import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';
import { ChevronRightIcon, ChevronLeftIcon } from '../../utils/DefaultIcons';
import { useMenuListContext } from '../../contexts/menuListContext';
import { useMenuContext } from '../../contexts/menuContext';

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
  const setOpen = useMenuContext(context => context.setOpen);
  const persistOnClickContext = useMenuContext(context => context.persistOnItemClick);
  const dismissedWithKeyboardRef = React.useRef(false);

  const { dir } = useFluent();

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span', children: hasIcons ? '' : undefined },
      checkmark: { as: 'span', children: hasCheckmarks ? '' : undefined },
      submenuIndicator: { as: 'span', children: dir === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon /> },
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

      dismissedWithKeyboardRef.current = true;
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

    let shouldPersist = persistOnClickContext;
    // prop wins over context;
    if (state.persistOnClick !== undefined && persistOnClickContext !== state.persistOnClick) {
      shouldPersist = state.persistOnClick;
    }

    if (!hasSubmenu && !shouldPersist) {
      setOpen(e, { open: false, keyboard: dismissedWithKeyboardRef.current, bubble: true });
      dismissedWithKeyboardRef.current = false;
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
