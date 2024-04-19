import * as React from 'react';
import { TagGroupState } from '../components/TagGroup/index';

export const TagGroupContext = React.createContext<TagGroupContextValue | undefined>(undefined);

const tagGroupContextDefaultValue: TagGroupContextValue = {
  handleTagDismiss: () => ({}),
  size: 'medium',
  role: 'toolbar',
};

/**
 * Context shared between TagGroup and its children components
 */
export type TagGroupContextValue = Required<Pick<TagGroupState, 'handleTagDismiss' | 'size'>> &
  Partial<Pick<TagGroupState, 'appearance' | 'dismissible' | 'role'>>;

export const TagGroupContextProvider = TagGroupContext.Provider;

export const useTagGroupContext_unstable = () => React.useContext(TagGroupContext) ?? tagGroupContextDefaultValue;
