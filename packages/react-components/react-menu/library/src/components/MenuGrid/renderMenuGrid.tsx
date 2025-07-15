/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridContextValues, MenuGridSlots, MenuGridState } from './MenuGrid.types';
import { MenuGridProvider } from '../../contexts/menuGridContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGrid_unstable = (state: MenuGridState, contextValues: MenuGridContextValues) => {
  assertSlots<MenuGridSlots>(state);

  return (
    <MenuGridProvider value={contextValues.menuGrid}>
      <state.root />
    </MenuGridProvider>
  );
};
