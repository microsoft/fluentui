'use client';

import type * as React from 'react';
import type {
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowManager,
  OverflowSnapshot,
} from '@fluentui/priority-overflow';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';

const defaultSnapshot: OverflowSnapshot = {
  hasOverflow: false,
  overflowCount: 0,
  itemVisibility: {},
  groupVisibility: {},
};

export const defaultOverflowManager: OverflowManager = {
  setOptions: () => undefined,
  observe: () => () => undefined,
  registerItem: () => () => undefined,
  removeItem: () => undefined,
  update: () => undefined,
  forceUpdate: () => undefined,
  attachOverflowMenu: () => () => undefined,
  registerDivider: () => () => undefined,
  getSnapshot: () => defaultSnapshot,
  subscribe: () => () => undefined,
};

/**
 * @internal
 */
export interface OverflowContextValue {
  manager: OverflowManager;
  registerItem: (item: OverflowItemEntry) => () => void;
  registerOverflowMenu: (el: HTMLElement) => () => void;
  registerDivider: (divider: OverflowDividerEntry) => () => void;
  updateOverflow: (padding?: number) => void;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const OverflowContext = createContext<OverflowContextValue | undefined>(
  undefined,
) as Context<OverflowContextValue>;

const overflowContextDefaultValue: OverflowContextValue = {
  manager: defaultOverflowManager,
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
