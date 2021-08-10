import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { CardProps, CardShorthandProps, CardState } from './Card.types';

/**
 * Array of all shorthand properties listed in CardShorthandProps
 */
export const cardShorthandProps: CardShorthandProps[] = [
  /* TODO add shorthand property names */
];

const mergeProps = makeMergeProps<CardState>({ deepMerge: cardShorthandProps });

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles,
 * before being passed to renderCard.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to root HTMLElement of Card
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLElement>, defaultProps?: CardProps): CardState => {
  const state = mergeProps(
    {
      ref,
    },
    defaultProps && resolveShorthandProps(defaultProps, cardShorthandProps),
    resolveShorthandProps(props, cardShorthandProps),
  );

  return state;
};
