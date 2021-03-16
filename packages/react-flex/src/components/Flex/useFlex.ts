import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { FlexProps, FlexState } from './Flex.types';

export const flexShorthandProps: (keyof FlexProps)[] = [];

const mergeProps = makeMergeProps<FlexState>({ deepMerge: flexShorthandProps });

/**
 * Create the state required to render Flex.
 *
 * The returned state can be modified with hooks such as useFlexStyles,
 * before being passed to renderFlex.
 *
 * @param props - props from this instance of Flex
 * @param ref - reference to root HTMLElement of Flex
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Flex }
 */
export const useFlex = (props: FlexProps, ref: React.Ref<HTMLElement>, defaultProps?: FlexProps): FlexState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, flexShorthandProps),
  );

  return state;
};
