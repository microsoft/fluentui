import * as React from 'react';
import { useEventCallback, useMergedRefs, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);
const ChevronLeftIcon = bundleIcon(ChevronLeftFilled, ChevronLeftRegular);

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem_unstable = (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>): MenuItemState => {
  const isSubmenuTrigger = useMenuTriggerContext_unstable();
  const persistOnClickContext = useMenuContext_unstable(context => context.persistOnItemClick);
  const { as = 'div', disabled = false, hasSubmenu = isSubmenuTrigger, persistOnClick = persistOnClickContext } = props;
  const hasIcons = useMenuListContext_unstable(context => context.hasIcons);
  const hasCheckmarks = useMenuListContext_unstable(context => context.hasCheckmarks);
  const setOpen = useMenuContext_unstable(context => context.setOpen);

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
    },
    root: slot.always(
      getIntrinsicElementProps(
        as,
        useARIAButtonProps<'div', ARIAButtonProps<'div'>>(as, {
          role: 'menuitem',
          ...props,
          disabled: false,
          disabledFocusable: disabled,
          ref: useMergedRefs(ref, innerRef) as React.Ref<ARIAButtonElementIntersection<'div'>>,
          onKeyDown: useEventCallback(event => {
            props.onKeyDown?.(event);
            if (!event.isDefaultPrevented() && (event.key === Space || event.key === Enter)) {
              dismissedWithKeyboardRef.current = true;
            }
          }),
          onMouseEnter: useEventCallback(event => {
            innerRef.current?.focus();

            props.onMouseEnter?.(event);
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
    checkmark: slot.optional(props.checkmark, { renderByDefault: hasCheckmarks, elementType: 'span' }),
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
  };
  useCharacterSearch(state, innerRef);
  return state;
};
