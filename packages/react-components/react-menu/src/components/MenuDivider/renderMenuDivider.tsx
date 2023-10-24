/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';

/**
 * Redefine the render function to add slots. Reuse the menudivider structure but add
 * slots to children.
 */
export const renderMenuDivider_unstable = (state: MenuDividerState) => {
  assertSlots<MenuDividerSlots>(state);

  return <state.root />;
};
