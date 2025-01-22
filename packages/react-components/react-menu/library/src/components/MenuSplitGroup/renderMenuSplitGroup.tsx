/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { MenuSplitGroupState, MenuSplitGroupSlots } from './MenuSplitGroup.types';
import { MenuSplitGroupContextProvider } from '../../contexts/menuSplitGroupContext';

/**
 * Render the final JSX of MenuSplitGroup
 */
export const renderMenuSplitGroup_unstable = (state: MenuSplitGroupState) => {
  assertSlots<MenuSplitGroupSlots>(state);

  return (
    <MenuSplitGroupContextProvider value={true}>
      <state.root />
    </MenuSplitGroupContextProvider>
  );
};
