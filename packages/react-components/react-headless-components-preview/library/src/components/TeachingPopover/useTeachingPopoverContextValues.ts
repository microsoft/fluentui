'use client';

import * as React from 'react';
import { usePopoverContextValues } from '../Popover/usePopover';
import type {
  TeachingPopoverContextValues,
  TeachingPopoverState,
  TeachingPopoverBaseBridgedContextValue,
} from './TeachingPopover.types';

type BaseSetOpen = TeachingPopoverBaseBridgedContextValue['setOpen'];
type BaseToggleOpen = TeachingPopoverBaseBridgedContextValue['toggleOpen'];

/**
 * Builds both the headless `PopoverContext` value and a
 * `@fluentui/react-popover`-compatible `PopoverContext` value. The bridge
 * lets sub-components consume base hooks from
 * `@fluentui/react-teaching-popover` (e.g. `useTeachingPopoverHeaderBase_unstable`),
 * which read `toggleOpen` / `setOpen` / `triggerRef` from that context.
 *
 * The `@fluentui/react-popover` `OpenPopoverEvents` union is wider than the
 * headless one (it accepts `FocusEvent`). Base hooks never fire focus-driven
 * dismisses, so casting `state.setOpen` / `state.toggleOpen` to those
 * signatures is safe — no extra event types reach them in practice.
 */
export const useTeachingPopoverContextValues = (state: TeachingPopoverState): TeachingPopoverContextValues => {
  const { popover } = usePopoverContextValues(state);

  const basePopover = React.useMemo<TeachingPopoverBaseBridgedContextValue>(
    () => ({
      open: state.open,
      setOpen: state.setOpen as unknown as BaseSetOpen,
      toggleOpen: state.toggleOpen as unknown as BaseToggleOpen,
      triggerRef: state.triggerRef,
      contentRef: state.contentRef,
      arrowRef: state.arrowRef,
      openOnHover: state.openOnHover,
      openOnContext: state.openOnContext,
      withArrow: state.withArrow,
    }),
    [
      state.open,
      state.setOpen,
      state.toggleOpen,
      state.triggerRef,
      state.contentRef,
      state.arrowRef,
      state.openOnHover,
      state.openOnContext,
      state.withArrow,
    ],
  );

  return { popover, basePopover };
};
