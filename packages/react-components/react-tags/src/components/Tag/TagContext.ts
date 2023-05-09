import * as React from 'react';
import type { TagContextValue } from './Tag.types';

export const TagContext = React.createContext<TagContextValue | undefined>(undefined);

const tagContextDefaultValue: TagContextValue = {
  dismissible: false,
  shape: 'rounded',
  size: 'medium',
  interactive: false,
};

export const TagProvider = TagContext.Provider;
export const useTagContext_unstable = () => React.useContext(TagContext) ?? tagContextDefaultValue;
