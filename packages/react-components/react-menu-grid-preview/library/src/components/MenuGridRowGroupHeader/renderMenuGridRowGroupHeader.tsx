/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowGroupHeaderSlots, MenuGridRowGroupHeaderState } from './MenuGridRowGroupHeader.types';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridRowGroupHeader_unstable = (state: MenuGridRowGroupHeaderState) => {
  assertSlots<MenuGridRowGroupHeaderSlots>(state);

  return <state.root />;
};
