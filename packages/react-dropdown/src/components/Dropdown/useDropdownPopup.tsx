import * as React from 'react';
import { getCode, keyboardKey, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { DropdownState } from './Dropdown.types';
import { Portal } from '@fluentui/react-portal';

interface UseDropdownPopupState
  extends Pick<
    DropdownState,
    'dropdownPopup' | 'dropdownPopupRef' | 'setOpen' | 'dropdownList' | 'triggerId' | 'triggerRef' | 'open' | 'inline'
  > {}

/**
 * A hook that sets the correct render of the dropdown listbox slot through the children render function
 */
export const useDropdownPopup = (state: UseDropdownPopupState) => {
  const { dropdownPopup, dropdownPopupRef, setOpen, dropdownList, inline } = state;

  const dismissedWithKeyboardRef = React.useRef(false);

  dropdownPopup.children = (Component, originalProps) => {
    const newProps = { role: 'presentation', ...originalProps };

    newProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      originalProps?.onMouseEnter?.(e);
    };

    newProps.onBlur = (e: React.FocusEvent<HTMLElement>) => {
      originalProps?.onBlur?.(e);
    };

    newProps.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      const keyCode = getCode(e);
      if (keyCode === keyboardKey.Escape) {
        setOpen(e, { open: false, keyboard: true });
        e.stopPropagation(); // Escape should not propagate, to avoid accidentally closing parent modals/etc
      }

      // Dismiss is still handled by click, but keydown event should still be propagated
      // If a child uses keydown without a native click event, the dropdown will remain open
      // Only native click event will close
      if (keyCode === EnterKey || keyCode === SpacebarKey) {
        dismissedWithKeyboardRef.current = true;
      }

      originalProps?.onKeyDown?.(e);
    };

    // Assumption made that all clicks will close the popup if propagated from children
    // To stop clicks from closing the dropdown call stopPropagation
    newProps.onClick = (e: React.MouseEvent<HTMLElement>) => {
      setOpen(e, { open: false, keyboard: dismissedWithKeyboardRef.current });
      dismissedWithKeyboardRef.current = false;
      originalProps?.onClick?.(e);
    };

    const popupContent = React.createElement(
      Component as React.ElementType,
      {
        ...newProps,
        ref: dropdownPopupRef,
      },
      dropdownList,
    );

    // Only outermost dropdown in a portal, other nested dropdowns should be rendered in the same portal
    // Interactions and open/close rely on native event propagation and focus events
    // It would be harder to support a separate portal per popup dropdown
    // since focus/blur events will (or won't) trigger
    if (inline) {
      return popupContent;
    } else {
      return <Portal>{popupContent}</Portal>;
    }
  };

  return state as DropdownState;
};
