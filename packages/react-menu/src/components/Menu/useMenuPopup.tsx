import * as React from 'react';
import { getCode, keyboardKey, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { MenuState } from './Menu.types';
import { Portal } from '@fluentui/react-portal';
import { isOutsideMenu } from '../../utils/index';

interface UseMenuPopupState
  extends Pick<
    MenuState,
    | 'menuPopup'
    | 'menuPopupRef'
    | 'setOpen'
    | 'menuList'
    | 'openOnContext'
    | 'openOnHover'
    | 'triggerId'
    | 'triggerRef'
    | 'open'
    | 'isSubmenu'
    | 'inline'
  > {}

/**
 * A hook that sets the correct render of the menu popup slot through the children render function
 */
export const useMenuPopup = (state: UseMenuPopupState) => {
  const {
    menuPopup,
    menuPopupRef,
    setOpen,
    menuList,
    triggerRef,
    openOnHover,
    openOnContext,
    isSubmenu,
    inline,
  } = state;

  const dismissedWithKeyboardRef = React.useRef(false);

  menuPopup.children = (Component, originalProps) => {
    const newProps = { role: 'presentation', ...originalProps };

    newProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      if (openOnHover && !openOnContext) {
        setOpen(e, { open: true, keyboard: false });
      }

      originalProps?.onMouseEnter?.(e);
    };

    newProps.onBlur = (e: React.FocusEvent<HTMLElement>) => {
      if (isOutsideMenu({ triggerRef, menuPopupRef, event: e })) {
        setOpen(e, { open: false, keyboard: false });
      }
      originalProps?.onBlur?.(e);
    };

    newProps.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      const keyCode = getCode(e);
      if (keyCode === keyboardKey.Escape || (isSubmenu && keyCode === keyboardKey.ArrowLeft)) {
        setOpen(e, { open: false, keyboard: true });
        e.stopPropagation(); // Left and Escape should only close one menu at a time
      }

      // Dismiss is still handled by click, but keydown event should still be propagated
      // If a child uses keydown without a native click event, the menu will remain open
      // Only native click event will close
      if (keyCode === EnterKey || keyCode === SpacebarKey) {
        dismissedWithKeyboardRef.current = true;
      }

      originalProps?.onKeyDown?.(e);
    };

    // Assumption made that all clicks will close the popup if propagated from children
    // To stop clicks from closing the menu call stopPropagation
    newProps.onClick = (e: React.MouseEvent<HTMLElement>) => {
      setOpen(e, { open: false, keyboard: dismissedWithKeyboardRef.current });
      dismissedWithKeyboardRef.current = false;
      originalProps?.onClick?.(e);
    };

    const popupContent = React.createElement(
      Component as React.ElementType,
      {
        ...newProps,
        ref: menuPopupRef,
      },
      menuList,
    );

    // Only outermost menu in a portal, other nested menus should be rendered in the same portal
    // Interactions and open/close rely on native event propagation and focus events
    // It would be harder to support a separate portal per popup menu since focus/blur events will (or won't) trigger
    if (isSubmenu || inline) {
      return popupContent;
    } else {
      return <Portal>{popupContent}</Portal>;
    }
  };

  return state as MenuState;
};
