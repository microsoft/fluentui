import { Accessibility, AccessibilityAttributesBySlot } from '@fluentui/accessibility';
import * as React from 'react';

import { getAccessibility } from '../accessibility/getAccessibility';
import { AccessibilityActionHandlers, KeyboardEventHandler, ReactAccessibilityBehavior } from '../accessibility/types';
import { FocusZone } from '../FocusZone/FocusZone';
import { mergeCallbacks } from '../utils/mergeCallbacks';
import { useEventCallback } from './useEventCallback';
import * as _ from 'lodash';

type UseAccessibilityOptions<Props> = {
  actionHandlers?: AccessibilityActionHandlers;
  debugName?: string;
  mapPropsToBehavior?: () => Props;
  rtl?: boolean;
};

type UseAccessibilityResult = (<SlotProps extends Record<string, any> & UserProps>(
  slotName: string,
  slotProps: SlotProps,
) => MergedProps<SlotProps>) & {
  unstable_wrapWithFocusZone: (children: React.ReactElement) => React.ReactElement;
  unstable_behaviorDefinition: () => ReactAccessibilityBehavior;
};

type UserProps = {
  onKeyDown?: KeyboardEventHandler;
};

type MergedProps<SlotProps extends Record<string, any> = any> = SlotProps &
  Partial<AccessibilityAttributesBySlot> &
  UserProps;

// ---

function useIdFallback() {
  return _.uniqueId();
}

// We don't have types for React 18 yet. Also adds a fallback
// eslint-disable-next-line no-useless-concat
export const useId = ((React as any)['use' + 'Id'] as (() => string) | undefined) ?? useIdFallback;

// --

export const useAccessibility = <Props extends {}>(
  behavior: Accessibility<Props>,
  options: UseAccessibilityOptions<Props> = {},
) => {
  const { actionHandlers, debugName = 'Undefined', mapPropsToBehavior = () => ({}), rtl = false } = options;
  const definition = getAccessibility(debugName, behavior, mapPropsToBehavior(), rtl, actionHandlers);

  // Heads up!
  // Attr should be unique per hook call to avoid collisions when multiple components use useAccessibility in the same tree.
  const slotAttr = `data-slot-name${useId()}`;

  const handleKeyDown = useEventCallback((e: React.KeyboardEvent) => {
    const slotName = (e.currentTarget as HTMLElement)?.getAttribute(slotAttr) || 'root';
    const accessibilityHandler = definition.keyHandlers[slotName]?.onKeyDown;

    accessibilityHandler?.(e);
  });

  const getA11yProps: UseAccessibilityResult = (slotName, userProps) => {
    const hasBehaviorKeyHandler = !!definition.keyHandlers[slotName];
    const hasUserKeyHandler = !!userProps.onKeyDown;

    const childBehavior = definition.childBehaviors ? definition.childBehaviors[slotName] : undefined;
    const finalProps: MergedProps = {
      ...(childBehavior && { accessibility: childBehavior }),

      ...definition.attributes[slotName],
      ...userProps,

      [slotAttr]: slotName,

      // Heads up!
      // `getA11yProps` is a function, not a hook, so we can't use `useEventCallback` here.
      // Below we are trying to avoid creating a new function on each render unless it's necessary.
      // - If there is only behavior key handler, we use it directly.
      // - If there is only user key handler, we use it directly.
      // - If both are defined, we create a new function that calls them both (⚠️unstable reference).

      ...(hasBehaviorKeyHandler && { onKeyDown: handleKeyDown }),
      ...(hasUserKeyHandler && { onKeyDown: userProps.onKeyDown }),

      ...(hasBehaviorKeyHandler &&
        hasUserKeyHandler && {
          onKeyDown: mergeCallbacks(handleKeyDown, userProps.onKeyDown),
        }),
    };

    return finalProps;
  };

  // Provides an experimental handling for FocusZone definition in behaviors
  getA11yProps.unstable_wrapWithFocusZone = (element: React.ReactElement & React.RefAttributes<any>) => {
    if (definition.focusZone) {
      let child: React.ReactElement & React.RefAttributes<any> = element;

      if (process.env.NODE_ENV !== 'production') {
        child = React.Children.only(element);
      }

      return React.createElement(FocusZone, {
        ...definition.focusZone.props,
        ...child.props,
        innerRef: child.ref,
        as: child.type,
        isRtl: rtl,
      });
    }

    return element;
  };

  getA11yProps.unstable_behaviorDefinition = () => definition;

  return getA11yProps;
};
