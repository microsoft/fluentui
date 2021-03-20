import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { CardProps, CardState } from './Card.types';
import { renderCard } from './renderCard';
import { useCardState } from './useCardState';

const mergeProps = makeMergeProps<CardState>({ deepMerge: [] });

/**
 * Given user props, returns state and render function for a Card.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLElement>, defaultProps?: CardProps) => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  useCardState(state);

  return { state, render: renderCard };
};
