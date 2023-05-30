import * as React from 'react';
import { TagGroupState } from '../components/TagGroup/index';

export const TagGroupContext = React.createContext<TagGroupContextValue | undefined>(undefined);

const tagGroupContextDefaultValue: TagGroupContextValue = {
  dismissible: false,
  handleTagDismiss: () => null,
  size: 'medium',
  role: undefined,
};

/**
 * Context shared between TagGroup and its children components
 */
export type TagGroupContextValue = Required<Pick<TagGroupState, 'dismissible' | 'handleTagDismiss' | 'size'>> &
  Pick<React.HTMLAttributes<HTMLElement>, 'role'>;

export const TagGroupContextProvider = TagGroupContext.Provider;

export const useTagGroupContext_unstable = () => React.useContext(TagGroupContext) ?? tagGroupContextDefaultValue;
