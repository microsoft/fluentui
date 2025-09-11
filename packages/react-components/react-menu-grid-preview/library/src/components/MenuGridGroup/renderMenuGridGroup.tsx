/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuGridGroupContextValues, MenuGridGroupSlots, MenuGridGroupState } from './MenuGridGroup.types';
import { MenuGridGroupContextProvider } from '../../contexts/menuGridGroupContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGridGroup_unstable = (
  state: MenuGridGroupState,
  contextValues: MenuGridGroupContextValues,
): JSXElement => {
  assertSlots<MenuGridGroupSlots>(state);

  return (
    <MenuGridGroupContextProvider value={contextValues.MenuGridGroup}>
      <state.root />
    </MenuGridGroupContextProvider>
  );
};
