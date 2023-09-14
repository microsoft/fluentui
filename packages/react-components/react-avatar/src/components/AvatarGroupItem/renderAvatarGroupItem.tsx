/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AvatarGroupItemState, AvatarGroupItemSlots } from './AvatarGroupItem.types';

/**
 * Render the final JSX of AvatarGroupItem
 */
export const renderAvatarGroupItem_unstable = (state: AvatarGroupItemState) => {
  assertSlots<AvatarGroupItemSlots>(state);

  return (
    <state.root>
      <state.avatar />
      {state.isOverflowItem && <state.overflowLabel />}
    </state.root>
  );
};
