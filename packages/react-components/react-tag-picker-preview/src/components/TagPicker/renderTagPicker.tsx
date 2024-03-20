import * as React from 'react';
import type { TagPickerState, TagPickerContextValues } from './TagPicker.types';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import { Portal } from '@fluentui/react-portal';
import { TagPickerContextProvider } from '../../contexts/TagPickerContext';

/**
 * Render the final JSX of Picker
 */
export const renderTagPicker_unstable = (state: TagPickerState, contexts: TagPickerContextValues) => {
  return (
    <TagPickerContextProvider value={contexts.picker}>
      <ActiveDescendantContextProvider value={contexts.activeDescendant}>
        <ListboxProvider value={contexts.listbox}>
          {state.trigger}
          {state.popover && <Portal mountNode={state.mountNode}>{state.popover}</Portal>}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </TagPickerContextProvider>
  );
};
