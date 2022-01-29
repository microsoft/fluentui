import * as React from 'react';
import { isFluentTriggerComponent } from './isFluentTriggerComponent';

/**
 * Apply the trigger props to the children, either by calling the render function, or cloning with the new props.
 */
export const applyTriggerPropsToChildren = <TTriggerProps>(
  children: React.ReactElement | ((props: TTriggerProps) => React.ReactNode) | null | undefined,
  triggerProps: TTriggerProps,
): React.ReactNode => {
  if (typeof children === 'function') {
    return children(triggerProps);
  } else if (children) {
    return cloneTriggerTree(children, triggerProps);
  }

  return children;
};

/**
 * Clones a React element tree, and applies the given props to the first grandchild that is not
 * a FluentTriggerComponent or React Fragment (the same element returned by {@link getTriggerChild}).
 */
const cloneTriggerTree = <TTriggerProps>(child: React.ReactNode, triggerProps: TTriggerProps): React.ReactElement => {
  if (!React.isValidElement(child)) {
    throw new Error(`Component's child must be a single element`);
  }

  if (child.type === React.Fragment || isFluentTriggerComponent(child.type)) {
    const grandchild = cloneTriggerTree(child.props.children, triggerProps);
    return React.cloneElement(child, undefined, grandchild);
  }

  return React.cloneElement(child, triggerProps);
};
