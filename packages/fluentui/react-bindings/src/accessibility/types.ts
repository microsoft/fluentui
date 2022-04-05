import { AccessibilityAttributesBySlot, AccessibilityDefinition } from '@fluentui/accessibility';
import * as React from 'react';

/*
 * Accessibility types for React implementation.
 */

export interface ReactAccessibilityBehavior extends AccessibilityDefinition {
  attributes: AccessibilityAttributesBySlot;
  keyHandlers: AccessibilityKeyHandlers;
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

export type KeyboardEventHandler = (event: React.KeyboardEvent) => void;
