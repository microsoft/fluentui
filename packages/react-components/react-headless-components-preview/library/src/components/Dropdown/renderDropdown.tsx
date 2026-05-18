/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import type { DropdownContextValues, DropdownState, DropdownSlots } from './Dropdown.types';
import { ListboxProvider } from '@fluentui/react-combobox';

/**
 * Render the final JSX of Dropdown
 */
export const renderDropdown = (state: DropdownState, contextValues: DropdownContextValues): JSXElement => {
  assertSlots<DropdownSlots>(state);

  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxProvider value={contextValues.listbox}>
          <state.button>
            {state.button.children}
            {state.expandIcon && <state.expandIcon />}
          </state.button>
          {state.clearButton && <state.clearButton />}
          {state.open && state.listbox && <state.listbox />}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
