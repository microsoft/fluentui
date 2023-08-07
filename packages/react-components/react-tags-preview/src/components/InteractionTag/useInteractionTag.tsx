import * as React from 'react';
import { getNativeElementProps, useId, slot } from '@fluentui/react-utilities';
import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { useTagGroupContext_unstable } from '../../contexts/tagGroupContext';

/**
 * Create the state required to render InteractionTag.
 *
 * The returned state can be modified with hooks such as useInteractionTagStyles_unstable,
 * before being passed to renderInteractionTag_unstable.
 *
 * @param props - props from this instance of InteractionTag
 * @param ref - reference to root HTMLElement of InteractionTag
 */
export const useInteractionTag_unstable = (
  props: InteractionTagProps,
  ref: React.Ref<HTMLElement>,
): InteractionTagState => {
  const { handleTagDismiss, size: contextSize } = useTagGroupContext_unstable();

  const id = useId('fui-Tag', props.id);

  const { appearance = 'filled', disabled = false, shape = 'rounded', size = contextSize, value = id } = props;

  return {
    appearance,
    disabled,
    handleTagDismiss,
    shape,
    size,
    value,

    components: {
      root: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
        id,
      }),
      { elementType: 'div' },
    ),
  };
};
