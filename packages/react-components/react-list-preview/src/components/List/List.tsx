import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useList_unstable } from './useList';
import { renderList_unstable } from './renderList';
import { useListStyles_unstable } from './useListStyles.styles';
import type { ListProps } from './List.types';

/**
 * List component - TODO: add more docs
 */
export const List: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useList_unstable(props, ref);

  useListStyles_unstable(state);
  return renderList_unstable(state);
});

List.displayName = 'List';
