import type { Accessibility } from '@fluentui/accessibility';

import { getAccessibility } from '../accessibility/getAccessibility';
import type { AccessibilityActionHandlers, ReactAccessibilityBehavior } from '../accessibility/types';

type UseAccessibilityOptions<Props> = {
  actionHandlers?: AccessibilityActionHandlers;
  behaviorProps?: Props;
  rtl: boolean;
};

export const useAccessibilityBehavior = <Props extends {}>(
  behavior: Accessibility<Props>,
  options: UseAccessibilityOptions<Props>,
): ReactAccessibilityBehavior => {
  const { actionHandlers, behaviorProps, rtl = false } = options;

  // No need to memoize this as behaviors return:
  // - flat props per slots - references don't matter there
  // - action handlers - useAccessibilitySlotProps() uses useEventCallback() that does not "care" about callback references
  return getAccessibility(behavior, behaviorProps ?? {}, rtl, actionHandlers);
};
