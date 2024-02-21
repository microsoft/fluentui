/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';

import { assertSlots } from '@fluentui/react-utilities';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { DropdownContextValues, DropdownState, DropdownSlots } from './Dropdown.types';
import { ListboxContext } from '../../contexts/ListboxContext';

/**
 * Render the final JSX of Dropdown
 */
export const renderDropdown_unstable = (state: DropdownState, contextValues: DropdownContextValues) => {
  assertSlots<DropdownSlots>(state);

  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxContext.Provider value={contextValues.listbox}>
          {/*eslint-disable-next-line deprecation/deprecation*/}
          <ComboboxContext.Provider value={contextValues.combobox}>
            <state.button>
              {state.button.children}
              {state.expandIcon && <state.expandIcon />}
            </state.button>
            {state.clearButton && <state.clearButton />}
            {state.listbox &&
              (state.inlinePopup ? (
                <state.listbox />
              ) : (
                <Portal mountNode={state.mountNode}>
                  <state.listbox />
                </Portal>
              ))}
            {/*eslint-disable-next-line deprecation/deprecation*/}
          </ComboboxContext.Provider>
        </ListboxContext.Provider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
