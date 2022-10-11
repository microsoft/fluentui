import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { ToolbarContextValue } from './Toolbar.types';

export const ToolbarContext = createContext<ToolbarContextValue | undefined>(undefined) as Context<ToolbarContextValue>;

const toolbarContextDefaultValue = {
  size: 'medium' as 'medium',
  handleToggleButton: () => null,
  vertical: false,
};

export const useToolbarContext = () => React.useContext(ToolbarContext) ?? toolbarContextDefaultValue;

export const useToolbarContext_unstable = <T>(selector: ContextSelector<ToolbarContextValue, T>): T =>
  useContextSelector(ToolbarContext, (ctx = toolbarContextDefaultValue) => selector(ctx));
