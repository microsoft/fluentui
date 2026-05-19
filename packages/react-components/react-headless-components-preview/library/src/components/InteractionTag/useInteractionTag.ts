'use client';

import * as React from 'react';
import { useInteractionTagBase_unstable } from '@fluentui/react-tags';
import type { InteractionTagContextValue } from '@fluentui/react-tags';

import type { InteractionTagContextValues, InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for an InteractionTag component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTag`.
 */
export const useInteractionTag = (props: InteractionTagProps, ref: React.Ref<HTMLDivElement>): InteractionTagState => {
  'use no memo';

  const state: InteractionTagState = useInteractionTagBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};

/**
 * Maps the state of the InteractionTag onto the context consumed by its
 * `InteractionTagPrimary` and `InteractionTagSecondary` children. The headless
 * flavour omits design-only fields (appearance/shape/size) on the public state,
 * but the canonical `InteractionTagContextValue` requires them - we forward
 * neutral defaults so the base child hooks (which do not read these fields)
 * still type-check.
 */
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
