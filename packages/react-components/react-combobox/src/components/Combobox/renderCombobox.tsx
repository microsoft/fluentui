/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { Portal } from '@fluentui/react-portal';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';

import { assertSlots } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboboxContextValues, ComboboxState, ComboboxSlots } from './Combobox.types';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  assertSlots<ComboboxSlots>(state);

  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ComboboxContext.Provider value={contextValues.combobox}>
          <state.input />
          {state.clearIcon && <state.clearIcon />}
          <state.expandIcon />
          {state.listbox &&
            (state.inlinePopup ? (
              <state.listbox />
            ) : (
              <Portal mountNode={state.mountNode}>
                <state.listbox />
              </Portal>
            ))}
        </ComboboxContext.Provider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
