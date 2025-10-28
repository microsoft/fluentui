import { AccessibilityAttributesBySlot, AccessibilityDefinition } from '@fluentui/accessibility';
import * as React from 'react';

/*
 * Accessibility types for React implementation.
 */

export interface ReactAccessibilityBehavior extends Pick<AccessibilityDefinition, 'focusZone' | 'childBehaviors'> {
  attributes: AccessibilityAttributesBySlot;
  keyHandlers: AccessibilityKeyHandlers;
  rtl: boolean;
}

export type AccessibilityKeyHandlers = {
  [slotName: string]: AccessibilityHandlerProps | undefined;
};

export type AccessibilityHandlerProps = {
  onKeyDown?: KeyboardEventHandler;
};

export type AccessibilityActionHandlers = {
  [actionName: string]: KeyboardEventHandler;
};

export type KeyboardEventHandler = (event: React.KeyboardEvent, ...args: unknown[]) => void;
