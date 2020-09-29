import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps } from './Button.types';
import { useButtonState } from './useButtonState';
import { renderButton } from './renderButton';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['icon', 'loader', 'content'];

const mergeProps = makeMergeProps({ deepMerge: buttonShorthandProps });

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: ButtonProps) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      components: {
        icon: 'span',
        content: 'span',
        loader: 'span',
      },
      ref: resolvedRef,
      as: 'button',
    },
    defaultProps,
    resolveShorthandProps(props, buttonShorthandProps),
  );

  useButtonState(state);

  return { state, render: renderButton };
};
