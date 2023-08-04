import * as React from 'react';
import { InteractionTagState, InteractionTagContextValues } from './InteractionTag.types';

export function useInteractionTagContextValues_unstable(state: InteractionTagState): InteractionTagContextValues {
  const { appearance, disabled, handleTagDismiss, hasSecondary, shape, size, value } = state;

  return {
    interactionTag: React.useMemo(
      () => ({ appearance, disabled, handleTagDismiss, hasSecondary, shape, size, value }),
      [appearance, disabled, handleTagDismiss, hasSecondary, shape, size, value],
    ),
  };
}
