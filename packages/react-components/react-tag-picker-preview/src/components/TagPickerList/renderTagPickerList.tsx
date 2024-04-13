/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagPickerListState, TagPickerListSlots } from './TagPickerList.types';

/**
 * Render the final JSX of TagPickerList
 */
export const renderTagPickerList = (state: TagPickerListState) => {
  assertSlots<TagPickerListSlots>(state);
  return <state.root />;
};
