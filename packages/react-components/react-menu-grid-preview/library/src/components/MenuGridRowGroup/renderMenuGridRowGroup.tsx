/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowGroupContextValues, MenuGridRowGroupSlots, MenuGridRowGroupState } from './MenuGridRowGroup.types';
import { MenuGridRowGroupContextProvider } from '../../contexts/menuGridRowGroupContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGridRowGroup_unstable = (
  state: MenuGridRowGroupState,
  contextValues: MenuGridRowGroupContextValues,
) => {
  assertSlots<MenuGridRowGroupSlots>(state);

  return (
    <MenuGridRowGroupContextProvider value={contextValues.menuGridRowGroup}>
      <state.root />
    </MenuGridRowGroupContextProvider>
  );
};
