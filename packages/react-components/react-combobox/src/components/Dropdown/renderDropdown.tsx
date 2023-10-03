/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';

import { assertSlots } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { DropdownContextValues, DropdownState, DropdownSlots } from './Dropdown.types';

/**
 * Render the final JSX of Dropdown
 */
export const renderDropdown_unstable = (state: DropdownState, contextValues: DropdownContextValues) => {
  assertSlots<DropdownSlots>(state);

  return (
    <state.root>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <state.button>
          {state.button.children}
          {state.expandIcon && <state.expandIcon />}
        </state.button>
        {state.listbox &&
          (state.inlinePopup ? (
            <state.listbox />
          ) : (
            <Portal mountNode={state.mountNode}>
              <state.listbox />
            </Portal>
          ))}
      </ComboboxContext.Provider>
    </state.root>
  );
};
