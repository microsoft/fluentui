import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable = (state: PopoverState): JSXElement => {
  const {
    appearance,
    arrowRef,
    contentRef,
    inline,
    mountNode,
    open,
    openOnContext,
    openOnHover,
    setOpen,
    size,
    toggleOpen,
    trapFocus,
    triggerRef,
    withArrow,
    inertTrapFocus,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        appearance,
        arrowRef,
        contentRef,
        inline,
        mountNode,
        open,
        openOnContext,
        openOnHover,
        setOpen,
        toggleOpen,
        triggerRef,
        size,
        trapFocus,
        inertTrapFocus,
        withArrow,
      }}
    >
      {state.popoverTrigger}
      {state.popoverSurface && (
        <state.surfaceMotion>
          <MotionRefForwarder>
            {/* Casting here as content should be equivalent to <PopoverSurface /> */}
            {/* FIXME: content should not be ReactNode it should be ReactElement instead. */}
            {state.popoverSurface as React.ReactElement}
          </MotionRefForwarder>
        </state.surfaceMotion>
      )}
    </PopoverContext.Provider>
  );
};
