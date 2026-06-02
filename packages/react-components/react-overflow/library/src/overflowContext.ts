'use client';

import type {
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowGroupState,
  OverflowEventPayload,
} from '@fluentui/priority-overflow';
import { EMPTY_SNAPSHOT } from '@fluentui/priority-overflow';
import * as React from 'react';

/**
 * @internal
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
  containerRef?: React.RefObject<HTMLElement | null>;
  getSnapshot: () => OverflowEventPayload;
  subscribe: (listener: () => void) => () => void;
}

export const OverflowContext = React.createContext<OverflowContextValue | undefined>(
  undefined,
) as React.Context<OverflowContextValue>;

const noop = () => {
  /* noop */
};

const overflowContextDefaultValue: OverflowContextValue = {
  hasOverflow: false,
  itemVisibility: {},
  groupVisibility: {},
  registerItem: () => noop,
  updateOverflow: noop,
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
