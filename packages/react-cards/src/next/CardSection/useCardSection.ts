import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { CardSectionProps, CardSectionState } from './CardSection.types';
import { renderCardSection } from './renderCardSection';

const mergeProps = makeMergeProps({ deepMerge: [] });

/**
 * Given user props, returns state and render function for a CardSection.
 */
export const useCardSection = (
  props: CardSectionProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CardSectionProps,
) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  ) as CardSectionState;

  return { state, render: renderCardSection };
};
