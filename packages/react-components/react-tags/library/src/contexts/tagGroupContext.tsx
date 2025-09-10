import * as React from 'react';
import { TagGroupState } from '../components/TagGroup/index';

export const TagGroupContext = React.createContext<TagGroupContextValue | undefined>(undefined);

const tagGroupContextDefaultValue: TagGroupContextValue = {
  handleTagDismiss: () => ({}),
  size: 'medium',
  role: 'toolbar',
  handleTagSelect: undefined,
};

/**
 * Context shared between TagGroup and its children components
 */
export type TagGroupContextValue = Required<Pick<TagGroupState, 'handleTagDismiss' | 'size'>> &
  Partial<
    Pick<TagGroupState, 'disabled' | 'appearance' | 'dismissible' | 'handleTagSelect' | 'role' | 'selectedValues'>
  >;

export const TagGroupContextProvider = TagGroupContext.Provider;

export const useTagGroupContext_unstable = (): TagGroupContextValue =>
  React.useContext(TagGroupContext) ?? tagGroupContextDefaultValue;
