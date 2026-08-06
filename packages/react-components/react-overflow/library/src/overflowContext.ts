'use client';

import type {
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowGroupState,
  OverflowSnapshot,
} from '@fluentui/priority-overflow';
import { EMPTY_SNAPSHOT } from '@fluentui/priority-overflow';
import * as React from 'react';

/**
 * @public
 */
export interface OverflowContextValue {
  /**
   * @deprecated This value is not guaranteed to be up to date and should not be used directly. Use getSnapshot or the provided hooks instead
   */
  itemVisibility: Record<string, boolean>;
  /**
   * @deprecated This value is not guaranteed to be up to date and should not be used directly. Use getSnapshot or the provided hooks instead
   */
  groupVisibility: Record<string, OverflowGroupState>;
  /**
   * @deprecated This value is not guaranteed to be up to date and should not be used directly. Use getSnapshot or the provided hooks instead
   */
  hasOverflow: boolean;
  registerItem: (item: OverflowItemEntry) => () => void;
  registerOverflowMenu: (el: HTMLElement) => () => void;
  registerDivider: (divider: OverflowDividerEntry) => () => void;
  updateOverflow: (padding?: number) => void;
  forceUpdateOverflow: () => void;
  containerRef?: React.RefObject<HTMLElement | null>;
  getSnapshot: () => OverflowSnapshot;
  subscribe: (listener: () => void) => () => void;
}

export const OverflowContext = React.createContext<OverflowContextValue | undefined>(
  undefined,
) as React.Context<OverflowContextValue>;

/**
 * Provides an {@link OverflowContextValue} to descendant overflow hooks and components.
 * Used by headless consumers that build their own overflow root.
 * @public
 */
export const OverflowProvider = OverflowContext.Provider;

const noop = () => {
  /* noop */
};

const overflowContextDefaultValue: OverflowContextValue = {
  hasOverflow: false,
  itemVisibility: {},
  groupVisibility: {},
  registerItem: () => noop,
  updateOverflow: noop,
  forceUpdateOverflow: noop,
  registerOverflowMenu: () => noop,
  registerDivider: () => noop,
  getSnapshot: () => EMPTY_SNAPSHOT,
  subscribe: () => noop,
};

/**
 * @internal
 */
export function useOverflowContext(): OverflowContextValue;
/**
 * @internal
 */
export function useOverflowContext<SelectedValue>(
  selector: (context: OverflowContextValue) => SelectedValue,
): SelectedValue;
export function useOverflowContext<SelectedValue>(
  selector?: (context: OverflowContextValue) => SelectedValue,
): SelectedValue | OverflowContextValue {
  const context = React.useContext(OverflowContext) ?? overflowContextDefaultValue;
  return selector ? selector(context) : context;
}
