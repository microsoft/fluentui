/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowSlots, MenuGridRowState } from './MenuGridRow.types';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridRow_unstable = (state: MenuGridRowState) => {
  assertSlots<MenuGridRowSlots>(state);

  return <state.root />;
};
