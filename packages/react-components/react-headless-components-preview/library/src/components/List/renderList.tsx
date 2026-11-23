import * as React from 'react';
import { renderList_unstable } from '@fluentui/react-list';
import type { JSXElement } from '@fluentui/react-utilities';

import type { ListContextValues, ListState } from './List.types';
import { ListNavigationProvider } from './listNavigationContext';

/**
 * Renders List and provides its navigation mode to the headless ListItem hooks.
 */
export const renderList = (state: ListState, contextValues: ListContextValues): JSXElement => (
  <ListNavigationProvider value={state.navigationMode}>
    {renderList_unstable(state, contextValues)}
  </ListNavigationProvider>
);
