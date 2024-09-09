import type { PresenceComponent, PresenceMotionSlotProps } from '@fluentui/react-motion';
import * as React from 'react';

type SerializableObject = Record<string, string | boolean | number>;

/**
 * @internal
 * @todo Drawer is a first component to use this pattern, we should move this to a shared package if it will be used in more components
 */
export function mergePresenceSlots<
  BaseMotionParams extends SerializableObject = {},
  EnhancedMotionParams extends SerializableObject = {},
>(
  inputSlot: PresenceMotionSlotProps<EnhancedMotionParams> | null | undefined,
  Component: PresenceComponent<EnhancedMotionParams>,
  params: EnhancedMotionParams,
): PresenceMotionSlotProps<BaseMotionParams> | null {
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
  };
}
