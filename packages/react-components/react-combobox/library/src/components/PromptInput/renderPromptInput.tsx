/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';
import type { PromptInputState, PromptInputSlots } from './PromptInput.types';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '../../contexts/ListboxContext';
import { ComboboxBaseContextValues } from '../../utils/ComboboxBase.types';

/**
 * Render the final JSX of PromptInput
 */
export const renderPromptInput_unstable = (state: PromptInputState, contextValues: ComboboxBaseContextValues) => {
  assertSlots<PromptInputSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <>
      <state.root />
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxProvider value={contextValues.listbox}>
          {state.listbox &&
            (state.inlinePopup ? (
              <state.listbox />
            ) : (
              <Portal mountNode={state.mountNode}>
                <state.listbox />
              </Portal>
            ))}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </>
  );
};
