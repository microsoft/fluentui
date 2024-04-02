/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagPickerListState, TagPickerListSlots } from './TagPickerList.types';
import * as React from 'react';

/**
 * Render the final JSX of TagPickerList
 */
export const renderTagPickerList_unstable = (state: TagPickerListState) => {
  assertSlots<TagPickerListSlots>(state);
  if (React.Children.count(state.root.children) === 0) {
    return null;
  }
  return <state.root />;
};
