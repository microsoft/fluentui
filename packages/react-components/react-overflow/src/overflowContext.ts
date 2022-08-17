import type { OverflowGroupState, OverflowItemEntry } from '@fluentui/priority-overflow';
import { ContextSelector, createContext, useContextSelector, Context } from '@fluentui/react-context-selector';

export interface OverflowContextValue {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
  hasOverflow: boolean;
  registerItem: (item: OverflowItemEntry) => () => void;
  updateOverflow: (padding?: number) => void;
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
};

export const useOverflowContext = <SelectedValue>(selector: ContextSelector<OverflowContextValue, SelectedValue>) =>
  useContextSelector(OverflowContext, (ctx = overflowContextDefaultValue) => selector(ctx));
