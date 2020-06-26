import { ReactWrapper } from 'enzyme';

export const getDisplayName = (Component: React.ElementType) => {
  return (
    (Component as React.ComponentType).displayName ||
    (Component as React.ComponentType).name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  );
};

export const toNextNonTrivialChild = (from: ReactWrapper, wrapperComponents: React.ElementType[]): ReactWrapper => {
  const current = from.childAt(0);

  if (!current) {
    return current;
  }

  const helperComponentNames = wrapperComponents.map(getDisplayName);

  return helperComponentNames.indexOf(current.name()) === -1
    ? current
    : toNextNonTrivialChild(current, wrapperComponents);
};

export const getComponent = (wrapper: ReactWrapper, wrapperComponents: React.ElementType[]) => {
  const componentElement = toNextNonTrivialChild(wrapper, wrapperComponents);

  // in that case 'topLevelChildElement' we've found so far is a wrapper's topmost child
  // thus, we should continue search
  return wrapperComponents ? toNextNonTrivialChild(componentElement, wrapperComponents) : componentElement;
};
