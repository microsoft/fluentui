/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { InteractionTagState, InteractionTagSlots, InteractionTagContextValues } from './InteractionTag.types';
import { InteractionTagContextProvider } from '../../contexts/interactionTagContext';

/**
 * Render the final JSX of InteractionTag
 */
export const renderInteractionTag_unstable = (
  state: InteractionTagState,
  contextValues: InteractionTagContextValues,
) => {
  assertSlots<InteractionTagSlots>(state);

  return (
    <InteractionTagContextProvider value={contextValues.interactionTag}>
      <state.root />
    </InteractionTagContextProvider>
  );
};
