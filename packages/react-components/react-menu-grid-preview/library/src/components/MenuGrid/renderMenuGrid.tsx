/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuGridContextValues, MenuGridSlots, MenuGridState } from './MenuGrid.types';
import { MenuGridContextProvider } from '../../contexts/menuGridContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGrid_unstable = (state: MenuGridState, contextValues: MenuGridContextValues): JSXElement => {
  assertSlots<MenuGridSlots>(state);

  return (
    <MenuGridContextProvider value={contextValues.menuGrid}>
      <state.root />
    </MenuGridContextProvider>
  );
};
