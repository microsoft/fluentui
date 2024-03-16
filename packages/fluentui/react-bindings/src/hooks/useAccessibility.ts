import { Accessibility, AccessibilityAttributesBySlot } from '@fluentui/accessibility';
import * as React from 'react';

import { getAccessibility } from '../accessibility/getAccessibility';
import { AccessibilityActionHandlers, KeyboardEventHandler, ReactAccessibilityBehavior } from '../accessibility/types';
import { FocusZone } from '../FocusZone/FocusZone';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

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

export const useAccessibility = <Props extends {}>(
  behavior: Accessibility<Props>,
  options: UseAccessibilityOptions<Props> = {},
) => {
  const { actionHandlers, debugName = 'Undefined', mapPropsToBehavior = () => ({}), rtl = false } = options;

  const definition = getAccessibility(debugName, behavior, mapPropsToBehavior(), rtl, actionHandlers);

  const latestDefinition = React.useRef<ReactAccessibilityBehavior>();
  const slotHandlers = React.useRef<Record<string, KeyboardEventHandler>>({});
  const slotProps = React.useRef<Record<string, UserProps>>({});

  useIsomorphicLayoutEffect(() => {
    latestDefinition.current = definition;
  });

  const getA11yProps: UseAccessibilityResult = (slotName, userProps) => {
    const hasKeyDownHandlers = Boolean(definition.keyHandlers[slotName] || userProps.onKeyDown);
    const childBehavior = definition.childBehaviors ? definition.childBehaviors[slotName] : undefined;
    slotProps.current[slotName] = userProps;

    // We want to avoid adding event handlers until it's really needed
    if (hasKeyDownHandlers) {
      if (!slotHandlers.current[slotName]) {
        slotHandlers.current[slotName] = (e, ...args) => {
          const accessibilityHandler = latestDefinition.current?.keyHandlers[slotName]?.onKeyDown;
          const userHandler = slotProps.current[slotName].onKeyDown;

          if (accessibilityHandler) accessibilityHandler(e);
          if (userHandler) userHandler(e, ...args);
        };
      }
    } else {
      delete slotHandlers.current[slotName];
    }

    const finalProps: MergedProps = {
      ...(childBehavior && { accessibility: childBehavior }),
      ...definition.attributes[slotName],
      ...userProps,
      onKeyDown: slotHandlers.current[slotName],
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
