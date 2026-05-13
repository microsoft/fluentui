'use client';

import * as React from 'react';
import { usePopoverContextValues } from '../Popover/usePopover';
import type {
  TeachingPopoverContextValues,
  TeachingPopoverState,
  TeachingPopoverV9BridgedContextValue,
} from './TeachingPopover.types';

type V9SetOpen = TeachingPopoverV9BridgedContextValue['setOpen'];
type V9ToggleOpen = TeachingPopoverV9BridgedContextValue['toggleOpen'];

/**
 * Builds both the headless `PopoverContext` value and a v9-compatible
 * `PopoverContext` value. The v9 bridge lets sub-components consume base
 * hooks from `@fluentui/react-teaching-popover` (e.g. `useTeachingPopoverHeaderBase_unstable`),
 * which read `toggleOpen` / `setOpen` / `triggerRef` from the v9 context.
 *
 * The v9 `OpenPopoverEvents` union is wider than the headless one (it
 * accepts `FocusEvent`). Base hooks never fire focus-driven dismisses, so
 * casting `state.setOpen` / `state.toggleOpen` to the v9 signatures is safe
 * — no extra event types reach them in practice.
 */
export const useTeachingPopoverContextValues = (state: TeachingPopoverState): TeachingPopoverContextValues => {
  const { popover } = usePopoverContextValues(state);

  const v9Popover = React.useMemo<TeachingPopoverV9BridgedContextValue>(
    () => ({
      open: state.open,
      setOpen: state.setOpen as unknown as V9SetOpen,
      toggleOpen: state.toggleOpen as unknown as V9ToggleOpen,
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

  return { popover, v9Popover };
};
