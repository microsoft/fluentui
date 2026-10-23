'use client';

import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type * as React from 'react';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverContextValue } from './Popover.types';

export type InternalPopoverContextValue = PopoverContextValue & {
  focusCapture?: React.FocusEventHandler<HTMLElement>;
};

export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue | undefined>(
  undefined,
) as Context<PopoverContextValue>;

const popoverContextDefaultValue: PopoverContextValue = {
  open: false,
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  withArrow: false,
  trapFocus: false,
  positioning: {
    targetRef: () => undefined,
    containerRef: () => undefined,
  },
  surfaceId: '',
};

export const PopoverProvider = PopoverContext.Provider;

/**
 * Hook to consume PopoverContext with a selector for optimized re-renders.
 */
export const usePopoverContext = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, (ctx = popoverContextDefaultValue) => selector(ctx));

export const usePopoverFocusCapture = (): React.FocusEventHandler<HTMLElement> | undefined =>
  useContextSelector(PopoverContext, ctx => (ctx as InternalPopoverContextValue | undefined)?.focusCapture);
