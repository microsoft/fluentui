import * as React from 'react';
import { mergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { CardProps, CardState } from './Card.types';
import { renderCard } from './renderCard';
import { useCardState } from './useCardState';

/**
 * Given user props, returns state and render function for a Card.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLElement>, defaultProps?: CardProps) => {
  const state = mergeProps({ ref, as: 'div' }, defaultProps, resolveShorthandProps(props, [])) as CardState;

  useCardState(state);

  return { state, render: renderCard };
};
