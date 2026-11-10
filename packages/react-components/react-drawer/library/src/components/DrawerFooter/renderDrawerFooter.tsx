/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { DrawerFooterSlots, DrawerFooterState } from './DrawerFooter.types';

/**
 * Render the final JSX of DrawerFooter
 */
export const renderDrawerFooter_unstable = (state: DrawerFooterState): JSXElement => {
  assertSlots<DrawerFooterSlots>(state);

  return <state.root />;
};
