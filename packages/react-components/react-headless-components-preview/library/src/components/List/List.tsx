'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ListProps } from './List.types';
import { useList, useListContextValues } from './useList';
import { renderList } from './renderList';

/**
 * Represents a collection of `ListItem` children, optionally with selection support.
 *
 * The list owns the `list` / `listbox` / `grid` role and coordinates selection, so `ListItem`
 * must always be rendered inside a `List`.
 */
export const List: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useList(props, ref);
  const contextValues = useListContextValues(state);

  return renderList(state, contextValues);
});

List.displayName = 'List';
