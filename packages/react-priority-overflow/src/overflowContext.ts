import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { OverflowContextValue } from './types';

export const OverflowContext = createContext<OverflowContextValue>({
  itemVisibility: {},
  groupVisibility: {},
  hasOverflow: false,
  registerItem: () => () => null,
  updateOverflow: () => null,
});

export const useOverflowContext = <SelectedValue>(selector: ContextSelector<OverflowContextValue, SelectedValue>) =>
  useContextSelector(OverflowContext, selector);
