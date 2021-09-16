import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import type { CardFooterProps, CardFooterShorthandProps, CardFooterState } from './CardFooter.types';

/**
 * Array of all shorthand properties listed in CardFooterShorthandProps
 */
export const cardFooterShorthandProps: CardFooterShorthandProps[] = ['action'];

const mergeProps = makeMergeProps<CardFooterState>({ deepMerge: cardFooterShorthandProps });

/**
 * Create the state required to render CardFooter.
 *
 * The returned state can be modified with hooks such as useCardFooterStyles,
 * before being passed to renderCardFooter.
 *
 * @param props - props from this instance of CardFooter
 * @param ref - reference to root HTMLElement of CardFooter
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useCardFooter = (
  props: CardFooterProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CardFooterProps,
): CardFooterState => {
  const state = mergeProps(
    {
      ref,
    },
    defaultProps && resolveShorthandProps(defaultProps, cardFooterShorthandProps),
    resolveShorthandProps(props, cardFooterShorthandProps),
  );

  return state;
};
