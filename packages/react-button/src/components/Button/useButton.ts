import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useButtonState } from './useButtonState';
import type { ButtonProps, ButtonShorthandPropsCompat, ButtonState } from './Button.types';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandPropsCompat: ButtonShorthandPropsCompat[] = ['icon'];

const mergeProps = makeMergeProps<ButtonState>({ deepMerge: buttonShorthandPropsCompat });

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
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
      shape: 'rounded',
      type: 'button', // This is added because the default for type is 'submit'
    },
    defaultProps && resolveShorthandProps(defaultProps, buttonShorthandPropsCompat),
    resolveShorthandProps(props, buttonShorthandPropsCompat),
  );

  useButtonState(state);

  return state;
};
