/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';
import { ListboxProvider } from '@fluentui/react-combobox';
import type { ComboboxContextValues, ComboboxSlots, ComboboxState } from './Combobox.types';
import { OverlaySurfaceHost } from '../../overlayRuntime';
import type { WithFallbackBehavior } from '../../overlayRuntime/types';

export const renderCombobox = (state: ComboboxState, contextValues: ComboboxContextValues): JSXElement => {
  assertSlots<ComboboxSlots>(state);
  const { fallbackBehavior } = state as WithFallbackBehavior<ComboboxState>;

  return (
    <state.root>
      <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
        <ListboxProvider value={contextValues.listbox}>
          <state.input />
          {state.clearIcon && <state.clearIcon />}
          {state.expandIcon && <state.expandIcon />}
          {state.open && state.listbox ? (
            <OverlaySurfaceHost active>
              <state.listbox />
            </OverlaySurfaceHost>
          ) : null}
          {fallbackBehavior}
        </ListboxProvider>
      </ActiveDescendantContextProvider>
    </state.root>
  );
};
