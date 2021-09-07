import * as React from 'react';
import {
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
  resolveShorthand,
  useMergedRefs,
  getNativeElementProps,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';
import {
  ChevronRight20Regular as ChevronRightIcon,
  ChevronLeft20Regular as ChevronLeftIcon,
} from '@fluentui/react-icons';
import { useMenuListContext } from '../../contexts/menuListContext';
import { useMenuContext } from '../../contexts/menuContext';
import type { MenuItemProps, MenuItemSlots, MenuItemState } from './MenuItem.types';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemSlots: Array<keyof MenuItemSlots> = [
  'root',
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
    hasSubmenu,
    ...props,
    components: {
      icon: 'span',
      checkmark: 'span',
      submenuIndicator: 'span',
      content: 'span',
      secondaryContent: 'span',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, innerRef),
      role: 'menuitem',
      tabIndex: 0,
      'aria-disabled': props.disabled,
      ...props,
    }),
    icon: resolveShorthand(props.icon, { required: hasIcons }),
    checkmark: resolveShorthand(props.checkmark, { required: hasCheckmarks }),
    submenuIndicator: resolveShorthand(props.submenuIndicator, {
      required: hasSubmenu,
      defaultProps: {
        children: dir === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />,
      },
    }),
    content: resolveShorthand(props.content, { required: true, defaultProps: { children: props.children } }),
    secondaryContent: resolveShorthand(props.secondaryContent),
  };

  const { onClick: onClickOriginal, onKeyDown: onKeyDownOriginal } = state.root;
  state.root.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
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

  state.root.onClick = (e: React.MouseEvent<HTMLElement>) => {
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

  const { onMouseEnter: onMouseEnterOriginal } = state.root;
  state.root.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    innerRef.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state, innerRef);
  return state;
};
