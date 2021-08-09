import * as React from 'react';
import {
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
  resolveShorthand,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { MenuItemProps, MenuItemSlots, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';
import { ChevronRightIcon, ChevronLeftIcon } from '../../utils/DefaultIcons';
import { useMenuListContext } from '../../contexts/menuListContext';
import { useMenuContext } from '../../contexts/menuContext';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemSlots: Array<keyof MenuItemSlots> = [
  'icon',
  'submenuIndicator',
  'content',
  'secondaryContent',
  'checkmark',
];

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem = (props: MenuItemProps, ref: React.Ref<HTMLElement>): MenuItemState => {
  const hasSubmenu = useMenuTriggerContext();
  const hasIcons = useMenuListContext(context => context.hasIcons);
  const hasCheckmarks = useMenuListContext(context => context.hasCheckmarks);
  const setOpen = useMenuContext(context => context.setOpen);
  const persistOnClickContext = useMenuContext(context => context.persistOnItemClick);
  const dismissedWithKeyboardRef = React.useRef(false);

  const { dir } = useFluent();
  const innerRef = React.useRef<HTMLElement>(null);

  const state: MenuItemState = {
    ref: useMergedRefs(ref, innerRef),
    role: 'menuitem',
    tabIndex: 0,
    hasSubmenu,
    'aria-disabled': props.disabled,
    ...props,
    components: {
      icon: 'span',
      checkmark: 'span',
      submenuIndicator: 'span',
      content: 'span',
      secondaryContent: 'span',
    },

    icon: resolveShorthand(props.icon, { children: hasIcons ? '' : undefined }),
    checkmark: resolveShorthand(props.checkmark, { children: hasCheckmarks ? '' : undefined }),
    submenuIndicator: resolveShorthand(props.submenuIndicator, {
      children: dir === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />,
    }),
    content: resolveShorthand(props.content, { children: props.children }),
    secondaryContent: resolveShorthand(props.secondaryContent),
  };

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
    innerRef.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state, innerRef);
  return state;
};
