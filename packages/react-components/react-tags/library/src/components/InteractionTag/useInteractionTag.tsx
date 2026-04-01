'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type {
  InteractionTagBaseProps,
  InteractionTagBaseState,
  InteractionTagProps,
  InteractionTagState,
} from './InteractionTag.types';
import { useTagGroupContext_unstable } from '../../contexts/tagGroupContext';

/**
 * Create the base state required to render InteractionTag, without design-only props.
 *
 * @param props - props from this instance of InteractionTag (without appearance, size, shape)
 * @param ref - reference to root HTMLDivElement of InteractionTag
 */
export const useInteractionTagBase_unstable = (
  props: InteractionTagBaseProps,
  ref: React.Ref<HTMLDivElement>,
): InteractionTagBaseState => {
  const {
    handleTagDismiss,
    handleTagSelect,
    disabled: contextDisabled,
    selectedValues = [],
  } = useTagGroupContext_unstable();

  const id = useId('fui-InteractionTag-', props.id);

  const interactionTagPrimaryId = useId('fui-InteractionTagPrimary-');

  const { disabled = false, selected = false, value = id } = props;

  return {
    disabled: contextDisabled ? true : disabled,
    handleTagDismiss,
    handleTagSelect,
    interactionTagPrimaryId,
    selected: selectedValues.includes(value) || selected,
    selectedValues,
    value,

    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        disabled: contextDisabled ? true : disabled,
        id,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Create the state required to render InteractionTag.
 *
 * The returned state can be modified with hooks such as useInteractionTagStyles_unstable,
 * before being passed to renderInteractionTag_unstable.
 *
 * @param props - props from this instance of InteractionTag
 * @param ref - reference to root HTMLDivElement of InteractionTag
 */
export const useInteractionTag_unstable = (
  props: InteractionTagProps,
  ref: React.Ref<HTMLDivElement>,
): InteractionTagState => {
  const { size: contextSize, appearance: contextAppearance } = useTagGroupContext_unstable();

  const { appearance = contextAppearance ?? 'filled', shape = 'rounded', size = contextSize } = props;

  return {
    ...useInteractionTagBase_unstable(props, ref),
    appearance,
    shape,
    size,
  };
};
