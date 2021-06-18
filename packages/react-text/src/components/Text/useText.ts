import * as React from 'react';
import { makeMergeProps } from '@fluentui/react-utilities';
import { TextProps, TextState } from './Text.types';

const mergeProps = makeMergeProps<TextState>();

/**
 * Create the state required to render Text.
 *
 * The returned state can be modified with hooks such as useTextStyles,
 * before being passed to renderText.
 *
 * @param props - props from this instance of Text
 * @param ref - reference to root HTMLElement of Text
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useText = (props: TextProps, ref: React.Ref<HTMLElement>, defaultProps?: TextProps): TextState => {
  const state = mergeProps(
    {
      ref,
    },
    defaultProps,
    props,
  );

  return state;
};
