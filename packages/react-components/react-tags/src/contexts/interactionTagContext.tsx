import * as React from 'react';
import { InteractionTagState } from '../components/InteractionTag/index';
import { TagDismissHandler } from '../utils/types';

export const InteractionTagContext = React.createContext<InteractionTagContextValue | undefined>(undefined);

const interactionTagContextDefaultValue: InteractionTagContextValue = {
  appearance: 'filled',
  disabled: false,
  handleTagDismiss: () => ({}),
  interactionTagPrimaryId: '',
  shape: 'rounded',
  size: 'medium',
  value: '',
};

/**
 * Context shared between InteractionTag and its children components
 */
export type InteractionTagContextValue<Value = string> = Required<
  Pick<InteractionTagState, 'appearance' | 'disabled' | 'shape' | 'size'> & {
    handleTagDismiss: TagDismissHandler<Value>;
    interactionTagPrimaryId: string;
    value?: Value;
  }
>;

export const InteractionTagContextProvider = InteractionTagContext.Provider;

export const useInteractionTagContext_unstable = () =>
  React.useContext(InteractionTagContext) ?? interactionTagContextDefaultValue;
