import * as React from 'react';
import type { InteractionTagState } from '../components/InteractionTag/index';
import type { TagDismissHandler, TagSelectHandler } from '../utils/types';

export const InteractionTagContext = React.createContext<InteractionTagContextValue | undefined>(undefined);

const interactionTagContextDefaultValue: InteractionTagContextValue = {
  appearance: 'filled',
  disabled: false,
  handleTagDismiss: () => ({}),
  handleTagSelect: () => ({}),
  interactionTagPrimaryId: '',
  selected: false,
  selectedValues: [],
  shape: 'rounded',
  size: 'medium',
  value: '',
};

/**
 * Context shared between InteractionTag and its children components
 */
export type InteractionTagContextValue<Value = string> = Required<
  Pick<InteractionTagState, 'appearance' | 'disabled' | 'selected' | 'selectedValues' | 'shape' | 'size'> & {
    handleTagDismiss: TagDismissHandler<Value>;
    interactionTagPrimaryId: string;
    value?: Value;
  }
> & {
  handleTagSelect?: TagSelectHandler<Value>;
};

export const InteractionTagContextProvider = InteractionTagContext.Provider;

export const useInteractionTagContext_unstable = (): InteractionTagContextValue =>
  React.useContext(InteractionTagContext) ?? interactionTagContextDefaultValue;
