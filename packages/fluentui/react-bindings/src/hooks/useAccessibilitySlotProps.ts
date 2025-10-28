import type { AccessibilityAttributes } from '@fluentui/accessibility';
import * as React from 'react';

import type { KeyboardEventHandler, ReactAccessibilityBehavior } from '../accessibility/types';
import { useEventCallback } from './useEventCallback';

type UserProps = {
  onKeyDown?: KeyboardEventHandler;
};

type MergedProps<SlotProps extends Record<string, unknown>> = SlotProps & Partial<AccessibilityAttributes> & UserProps;

export const useAccessibilitySlotProps = <SlotProps extends Record<string, unknown> & UserProps>(
  definition: ReactAccessibilityBehavior,
  slotName: string,
  slotProps: SlotProps,
): MergedProps<SlotProps> => {
  const accessibilityHandler = definition.keyHandlers[slotName]?.onKeyDown;
  const childBehavior = definition.childBehaviors ? definition.childBehaviors[slotName] : undefined;

  const handleKeyDown = useEventCallback((e: React.KeyboardEvent, ...args: unknown[]) => {
    const userHandler = slotProps.onKeyDown;

    if (accessibilityHandler) accessibilityHandler(e);
    if (userHandler) userHandler(e, ...args);
  });

  return {
    ...(childBehavior && { accessibility: childBehavior }),
    ...definition.attributes[slotName],
    ...slotProps,
    ...(!!accessibilityHandler && { onKeyDown: handleKeyDown }),
  };
};
