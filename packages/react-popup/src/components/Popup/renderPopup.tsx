import * as React from 'react';
import { PopupContext } from '../../popupContext';
import { PopupState } from './Popup.types';

/**
 * Render the final JSX of Popup
 */
export const renderPopup = (state: PopupState) => {
  const { open, setOpen, triggerRef, contentRef, target, openOnContext, openOnHover, mountNode } = state;

  return (
    <PopupContext.Provider
      value={{ open, setOpen, triggerRef, contentRef, target, openOnHover, openOnContext, mountNode }}
    >
      {state.children}
    </PopupContext.Provider>
  );
};
