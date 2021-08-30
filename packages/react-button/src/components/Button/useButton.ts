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
 * Given user props, returns the final state for a Button.
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
      type: 'button',
    },
    defaultProps && resolveShorthandProps(defaultProps, buttonShorthandPropsCompat),
    resolveShorthandProps(props, buttonShorthandPropsCompat),
  );

  useButtonState(state);

  return state;
};
