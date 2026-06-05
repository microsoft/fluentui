/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import type { ComboboxContextValues, ComboboxSlots, ComboboxState } from './Combobox.types';

export const renderCombobox = (state: ComboboxState, contextValues: ComboboxContextValues): JSXElement => {
  assertSlots<ComboboxSlots>(state);

  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxProvider value={contextValues.listbox}>
          <state.input />
          {state.clearIcon && <state.clearIcon />}
          {state.expandIcon && <state.expandIcon />}
          {state.open && state.listbox && <state.listbox />}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
