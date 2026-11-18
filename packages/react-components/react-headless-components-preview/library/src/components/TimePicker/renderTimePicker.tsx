/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import type { TimePickerContextValues, TimePickerSlots, TimePickerState } from './TimePicker.types';

/**
 * Renders the TimePicker slots from the state returned by `useTimePicker`. TimePicker renders like a Combobox.
 */
export const renderTimePicker = (state: TimePickerState, contextValues: TimePickerContextValues): JSXElement => {
  assertSlots<TimePickerSlots>(state);
  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxProvider value={contextValues.listbox}>
          <state.input />
          {state.clearIcon && <state.clearIcon />}
          {state.expandIcon && <state.expandIcon />}
          {state.shouldRenderListbox && state.listbox && <state.listbox />}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
