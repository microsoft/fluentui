/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerListState, TagPickerListSlots } from './TagPickerList.types';

/**
 * Render the final JSX of TagPickerList
 */
export const renderTagPickerList_unstable = (state: TagPickerListState): JSXElement => {
  assertSlots<TagPickerListSlots>(state);
  return <state.root />;
};
