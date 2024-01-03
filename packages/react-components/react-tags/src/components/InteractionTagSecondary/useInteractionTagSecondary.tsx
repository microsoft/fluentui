import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot, useId } from '@fluentui/react-utilities';
import { Delete, Backspace } from '@fluentui/keyboard-keys';
import { DismissRegular } from '@fluentui/react-icons';
import type { InteractionTagSecondaryProps, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import { useInteractionTagContext_unstable } from '../../contexts/interactionTagContext';

/**
 * Create the state required to render InteractionTagSecondary.
 *
 * The returned state can be modified with hooks such as useInteractionTagSecondaryStyles_unstable,
 * before being passed to renderInteractionTagSecondary_unstable.
 *
 * @param props - props from this instance of InteractionTagSecondary
 * @param ref - reference to root HTMLButtonElement of InteractionTagSecondary
 */
export const useInteractionTagSecondary_unstable = (
  props: InteractionTagSecondaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagSecondaryState => {
  const { appearance, disabled, handleTagDismiss, interactionTagPrimaryId, shape, size, value } =
    useInteractionTagContext_unstable();

  const id = useId('fui-InteractionTagSecondary-', props.id);

  const onClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(ev);
    if (!ev.defaultPrevented) {
      handleTagDismiss?.(ev, { value });
    }
  });

  const onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLButtonElement>) => {
    props?.onKeyDown?.(ev);
    if (!ev.defaultPrevented && (ev.key === Delete || ev.key === Backspace)) {
      handleTagDismiss?.(ev, { value });
    }
  });

  return {
    appearance,
    disabled,
    shape,
    size,
    components: {
      root: 'button',
    },

    root: slot.always(
      getIntrinsicElementProps('button', {
        children: <DismissRegular />,
        type: 'button',
        disabled,
        ref,
        'aria-labelledby': `${interactionTagPrimaryId} ${id}`,
        ...props,
        id,
        onClick,
        onKeyDown,
      }),
      { elementType: 'button' },
    ),
  };
};
