/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerListState, PickerListSlots } from './PickerList.types';

/**
 * Render the final JSX of PickerList
 */
export const renderPickerList_unstable = (state: PickerListState) => {
  assertSlots<PickerListSlots>(state);

  if (state.root) {
    return <state.root />;
  }

  return null;
};
