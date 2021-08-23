import * as React from 'react';
import type { ComponentVariablesInput } from '@fluentui/styles';

export const ToolbarVariablesContext = React.createContext<ComponentVariablesInput | undefined>(undefined);

export const ToolbarVariablesProvider = ToolbarVariablesContext.Provider;
