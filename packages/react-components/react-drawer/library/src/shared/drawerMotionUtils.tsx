import type { PresenceComponent, PresenceMotionSlotProps } from '@fluentui/react-motion';
import * as React from 'react';

/**
 * @internal
 * @todo Drawer is a first component to use this pattern, we should move this to a shared package if it will be used in more components
 */
export function mergePresenceSlots<MotionParams extends Record<string, string | boolean | number> = {}>(
  inputSlot: PresenceMotionSlotProps<MotionParams> | null | undefined,
  Component: PresenceComponent<MotionParams>,
  params: MotionParams,
) {
  if (inputSlot === null) {
    return null;
  }

  return {
    ...inputSlot,
    children: (_, props) => {
      if (inputSlot?.children) {
        return inputSlot.children(Component, { ...props, ...params });
      }

      return (
        <Component {...props} {...params}>
          {props.children}
        </Component>
      );
    },
  } satisfies PresenceMotionSlotProps;
}
