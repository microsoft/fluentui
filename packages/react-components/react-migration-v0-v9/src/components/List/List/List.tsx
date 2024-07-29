import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useList_unstable } from './useList';
import { renderList_unstable } from './renderList';
import { useListStyles_unstable } from './useListStyles.styles';
import type { ListProps } from './List.types';
import { useListContextValues_unstable } from './useListContextValues';

//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const List: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useList_unstable(props, ref);
  const contextValues = useListContextValues_unstable(state);

  useListStyles_unstable(state);
  useCustomStyleHook_unstable('useListStyles_unstable')(state);

  return renderList_unstable(state, contextValues);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<ListProps>;

List.displayName = 'List';
