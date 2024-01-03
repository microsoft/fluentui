import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
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

  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useListStyles_unstable')(state);
  return renderList_unstable(state);
});

List.displayName = 'List';
