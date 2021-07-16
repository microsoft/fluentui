import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { InputProps, InputShorthandProps, InputState } from './Input.types';

/**
 * Array of all shorthand properties listed in InputShorthandProps
 */
export const inputShorthandProps: InputShorthandProps[] = [
  /* TODO add shorthand property names */
];

const mergeProps = makeMergeProps<InputState>({ deepMerge: inputShorthandProps });

/**
 * Create the state required to render Input.
 *
 * The returned state can be modified with hooks such as useInputStyles,
 * before being passed to renderInput.
 *
 * @param props - props from this instance of Input
 * @param ref - reference to root HTMLElement of Input
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useInput = (props: InputProps, ref: React.Ref<HTMLElement>, defaultProps?: InputProps): InputState => {
  const state = mergeProps(
    {
      ref,
    },
    defaultProps && resolveShorthandProps(defaultProps, inputShorthandProps),
    resolveShorthandProps(props, inputShorthandProps),
  );

  return state;
};
