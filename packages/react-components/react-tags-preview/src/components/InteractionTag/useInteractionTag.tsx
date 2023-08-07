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

  const children = React.Children.toArray(props.children) as React.ReactElement[];
  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('InteractionTag must contain at least one child');
    }

    if (children.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('InteractionTag must contain at most two children');
    }
  }

  return {
    appearance,
    disabled,
    handleTagDismiss,
    hasSecondary: children.length === 2,
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
