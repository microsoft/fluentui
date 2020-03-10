import { ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';

export const ToolbarVariablesContext = React.createContext<ComponentVariablesInput | undefined>(undefined);

export const ToolbarVariablesProvider = ToolbarVariablesContext.Provider;
