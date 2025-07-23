/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AppItemState, AppItemSlots } from './AppItem.types';

/**
 * Render the final JSX of AppItem
 */
export const renderAppItem_unstable = (state: AppItemState) => {
  assertSlots<AppItemSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
    </state.root>
  );
};
