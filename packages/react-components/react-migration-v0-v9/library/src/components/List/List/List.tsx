import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useList_unstable } from './useList';
import { renderList_unstable } from './renderList';
import { useListStyles_unstable } from './useListStyles.styles';
import type { ListProps } from './List.types';
import { useListContextValues_unstable } from './useListContextValues';

export const List: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useList_unstable(props, ref);
  const contextValues = useListContextValues_unstable(state);

  useListStyles_unstable(state);
  useCustomStyleHook_unstable('useListStyles_unstable')(state);

  return renderList_unstable(state, contextValues);
});

List.displayName = 'List';
