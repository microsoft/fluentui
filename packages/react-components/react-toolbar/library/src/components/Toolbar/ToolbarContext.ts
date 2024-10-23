import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { ToolbarContextValue } from './Toolbar.types';

export const ToolbarContext = createContext<ToolbarContextValue | undefined>(undefined) as Context<ToolbarContextValue>;

const toolbarContextDefaultValue: ToolbarContextValue = {
  size: 'medium' as 'medium',
  handleToggleButton: () => null,
  handleRadio: () => null,
  vertical: false,
  checkedValues: {},
};

export const useToolbarContext_unstable = <T>(selector: ContextSelector<ToolbarContextValue, T>): T =>
  useContextSelector(ToolbarContext, (ctx = toolbarContextDefaultValue) => selector(ctx));
