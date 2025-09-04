/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { DrawerHeaderState, DrawerHeaderSlots } from './DrawerHeader.types';

/**
 * Render the final JSX of DrawerHeader
 */
export const renderDrawerHeader_unstable = (state: DrawerHeaderState): JSXElement => {
  assertSlots<DrawerHeaderSlots>(state);

  return <state.root />;
};
