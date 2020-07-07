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

  return current.length && helperComponentNames.includes(current.name())
    ? toNextNonTrivialChild(current, helperComponentNames)
    : current;
};

export const getComponent = (wrapper: ReactWrapper, wrapperComponents: React.ElementType[]) => {
  const helperComponentNames = wrapperComponents.map(getDisplayName);

  // in that case 'topLevelChildElement' we've found so far is a wrapper's topmost child
  // thus, we should continue search
  return helperComponentNames.length > 0 ? toNextNonTrivialChild(wrapper, helperComponentNames) : wrapper;
};
