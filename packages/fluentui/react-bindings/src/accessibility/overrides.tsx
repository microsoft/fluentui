import * as React from 'react';
import { chatBehavior, chatMessageBehavior } from '@fluentui/accessibility';

export interface OverridableBehaviors {
  Chat?: typeof chatBehavior;
  ChatMessage?: typeof chatMessageBehavior;
}

const AccessibilityBehaviorOverridesContext = React.createContext<OverridableBehaviors>({});

export interface AccessibilityBehaviorOverridesProviderProps {
  overrides: OverridableBehaviors;
}

export const AccessibilityBehaviorOverridesProvider: React.FunctionComponent<AccessibilityBehaviorOverridesProviderProps> = props => {
  const oldOverrides = React.useContext(AccessibilityBehaviorOverridesContext);
  const newOverrides = props.overrides;

  const overrides: OverridableBehaviors = React.useMemo(() => {
    const value: OverridableBehaviors = {};

    for (const name of Object.keys(oldOverrides) as (keyof OverridableBehaviors)[]) {
      value[name] = oldOverrides[name] as any;
    }

    for (const name of Object.keys(newOverrides) as (keyof OverridableBehaviors)[]) {
      value[name] = newOverrides[name] as any;
    }

    return value;
  }, [oldOverrides, newOverrides]);

  return (
    <AccessibilityBehaviorOverridesContext.Provider value={overrides}>
      {props.children}
    </AccessibilityBehaviorOverridesContext.Provider>
  );
};

export function useAccessibilityBehaviorOverride<B extends keyof OverridableBehaviors>(
  name: B,
  defaultValue: OverridableBehaviors[B],
) {
  return React.useContext(AccessibilityBehaviorOverridesContext)[name] || defaultValue;
}
