/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowSlots, MenuGridRowState } from './MenuGridRow.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGridRow_unstable = (state: MenuGridRowState) => {
  assertSlots<MenuGridRowSlots>(state);

  return <state.root />;
};
