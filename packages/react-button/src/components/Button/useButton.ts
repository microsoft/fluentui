import * as React from 'react';
import { resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps, ButtonState } from './Button.types';
import { useButtonState } from './useButtonState';
import { renderButton } from './renderButton';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['icon', 'loader', 'content'];

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const shorthandProps = resolveShorthandProps<ButtonProps>(props, buttonShorthandProps);

  const state: ButtonState = {
    ref: resolvedRef,
    as: props.href ? 'a' : 'button',
    components: {
      icon: 'span',
      content: 'span',
      loader: 'span',
    },
    ...shorthandProps,
  };

  useButtonState(state);

  return { state, render: renderButton };
};
