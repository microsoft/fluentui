import * as React from 'react';
import { CardContextValue } from './Card.types';

const cardContext = React.createContext<CardContextValue | undefined>(undefined);

/**
 * @internal
 */
export const cardContextDefaultValue: CardContextValue = {
  selectableA11yProps: {
    referenceId: undefined,
    setReferenceId() {
      /* Noop */
    },
    referenceLabel: undefined,
    setReferenceLabel() {
      /* Noop */
    },
  },
};

/**
 * @internal
 */
export const CardProvider = cardContext.Provider;

/**
 * @internal
 */
export const useCardContext_unstable = () => React.useContext(cardContext) ?? cardContextDefaultValue;
