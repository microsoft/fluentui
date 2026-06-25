/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { AvatarGroupProvider } from '@fluentui/react-avatar';
import type { AvatarGroupContextValues } from '@fluentui/react-avatar';

import { Popover } from '../../Popover/Popover';
import { PopoverTrigger } from '../../Popover/PopoverTrigger/PopoverTrigger';
import type { AvatarGroupPopoverSlots, AvatarGroupPopoverState } from './AvatarGroupPopover.types';

/**
 * Renders the final JSX of the AvatarGroupPopover component.
 *
 * Composes the headless `Popover`, `PopoverTrigger`, and `PopoverSurface` to
 * present the overflowed AvatarGroupItems. The overflow list is wrapped in an
 * `AvatarGroupProvider` so nested AvatarGroupItems render in their overflow form.
 */
export const renderAvatarGroupPopover = (
  state: AvatarGroupPopoverState,
  contextValues: AvatarGroupContextValues,
): JSXElement => {
  assertSlots<AvatarGroupPopoverSlots>(state);

  return (
    <Popover {...state.popover}>
      <PopoverTrigger disableButtonEnhancement>
        <state.triggerButton />
      </PopoverTrigger>
      <state.popoverSurface>
        <AvatarGroupProvider value={contextValues.avatarGroup}>
          <state.content />
        </AvatarGroupProvider>
      </state.popoverSurface>
    </Popover>
  );
};
