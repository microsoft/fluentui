/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CardContextValue, CardSlots, CardState } from './Card.types';
import { CardProvider } from './CardContext';

/**
 * Render the final JSX of Card.
 */
export const renderCard_unstable = (state: CardState, cardContextValue: CardContextValue) => {
  assertSlots<CardSlots>(state);

  return (
    <state.root>
      <CardProvider value={cardContextValue}>
        {state.checkbox ? <state.checkbox /> : null}
        {state.floatingAction ? <state.floatingAction /> : null}
        {state.root.children}
      </CardProvider>
    </state.root>
  );
};
