import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { EmptyStateProps, EmptyStateState } from './EmptyState.types';

/**
 * Create the state required to render EmptyState.
 *
 * The returned state can be modified with hooks such as useEmptyStateStyles,
 * before being passed to renderEmptyState
 *
 * @param props - props from this instance of EmptyState
 * @param ref - reference to root HTMLElement of EmptyState
 */
export const useEmptyState = (props: EmptyStateProps, ref: React.Ref<HTMLElement>): EmptyStateState => {
  const { title } = props;

  const state: EmptyStateState = {
    components: {
      root: 'div',
      title: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    title: slot.always(
      getIntrinsicElementProps('span', {
        children: title,
      }),
      { elementType: 'span' },
    ),
  };

  return state;
};
