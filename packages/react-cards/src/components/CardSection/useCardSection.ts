import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
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
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef()),
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  ) as CardSectionState;

  return { state, render: renderCardSection };
};
