import * as React from 'react';
import { getNativeElementProps, useEventCallback } from '@fluentui/react-utilities';
import { Delete, Backspace } from '@fluentui/keyboard-keys';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { SecondaryProps, SecondaryState } from './Secondary.types';
import { useInteractionTagContext_unstable } from '../../contexts/interactionTagContext';

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

/**
 * Create the state required to render Secondary.
 *
 * The returned state can be modified with hooks such as useSecondaryStyles_unstable,
 * before being passed to renderSecondary_unstable.
 *
 * @param props - props from this instance of Secondary
 * @param ref - reference to root HTMLElement of Secondary
 */
export const useSecondary_unstable = (props: SecondaryProps, ref: React.Ref<HTMLElement>): SecondaryState => {
  const { disabled, appearance, size, shape, handleTagDismiss, value } = useInteractionTagContext_unstable();

  const rootShorthand = getNativeElementProps('button', {
    children: <DismissIcon />,
    type: 'button',
    disabled,
    ...props,
    ref,
  });

  const onClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(ev);
    if (!ev.defaultPrevented) {
      handleTagDismiss?.(ev, value);
    }
  });

  const onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLButtonElement>) => {
    props?.onKeyDown?.(ev);
    if (!ev.defaultPrevented && (ev.key === Delete || ev.key === Backspace)) {
      handleTagDismiss?.(ev, value);
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
    root: {
      ...rootShorthand,
      onClick,
      onKeyDown,
    },
  };
};
