import * as React from 'react';
import {
  useEventCallback,
  useMergedRefs,
  getIntrinsicElementProps,
  slot,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext_unstable } from '../../contexts/menuTriggerContext';
import {
  ChevronRightFilled,
  ChevronRightRegular,
  ChevronLeftFilled,
  ChevronLeftRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import type { MenuItemProps, MenuItemState } from './MenuItem.types';
import {
  ARIAButtonElement,
  ARIAButtonElementIntersection,
  ARIAButtonProps,
  useARIAButtonProps,
} from '@fluentui/react-aria';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { useIsInMenuSplitGroup, useMenuSplitGroupContext_unstable } from '../../contexts/menuSplitGroupContext';

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);
const ChevronLeftIcon = bundleIcon(ChevronLeftFilled, ChevronLeftRegular);

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem_unstable = (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>): MenuItemState => {
  const isSubmenuTrigger = useMenuTriggerContext_unstable();
  const persistOnClickContext = useMenuContext_unstable(context => context.persistOnItemClick);
  const {
    as = 'div',
    disabled = false,
    hasSubmenu = isSubmenuTrigger,
    persistOnClick = persistOnClickContext,
    content: _content, // `content` is a slot and it's type clashes with the HTMLElement `content` attribute
    ...rest
  } = props;
  const { hasIcons, hasCheckmarks } = useIconAndCheckmarkAlignment({ hasSubmenu });
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  useNotifySplitItemMultiline({ multiline: !!props.subText, hasSubmenu });

  const { dir } = useFluent();
  const innerRef = React.useRef<ARIAButtonElementIntersection<'div'>>(null);
  const dismissedWithKeyboardRef = React.useRef(false);

  const state: MenuItemState = {
    hasSubmenu,
    disabled,
    persistOnClick,
    components: {
      root: 'div',
      icon: 'span',
      checkmark: 'span',
      submenuIndicator: 'span',
      content: 'span',
      secondaryContent: 'span',
      subText: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps(
        as,
        useARIAButtonProps<'div', ARIAButtonProps<'div'>>(as, {
          role: 'menuitem',
          ...rest,
          disabled: false,
          disabledFocusable: disabled,
          ref: useMergedRefs(ref, innerRef) as React.Ref<ARIAButtonElementIntersection<'div'>>,
          onKeyDown: useEventCallback(event => {
            props.onKeyDown?.(event);
            if (!event.isDefaultPrevented() && (event.key === Space || event.key === Enter)) {
              dismissedWithKeyboardRef.current = true;
            }
          }),
          onMouseMove: useEventCallback(event => {
            if (event.currentTarget.ownerDocument.activeElement !== event.currentTarget) {
              innerRef.current?.focus();
            }

            props.onMouseMove?.(event);
          }),
          onClick: useEventCallback(event => {
            if (!hasSubmenu && !persistOnClick) {
              setOpen(event, {
                open: false,
                keyboard: dismissedWithKeyboardRef.current,
                bubble: true,
                type: 'menuItemClick',
                event,
              });
              dismissedWithKeyboardRef.current = false;
            }

            props.onClick?.(event);
          }),
        }),
      ),
      { elementType: 'div' },
    ),
    icon: slot.optional(props.icon, { renderByDefault: hasIcons, elementType: 'span' }),
    checkmark: slot.optional(props.checkmark, {
      renderByDefault: hasCheckmarks,
      elementType: 'span',
    }),
    submenuIndicator: slot.optional(props.submenuIndicator, {
      renderByDefault: hasSubmenu,
      defaultProps: {
        children: dir === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />,
      },
      elementType: 'span',
    }),
    content: slot.optional(props.content, {
      renderByDefault: !!props.children,
      defaultProps: { children: props.children },
      elementType: 'span',
    }),
    secondaryContent: slot.optional(props.secondaryContent, { elementType: 'span' }),
    subText: slot.optional(props.subText, { elementType: 'span' }),
  };
  useCharacterSearch(state, innerRef);
  return state;
};

/**
 * MenuSplitGroup needs to apply extra styles when its main item is in multiline layout mode
 * Notify the parent MenuSplitGroup so that it can handle this case
 */
const useNotifySplitItemMultiline = (options: { hasSubmenu: boolean; multiline: boolean }) => {
  const { hasSubmenu, multiline } = options;
  const isSplitItemTrigger = useIsInMenuSplitGroup() && hasSubmenu;

  const { setMultiline } = useMenuSplitGroupContext_unstable();

  useIsomorphicLayoutEffect(() => {
    if (!isSplitItemTrigger) {
      setMultiline(multiline);
    }
  }, [setMultiline, multiline, isSplitItemTrigger]);
};

const useIconAndCheckmarkAlignment = (options: { hasSubmenu: boolean }) => {
  const { hasSubmenu } = options;
  const hasIcons = useMenuListContext_unstable(context => context.hasIcons);
  const hasCheckmarks = useMenuListContext_unstable(context => context.hasCheckmarks);
  const isSplitItemTrigger = useIsInMenuSplitGroup() && hasSubmenu;

  return {
    hasIcons: hasIcons && !isSplitItemTrigger,
    hasCheckmarks: hasCheckmarks && !isSplitItemTrigger,
  };
};
