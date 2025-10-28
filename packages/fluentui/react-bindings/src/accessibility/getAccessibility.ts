import type { Accessibility, AccessibilityDefinition } from '@fluentui/accessibility';

import { getKeyDownHandlers } from './getKeyDownHandlers';
import type { AccessibilityActionHandlers, ReactAccessibilityBehavior } from './types';

export const emptyBehavior: ReactAccessibilityBehavior = {
  attributes: {},
  keyHandlers: {},
  rtl: false,
};

export const getAccessibility = <Props extends Record<string, any>>(
  behavior: Accessibility<Props>,
  behaviorProps: Props,
  isRtlEnabled: boolean,
  actionHandlers?: AccessibilityActionHandlers,
): ReactAccessibilityBehavior => {
  if (behavior === null || behavior === undefined) {
    return emptyBehavior;
  }

  const definition: AccessibilityDefinition = behavior(behaviorProps);
  const keyHandlers =
    actionHandlers && definition.keyActions
      ? getKeyDownHandlers(actionHandlers, definition.keyActions, isRtlEnabled)
      : {};

  if (definition.focusZone) {
    definition.focusZone.props = {
      // maintain behavior of focus zone in v7 behaviors
      preventFocusRestoration: true,
      ...definition.focusZone.props,
    };
  }

  return {
    ...emptyBehavior,
    ...definition,
    keyHandlers,
    rtl: isRtlEnabled,
  };
};
