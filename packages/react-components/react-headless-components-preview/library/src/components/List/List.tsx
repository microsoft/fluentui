'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ListProps } from './List.types';
import { useList, useListContextValues } from './useList';
import { renderList } from './renderList';

export const List: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useList(props, ref);
  const contextValues = useListContextValues(state);
  return renderList(state, contextValues);
});

List.displayName = 'List';
