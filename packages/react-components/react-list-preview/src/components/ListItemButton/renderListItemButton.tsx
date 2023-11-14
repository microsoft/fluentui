/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListItemButtonState, ListItemButtonSlots } from './ListItemButton.types';

/**
 * Render the final JSX of ListItemButton
 */
export const renderListItemButton_unstable = (state: ListItemButtonState) => {
  assertSlots<ListItemButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
