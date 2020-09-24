import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { useMergedRefs } from '@uifabric/react-hooks';
import { CardProps, CardState } from './Card.types';
import { renderCard } from './renderCard';
import { useCardState } from './useCardState';

const mergeProps = makeMergeProps({ deepMerge: [] });

/**
 * Given user props, returns state and render function for a Card.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLElement>, defaultProps?: CardProps) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: useMergedRefs(resolvedRef, props.cardRef),
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  ) as CardState;

  useCardState(state);

  return { state, render: renderCard };
};
