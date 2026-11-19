'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderList, useList, useListContextValues } from '@fluentui/react-headless-components-preview/list';

import type { ListProps } from './List.types';
import { useListStyles } from './useListStyles';

/** A list with optional selection and keyboard navigation. */
export const List: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useList(props, ref);
  const styled = useListStyles(state);
  const contextValues = useListContextValues(styled);

  return renderList(styled, contextValues);
});

List.displayName = 'List';
