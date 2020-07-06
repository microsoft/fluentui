import { ReactWrapper } from 'enzyme';
import { FocusZone } from '@fluentui/react-bindings';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';

const getDisplayName = (Component: React.ElementType) => {
  return (
    (Component as React.ComponentType).displayName ||
    (Component as React.ComponentType).name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  );
};

const toNextNonTrivialChild = (from: ReactWrapper, wrapperComponent: React.ElementType | undefined): ReactWrapper => {
  const current = from.childAt(0);

  if (!current) {
    return current;
  }

  const helperComponentNames = [...[Ref, RefFindNode], ...(wrapperComponent ? [wrapperComponent] : [])].map(
    getDisplayName,
  );

  return helperComponentNames.indexOf(current.name()) === -1
    ? current
    : toNextNonTrivialChild(current, wrapperComponent);
};

export const getComponent = (wrapper: ReactWrapper, wrapperComponent: React.ElementType | undefined) => {
  let componentElement = toNextNonTrivialChild(wrapper, wrapperComponent);
  // passing through Focus Zone wrappers
  if (componentElement.type() === FocusZone) {
    // another HOC component is added: FocusZone
    componentElement = componentElement.childAt(0); // skip through <FocusZone>
  }

  // in that case 'topLevelChildElement' we've found so far is a wrapper's topmost child
  // thus, we should continue search
  return wrapperComponent ? toNextNonTrivialChild(componentElement, wrapperComponent) : componentElement;
};
