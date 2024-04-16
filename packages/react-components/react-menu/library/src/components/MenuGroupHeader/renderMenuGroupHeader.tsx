/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Redefine the render function to add slots. Reuse the menugroupheader structure but add
 * slots to children.
 */
export const renderMenuGroupHeader_unstable = (state: MenuGroupHeaderState) => {
  assertSlots<MenuGroupHeaderSlots>(state);

  return <state.root />;
};
