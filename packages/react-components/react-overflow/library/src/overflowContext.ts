'use client';

import type * as React from 'react';
import type { OverflowGroupState, OverflowItemEntry, OverflowDividerEntry } from '@fluentui/priority-overflow';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';

/**
 * @internal
 */
export interface OverflowContextValue {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
  hasOverflow: boolean;
  registerItem: (item: OverflowItemEntry) => () => void;
  registerOverflowMenu: (el: HTMLElement) => () => void;
  registerDivider: (divider: OverflowDividerEntry) => () => void;
  updateOverflow: (padding?: number) => void;
  /**
   * Ref to the overflow container element. Optional to preserve backwards
   * compatibility with any external consumers that build a context value
   * by hand.
   */
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const OverflowContext = createContext<OverflowContextValue | undefined>(
  undefined,
) as Context<OverflowContextValue>;

const overflowContextDefaultValue: OverflowContextValue = {
  itemVisibility: {},
  groupVisibility: {},
  hasOverflow: false,
  registerItem: () => () => null,
  updateOverflow: () => null,
  registerOverflowMenu: () => () => null,
  registerDivider: () => () => null,
};

/**
 * @internal
 */
export const useOverflowContext = <SelectedValue>(
  selector: ContextSelector<OverflowContextValue, SelectedValue>,
): SelectedValue => useContextSelector(OverflowContext, (ctx = overflowContextDefaultValue) => selector(ctx));
