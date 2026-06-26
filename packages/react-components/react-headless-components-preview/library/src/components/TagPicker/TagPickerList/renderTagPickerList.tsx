/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerListSlots, TagPickerListState } from './TagPickerList.types';

/**
 * Render the final JSX of TagPickerList.
 *
 * Kept local rather than re-exporting `renderTagPickerList_unstable`: the headless list is built on
 * the headless `Listbox` (Dropdown primitive), so its state/root slot differ from the base list.
 */
export const renderTagPickerList = (state: TagPickerListState): JSXElement => {
  assertSlots<TagPickerListSlots>(state);

  return <state.root />;
};
