import * as React from 'react';
import { InteractionTagState } from '../components/InteractionTag/index';

export const InteractionTagContext = React.createContext<InteractionTagContextValue | undefined>(undefined);

const interactionTagContextDefaultValue: InteractionTagContextValue = {
  hasSecondary: false,
  disabled: false,
  appearance: 'filled',
  size: 'medium',
  shape: 'rounded',
  handleTagDismiss: () => null,
  value: '',
};

/**
 * Context shared between InteractionTag and its children components
 */
export type InteractionTagContextValue<Value = string> = Required<
  Pick<InteractionTagState, 'hasSecondary' | 'disabled' | 'appearance' | 'size' | 'shape'> & {
    handleTagDismiss: (e: React.MouseEvent | React.KeyboardEvent, value: Value) => void;
    value?: Value;
  }
>;

export const InteractionTagContextProvider = InteractionTagContext.Provider;

export const useInteractionTagContext_unstable = () =>
  React.useContext(InteractionTagContext) ?? interactionTagContextDefaultValue;
