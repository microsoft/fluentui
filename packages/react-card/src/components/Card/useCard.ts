import * as React from 'react';
import { makeMergeProps } from '@fluentui/react-utilities';
import type { CardProps, CardState } from './Card.types';

const mergeProps = makeMergeProps<CardState>();

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
    defaultProps,
    props,
  );

  return state;
};
