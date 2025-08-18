/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowGroupHeaderSlots, MenuGridRowGroupHeaderState } from './MenuGridRowGroupHeader.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGridRowGroupHeader_unstable = (state: MenuGridRowGroupHeaderState) => {
  assertSlots<MenuGridRowGroupHeaderSlots>(state);

  return <state.root />;
};
