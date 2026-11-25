import * as React from 'react';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import { TagPickerContextProvider } from '@fluentui/react-tag-picker';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TagPickerState, TagPickerContextValues, TagPickerSlots } from './TagPicker.types';

/**
 * Render the final JSX of TagPicker
 */
export const renderTagPicker = (state: TagPickerState, contexts: TagPickerContextValues): JSXElement => {
  assertSlots<TagPickerSlots>(state);
  return (
    <TagPickerContextProvider value={contexts.picker}>
      <ActiveDescendantContextProvider value={contexts.activeDescendant}>
        <ListboxProvider value={contexts.listbox}>
          {state.trigger}
          {state.popover}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </TagPickerContextProvider>
  );
};
