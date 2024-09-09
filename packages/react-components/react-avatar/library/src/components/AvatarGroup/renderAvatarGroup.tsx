/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { AvatarGroupProvider } from '../../contexts/AvatarGroupContext';
import type { AvatarGroupState, AvatarGroupSlots, AvatarGroupContextValues } from './AvatarGroup.types';

/**
 * Render the final JSX of AvatarGroup
 */
export const renderAvatarGroup_unstable = (state: AvatarGroupState, contextValues: AvatarGroupContextValues) => {
  assertSlots<AvatarGroupSlots>(state);

  return (
    <AvatarGroupProvider value={contextValues.avatarGroup}>
      <state.root />
    </AvatarGroupProvider>
  );
};
