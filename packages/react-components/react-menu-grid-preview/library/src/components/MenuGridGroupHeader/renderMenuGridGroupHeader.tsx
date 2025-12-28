/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuGridGroupHeaderSlots, MenuGridGroupHeaderState } from './MenuGridGroupHeader.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGridGroupHeader_unstable = (state: MenuGridGroupHeaderState): JSXElement => {
  assertSlots<MenuGridGroupHeaderSlots>(state);

  return <state.root />;
};
