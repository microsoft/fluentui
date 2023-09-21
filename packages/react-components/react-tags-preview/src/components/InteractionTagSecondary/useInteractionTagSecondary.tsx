import * as React from 'react';
import { getNativeElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
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
 * @param ref - reference to root HTMLElement of InteractionTagSecondary
 */
export const useInteractionTagSecondary_unstable = (
  props: InteractionTagSecondaryProps,
  ref: React.Ref<HTMLElement>,
): InteractionTagSecondaryState => {
  const { appearance, disabled, handleTagDismiss, shape, size, value } = useInteractionTagContext_unstable();

  const onClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(ev);
    if (!ev.defaultPrevented) {
      handleTagDismiss?.(ev, { dismissedTagValue: value });
    }
  });

  const onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLButtonElement>) => {
    props?.onKeyDown?.(ev);
    if (!ev.defaultPrevented && (ev.key === Delete || ev.key === Backspace)) {
      handleTagDismiss?.(ev, { dismissedTagValue: value });
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
      getNativeElementProps('button', {
        children: <DismissRegular />,
        type: 'button',
        disabled,
        ref,
        ...props,
        onClick,
        onKeyDown,
      }),
      { elementType: 'button' },
    ),
  };
};
