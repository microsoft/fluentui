import * as React from 'react';
import { getCode, keyboardKey, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { MenuState } from './Menu.types';
import { isOutsideMenu } from '../../utils/index';

interface UseMenuPopupState
  extends Pick<
    MenuState,
    | 'menuPopup'
    | 'menuPopupRef'
    | 'setOpen'
    | 'menuList'
    | 'onContext'
    | 'onHover'
    | 'triggerId'
    | 'triggerRef'
    | 'open'
  > {}

/**
 * A hook that sets the correct render of the menu popup slot through the children render function
 */
export const useMenuPopup = (state: UseMenuPopupState) => {
  const { menuPopup, menuPopupRef, setOpen, open, menuList, triggerId, triggerRef, onHover, onContext } = state;

  const dismissedWithKeyboardRef = React.useRef(false);
  React.useEffect(() => {
    if (dismissedWithKeyboardRef.current && !open) {
      triggerRef.current?.focus();
    }

    dismissedWithKeyboardRef.current = false;
  }, [triggerRef, dismissedWithKeyboardRef, open]);

  menuPopup.children = (Component, originalProps) => {
    const newProps = { 'aria-labelledby': triggerId, ...originalProps };

    newProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      if (onHover && !onContext) {
        setOpen(true);
      }

      originalProps?.onMouseEnter?.(e);
    };

    newProps.onBlur = (e: React.FocusEvent<HTMLElement>) => {
      if (isOutsideMenu({ triggerRef, menuPopupRef, event: e })) {
        setOpen(false);
      }
      originalProps?.onBlur?.(e);
    };

    newProps.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      const keyCode = getCode(e);
      if (keyCode === keyboardKey.Escape || keyCode === keyboardKey.ArrowLeft) {
        setOpen(false);
        dismissedWithKeyboardRef.current = true;
        e.stopPropagation();
      }

      // Dismiss is still handled by click, but keydown event is still propagated
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
      setOpen(false);
      originalProps?.onClick?.(e);
    };

    return React.createElement(
      Component as React.ElementType,
      {
        ...newProps,
        ref: menuPopupRef,
      },
      menuList,
    );
  };

  return state as MenuState;
};
