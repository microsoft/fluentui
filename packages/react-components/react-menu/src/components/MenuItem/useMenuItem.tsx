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
import { useMenuTriggerContext_unstable } from '../../contexts/menuTriggerContext';
import { ChevronRightRegular as ChevronRightIcon, ChevronLeftRegular as ChevronLeftIcon } from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import type { MenuItemProps, MenuItemState } from './MenuItem.types';

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem_unstable = (props: MenuItemProps, ref: React.Ref<HTMLElement>): MenuItemState => {
  const hasIcons = useMenuListContext_unstable(context => context.hasIcons);
  const hasCheckmarks = useMenuListContext_unstable(context => context.hasCheckmarks);
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  const persistOnClickContext = useMenuContext_unstable(context => context.persistOnItemClick);
  const dismissedWithKeyboardRef = React.useRef(false);

  const isSubmenuTrigger = useMenuTriggerContext_unstable();
  const hasSubmenu = props.hasSubmenu ?? isSubmenuTrigger;

  const { dir } = useFluent();
  const innerRef = React.useRef<HTMLElement>(null);

  const state: MenuItemState = {
    hasSubmenu,
    ...props,
    components: {
      root: 'div',
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
    content: resolveShorthand(props.content, {
      required: !!props.children,
      defaultProps: { children: props.children },
    }),
    secondaryContent: resolveShorthand(props.secondaryContent),
  };

  const { onClick: onClickOriginal, onKeyDown: onKeyDownOriginal } = state.root;
  state.root.onKeyDown = e => {
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

  state.root.onClick = e => {
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
  state.root.onMouseEnter = useEventCallback(e => {
    innerRef.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state, innerRef);
  return state;
};
