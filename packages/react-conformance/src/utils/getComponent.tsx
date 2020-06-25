import { ReactWrapper } from 'enzyme';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';
// import { FocusZone } from '@fluentui/react-bindings';

export const getDisplayName = (Component: React.ElementType) => {
  return (
    (Component as React.ComponentType).displayName ||
    (Component as React.ComponentType).name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  );
};

// tslint:disable-next-line:no-any
export const toNextNonTrivialChild = (from: ReactWrapper, wrapperComponent: React.ElementType | undefined): any => {
  const current = from.childAt(0);
  const helperComponentNames = [...[Ref, RefFindNode], ...(wrapperComponent ? [wrapperComponent] : [])].map(
    getDisplayName,
  );

  if (!current) {
    return current;
  }

  return helperComponentNames.indexOf(current.name()) === -1
    ? current
    : toNextNonTrivialChild(current, wrapperComponent);
};

export const getComponent = (wrapper: ReactWrapper, wrapperComponent: React.ElementType | undefined) => {
  const componentElement = toNextNonTrivialChild(wrapper, wrapperComponent);

  // in that case 'topLevelChildElement' we've found so far is a wrapper's topmost child
  // thus, we should continue search
  return wrapperComponent ? toNextNonTrivialChild(componentElement, wrapperComponent) : componentElement;
};
