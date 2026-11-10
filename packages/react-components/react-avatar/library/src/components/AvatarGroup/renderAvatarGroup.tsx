/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import { AvatarGroupProvider } from '../../contexts/AvatarGroupContext';
import type { AvatarGroupSlots, AvatarGroupContextValues, AvatarGroupBaseState } from './AvatarGroup.types';

/**
 * Render the final JSX of AvatarGroup
 */
export const renderAvatarGroup_unstable = (
  state: AvatarGroupBaseState,
  contextValues: AvatarGroupContextValues,
): JSXElement => {
  assertSlots<AvatarGroupSlots>(state);

  return (
    <AvatarGroupProvider value={contextValues.avatarGroup}>
      <state.root />
    </AvatarGroupProvider>
  );
};
