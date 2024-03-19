import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { useTagGroupContext_unstable } from '../../contexts/tagGroupContext';

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
  const { handleTagDismiss, size: contextSize, appearance: contextAppearance } = useTagGroupContext_unstable();

  const id = useId('fui-InteractionTag-', props.id);

  const interactionTagPrimaryId = useId('fui-InteractionTagPrimary-');

  const {
    appearance = contextAppearance ?? 'filled',
    disabled = false,
    shape = 'rounded',
    size = contextSize,
    value = id,
  } = props;

  return {
    appearance,
    disabled,
    handleTagDismiss,
    interactionTagPrimaryId,
    shape,
    size,
    value,

    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        id,
      }),
      { elementType: 'div' },
    ),
  };
};
