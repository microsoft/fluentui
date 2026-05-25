'use client';

import type * as React from 'react';
import type {
  OverflowGroupState,
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

const defaultManager: OverflowManager = {
  setOptions: () => undefined,
  setContainer: () => undefined,
  setOverflowMenu: () => undefined,
  observe: () => undefined,
  disconnect: () => undefined,
  destroy: () => undefined,
  addItem: () => undefined,
  removeItem: () => undefined,
  update: () => undefined,
  forceUpdate: () => undefined,
  addOverflowMenu: () => undefined,
  addDivider: () => undefined,
  removeDivider: () => undefined,
  removeOverflowMenu: () => undefined,
  getSnapshot: () => defaultSnapshot,
  subscribe: () => () => undefined,
};

/**
 * @internal
 */
export interface OverflowContextValue {
  manager: OverflowManager;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
  hasOverflow: boolean;
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
  manager: defaultManager,
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
