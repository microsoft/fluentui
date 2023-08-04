import * as React from 'react';
import { InteractionTagState, InteractionTagContextValues } from './InteractionTag.types';

export function useInteractionTagContextValues_unstable(state: InteractionTagState): InteractionTagContextValues {
  const { appearance, disabled, hasSecondary, shape, size, value, handleTagDismiss } = state;

  return {
    interactionTag: React.useMemo(
      () => ({ appearance, disabled, hasSecondary, shape, size, value, handleTagDismiss }),
      [appearance, disabled, hasSecondary, shape, size, value, handleTagDismiss],
    ),
  };
}
