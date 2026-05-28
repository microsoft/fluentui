'use client';

import type {
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowGroupState,
  OverflowEventPayload,
} from '@fluentui/priority-overflow';
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
  forceUpdateOverflow: () => void;
  containerRef?: React.RefObject<HTMLElement | null>;
  getSnapshot: () => OverflowEventPayload;
  subscribe: (listener: () => void) => () => void;
}

export const OverflowContext = React.createContext<OverflowContextValue | undefined>(
  undefined,
) as React.Context<OverflowContextValue>;

const overflowContextDefaultValue: OverflowContextValue = {
  hasOverflow: false,
  itemVisibility: {},
  groupVisibility: {},
  registerItem: () => () => null,
  updateOverflow: () => null,
  forceUpdateOverflow: () => null,
  registerOverflowMenu: () => () => null,
  registerDivider: () => () => null,
  getSnapshot: () => ({
    visibleItems: [],
    invisibleItems: [],
    groupVisibility: {},
  }),
  subscribe: () => () => null,
};

type ContextSelector<TContext, TSelected> = (context: TContext) => TSelected;

/**
 * @internal
 */
export const useOverflowContext: {
  <SelectedValue>(selector: ContextSelector<OverflowContextValue, SelectedValue>): SelectedValue;
  (): OverflowContextValue;
} =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (selector?: ContextSelector<OverflowContextValue, any>): any => {
    const context = React.useContext(OverflowContext) ?? overflowContextDefaultValue;
    if (selector) {
      return selector(context);
    }
    return context;
  };
