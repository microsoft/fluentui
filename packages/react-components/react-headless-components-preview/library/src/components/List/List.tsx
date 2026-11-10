'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ListProps } from './List.types';
import { useList, useListContextValues } from './useList';
import { renderList } from './renderList';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Represents a collection of `ListItem` children, optionally with selection support.
 *
 * The list owns the `list` / `listbox` / `grid` role and coordinates selection, so `ListItem`
 * must always be rendered inside a `List`.
 */
export const List: ForwardRefComponent<ListProps> = /*#__PURE__*/ composeComponent(
  'List',
  useList,
  useListContextValues,
  renderList,
);
