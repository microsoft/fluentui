/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerState, PickerSlots, PickerContextValues } from './Picker.types';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import { Portal } from '@fluentui/react-portal';
import { PickerContextProvider } from '../../contexts/PickerContext';

/**
 * Render the final JSX of Picker
 */
export const renderPicker_unstable = (state: PickerState, contexts: PickerContextValues) => {
  assertSlots<PickerSlots>(state);

  return (
    <div>
      <PickerContextProvider value={contexts.picker}>
        <ActiveDescendantContextProvider value={contexts.activeDescendant}>
          <ListboxProvider value={contexts.listbox}>
            {state.trigger}
            <Portal mountNode={state.mountNode}>{state.popover}</Portal>
          </ListboxProvider>
        </ActiveDescendantContextProvider>
      </PickerContextProvider>
    </div>
  );
};
