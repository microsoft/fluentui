'use client';

import type * as React from 'react';
import { useListBase_unstable, useListContextValues_unstable } from '@fluentui/react-list';

import type { ListContextValues, ListProps, ListState } from './List.types';
import { stringifyDataAttribute } from '../../utils';

export { useListContext_unstable as useListContext } from '@fluentui/react-list';

/**
 * Returns the state for a List component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderList`.
 */
export const useList = (
  props: ListProps,
  ref: React.Ref<HTMLDivElement | HTMLUListElement | HTMLOListElement>,
): ListState => {
  const baseState = useListBase_unstable(props, ref);

  const state: ListState = {
    ...baseState,
    root: {
      ...baseState.root,
      'data-navigation-mode': baseState.navigationMode,
      'data-selectable': stringifyDataAttribute(!!baseState.selection),
      focusgroup: 'toolbar block',
    },
  };

  return state;
};

/**
 * Maps the state of the list to the values that are passed through context to its children.
 */
export const useListContextValues = useListContextValues_unstable as (state: ListState) => ListContextValues;
