'use client';

import * as React from 'react';
import type { InteractionTagContextValue } from '@fluentui/react-tags';

import type { InteractionTagContextValues, InteractionTagState } from './InteractionTag.types';

export const useInteractionTagContextValues = (state: InteractionTagState): InteractionTagContextValues => {
  const { disabled, handleTagDismiss, handleTagSelect, interactionTagPrimaryId, selected, selectedValues, value } =
    state;

  const interactionTag: InteractionTagContextValue = React.useMemo(
    () => ({
      appearance: 'filled',
      shape: 'rounded',
      size: 'medium',
      disabled,
      handleTagDismiss,
      handleTagSelect,
      interactionTagPrimaryId,
      selected,
      selectedValues,
      value,
    }),
    [disabled, handleTagDismiss, handleTagSelect, interactionTagPrimaryId, selected, selectedValues, value],
  );

  return { interactionTag };
};
