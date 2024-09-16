/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { Portal } from '@fluentui/react-portal';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';

import { assertSlots } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboboxContextValues, ComboboxState, ComboboxSlots } from './Combobox.types';
import { ListboxProvider } from '../../contexts/ListboxContext';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  assertSlots<ComboboxSlots>(state);

  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxProvider value={contextValues.listbox}>
          {/*eslint-disable-next-line deprecation/deprecation*/}
          <ComboboxContext.Provider value={contextValues.combobox}>
            <state.input />
            {state.clearIcon && <state.clearIcon />}
            {state.expandIcon && <state.expandIcon />}
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
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
