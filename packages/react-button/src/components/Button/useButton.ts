import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { ButtonProps, ButtonShorthandProps, ButtonState } from './Button.types';
import { useButtonState } from './useButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps: ButtonShorthandProps[] = ['children', 'icon'];

const mergeProps = makeMergeProps<ButtonState>({ deepMerge: buttonShorthandProps });

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: ButtonProps): ButtonState => {
  const state = mergeProps(
    {
      ref,
      as: 'button',
      // Slots
      icon: { as: 'span' },
      // Non-slot props
      size: 'medium',
    },
    defaultProps && resolveShorthandProps(defaultProps, buttonShorthandProps),
    resolveShorthandProps(props, buttonShorthandProps),
  );

  useButtonState(state);

  return state;
};
