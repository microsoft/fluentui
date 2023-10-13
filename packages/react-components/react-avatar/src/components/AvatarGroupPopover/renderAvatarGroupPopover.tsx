/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { AvatarGroupProvider } from '../../contexts/AvatarGroupContext';
import { AvatarGroupContextValues } from '../AvatarGroup/AvatarGroup.types';

import { assertSlots } from '@fluentui/react-utilities';
import { PopoverTrigger } from '@fluentui/react-popover';
import type { AvatarGroupPopoverState, AvatarGroupPopoverSlots } from './AvatarGroupPopover.types';

/**
 * Render the final JSX of AvatarGroupPopover
 */
export const renderAvatarGroupPopover_unstable = (
  state: AvatarGroupPopoverState,
  contextValues: AvatarGroupContextValues,
) => {
  assertSlots<AvatarGroupPopoverSlots>(state);

  return (
    <state.root>
      <PopoverTrigger disableButtonEnhancement>
        <state.tooltip>
          <state.triggerButton />
        </state.tooltip>
      </PopoverTrigger>
      <state.popoverSurface>
        <AvatarGroupProvider value={contextValues.avatarGroup}>
          <state.content />
        </AvatarGroupProvider>
      </state.popoverSurface>
    </state.root>
  );
};
