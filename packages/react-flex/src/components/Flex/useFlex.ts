import * as React from 'react';
import { makeMergeProps } from '@fluentui/react-utilities';
import { FlexProps, FlexState } from './Flex.types';

const mergeProps = makeMergeProps<FlexState>();

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
      ref,
    },
    defaultProps,
    props,
  );

  return state;
};
