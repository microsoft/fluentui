'use client';

import * as React from 'react';
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
  onNativeOpenChange: () => null,
  onSurfaceRenderChange: () => null,
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
 * Internal: the open state for the surface. Context-selector values update after commit, so a surface that mounts in
 * the same render as `open` becomes true would otherwise read a stale `false`.
 */
export const PopoverSurfaceOpenContext = React.createContext<boolean | undefined>(undefined);

/**
 * Hook to consume PopoverContext with a selector for optimized re-renders.
 */
export const usePopoverContext = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, (ctx = popoverContextDefaultValue) => selector(ctx));
