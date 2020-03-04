import { Accessibility, AccessibilityAttributesBySlot } from '@fluentui/accessibility';
import * as React from 'react';

import getAccessibility from '../accessibility/getAccessibility';
import { AccessibilityActionHandlers, KeyboardEventHandler } from '../accessibility/types';
import FocusZone from '../FocusZone/FocusZone';

type UseAccessibilityOptions<Props> = {
  actionHandlers?: AccessibilityActionHandlers;
  debugName?: string;
  mapPropsToBehavior?: () => Props;
  rtl?: boolean;
};

type UseAccessibilityResult = (<SlotProps extends Record<string, any>>(
  slotName: string,
  slotProps: SlotProps
) => MergedProps<SlotProps>) & {
  unstable_wrapWithFocusZone: (children: React.ReactElement) => React.ReactElement;
};

type UserProps = {
  onKeyDown?: KeyboardEventHandler;
};

type MergedProps<SlotProps extends Record<string, any> = any> = SlotProps & Partial<AccessibilityAttributesBySlot> & UserProps;

const useAccessibility = <Props>(behavior: Accessibility<Props>, options: UseAccessibilityOptions<Props> = {}) => {
  const { actionHandlers, debugName = 'Undefined', mapPropsToBehavior = () => ({}), rtl = false } = options;

  const definition = getAccessibility(debugName, behavior, mapPropsToBehavior(), rtl, actionHandlers);

  const slotHandlers = React.useRef<Record<string, KeyboardEventHandler>>({});
  const slotProps = React.useRef<Record<string, UserProps>>({});

  const getA11Props: UseAccessibilityResult = (slotName, userProps) => {
    slotProps.current[slotName] = userProps;

    if (!slotHandlers.current[slotName]) {
      slotHandlers.current[slotName] = (e, ...args) => {
        const accessibilityHandler = definition.keyHandlers[slotName].onKeyDown;
        const userHandler = slotProps.current[slotName].onKeyDown;

        if (accessibilityHandler) accessibilityHandler(e);
        if (userHandler) userHandler(e, ...args);
      };
    }

    const finalProps: MergedProps = {
      ...definition.attributes[slotName],
      ...userProps,
      onKeyDown: slotHandlers.current[slotName]
    };

    return finalProps;
  };

  // Provides an experimental handling for FocusZone definition in behaviors
  getA11Props.unstable_wrapWithFocusZone = (element: React.ReactElement) => {
    if (definition.focusZone) {
      let child: React.ReactElement = element;

      if (process.env.NODE_ENV !== 'production') {
        child = React.Children.only(element);
      }

      return React.createElement(FocusZone, {
        ...definition.focusZone.props,
        ...child.props,
        as: child.type,
        isRtl: rtl
      });
    }

    return element;
  };

  return getA11Props;
};

export default useAccessibility;
