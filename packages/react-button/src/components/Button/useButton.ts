import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { ButtonProps, ButtonState } from './Button.types';
import { useButtonState } from './useButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['children', 'icon'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<ButtonState>({ deepMerge: buttonShorthandProps });

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: ButtonProps): ButtonState => {
  const state = mergeProps(
    {
      ref,
      as: 'button',
      icon: { as: 'span' },
    },
    defaultProps && resolveShorthandProps(defaultProps, buttonShorthandProps),
    resolveShorthandProps(props, buttonShorthandProps),
  );

  useButtonState(state);

  return state;
};
