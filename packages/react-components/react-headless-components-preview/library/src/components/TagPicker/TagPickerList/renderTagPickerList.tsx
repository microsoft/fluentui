/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerListSlots, TagPickerListState } from './TagPickerList.types';

/**
 * Render the final JSX of TagPickerList.
 */
export const renderTagPickerList = (state: TagPickerListState): JSXElement => {
  assertSlots<TagPickerListSlots>(state);

  return <state.root />;
};
