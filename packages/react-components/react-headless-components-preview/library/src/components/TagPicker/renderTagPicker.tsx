/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type * as React from 'react';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { TagPickerContextProvider } from '@fluentui/react-tag-picker';

import { OverlaySurfaceHost } from '../../overlayRuntime';
import type {
  TagPickerContextValues,
  TagPickerSlots,
  TagPickerState,
} from './TagPicker.types';

export const renderTagPicker = (
  state: TagPickerState,
  contexts: TagPickerContextValues,
): JSXElement => {
  assertSlots<TagPickerSlots>(state);

  return (
    <TagPickerContextProvider value={contexts.picker}>
      <ActiveDescendantContextProvider value={contexts.activeDescendant}>
        <ListboxProvider value={contexts.listbox}>
          {state.trigger}
          {state.popover ? (
            <OverlaySurfaceHost
              active={state.open}
              inline={state.inline}
              mountNode={state.mountNode}
            >
              {state.popover as React.ReactElement}
            </OverlaySurfaceHost>
          ) : null}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </TagPickerContextProvider>
  );
};
