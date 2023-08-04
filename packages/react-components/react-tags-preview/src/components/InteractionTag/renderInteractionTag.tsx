/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { InteractionTagState, InteractionTagSlots, InteractionTagContextValues } from './InteractionTag.types';
import { InteractionTagContextProvider } from '../../contexts/interactionTagContext';

/**
 * Render the final JSX of InteractionTag
 */
export const renderInteractionTag_unstable = (
  state: InteractionTagState,
  contextValues: InteractionTagContextValues,
) => {
  const { slots, slotProps } = getSlotsNext<InteractionTagSlots>(state);

  return (
    <InteractionTagContextProvider value={contextValues.interactionTag}>
      <slots.root {...slotProps.root} />
    </InteractionTagContextProvider>
  );
};
