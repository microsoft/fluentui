import * as React from 'react';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TagPickerBaseState, TagPickerContextValues, TagPickerSlots } from './TagPicker.types';
import { TagPickerContextProvider } from '../../contexts/TagPickerContext';

/**
 * Render the base JSX of Picker, keeping the popover in DOM order.
 *
 * Portaling is layered on by the styled `renderTagPicker_unstable`. Keeping it in a separate module
 * is what lets consumers render a TagPicker without pulling `@fluentui/react-portal` - and with it
 * Griffel - into their bundle.
 */
export const renderTagPickerBase_unstable = (state: TagPickerBaseState, contexts: TagPickerContextValues): JSXElement =>
  renderTagPickerContent(state, contexts, state.popover);

/**
 * Shared by the base and styled renders so that portaling stays out of the base module.
 *
 * @internal
 */
export const renderTagPickerContent = (
  state: TagPickerBaseState,
  contexts: TagPickerContextValues,
  popover: React.ReactNode,
): JSXElement => {
  assertSlots<TagPickerSlots>(state);
  return (
    <TagPickerContextProvider value={contexts.picker}>
      <ActiveDescendantContextProvider value={contexts.activeDescendant}>
        <ListboxProvider value={contexts.listbox}>
          {state.trigger}
          {popover}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </TagPickerContextProvider>
  );
};
