import * as React from 'react';
import { InteractionTagState } from '../components/InteractionTag/index';

export const InteractionTagContext = React.createContext<InteractionTagContextValue | undefined>(undefined);

const interactionTagContextDefaultValue: InteractionTagContextValue = {
  appearance: 'filled',
  disabled: false,
  handleTagDismiss: () => null,
  hasSecondary: false,
  shape: 'rounded',
  size: 'medium',
  value: '',
};

/**
 * Context shared between InteractionTag and its children components
 */
export type InteractionTagContextValue<Value = string> = Required<
  Pick<InteractionTagState, 'appearance' | 'disabled' | 'hasSecondary' | 'shape' | 'size'> & {
    handleTagDismiss: (e: React.MouseEvent | React.KeyboardEvent, value: Value) => void;
    value?: Value;
  }
>;

export const InteractionTagContextProvider = InteractionTagContext.Provider;

export const useInteractionTagContext_unstable = () =>
  React.useContext(InteractionTagContext) ?? interactionTagContextDefaultValue;
