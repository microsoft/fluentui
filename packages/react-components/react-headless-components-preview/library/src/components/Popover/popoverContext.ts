'use client';

import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverContextValue } from './Popover.types';

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
  trapFocus: false,
  disableAutoFocus: false,
  withArrow: false,
  inline: false,
  mountNode: null,
  positioning: {
    targetRef: () => undefined,
    containerRef: () => undefined,
    arrowRef: () => undefined,
  },
};

export const PopoverProvider = PopoverContext.Provider;

/**
 * Hook to consume PopoverContext with a selector for optimized re-renders.
 */
export const usePopoverContext = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, (ctx = popoverContextDefaultValue) => selector(ctx));
