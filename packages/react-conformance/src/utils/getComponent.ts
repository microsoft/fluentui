import * as React from 'react';
import { ReactWrapper } from 'enzyme';

const getDisplayName = (Component: React.ElementType) => {
  return (
    (Component as React.ComponentType).displayName ||
    (Component as React.ComponentType).name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  );
};

const toNextNonTrivialChild = (from: ReactWrapper, helperComponentNames: string[]): ReactWrapper => {
  const current = from.childAt(0);

  return current && helperComponentNames.includes(current.name())
    ? toNextNonTrivialChild(current, helperComponentNames)
    : current;
};

export const getComponent = (
  wrapper: ReactWrapper,
  helperComponents: React.ElementType[],
  wrapperComponent?: React.ElementType,
) => {
  const helperComponentNames = [...helperComponents, ...(wrapperComponent ? [wrapperComponent] : [])].map(
    getDisplayName,
  );
  const componentElement = toNextNonTrivialChild(wrapper, helperComponentNames);
  // in that case 'topLevelChildElement' we've found so far is a wrapper's topmost child
  // thus, we should continue search
  return wrapperComponent ? toNextNonTrivialChild(componentElement, helperComponentNames) : componentElement;
};
