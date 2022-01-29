import * as React from 'react';
import { isFluentTriggerComponent } from './isFluentTriggerComponent';

/**
 * Clones a React element tree, and applies the given props to the first grandchild that is not
 * a FluentTriggerComponent or React Fragment.
 *
 * For example, the following returns a clone of the tree, with the innermost div being
 * `<div id="child" newProp="newValue" />`:
 * ```jsx
 * cloneTriggerChild(
 *   <MenuTrigger>
 *     <Tooltip>
 *       <div id="child" />
 *     </Tooltip>
 *   </MenuTrigger>,
 *   { newProp: 'newValue' }
 * );
 * ```
 */
export const cloneTriggerChild = <P>(child: React.ReactNode, props: P): React.ReactElement => {
  if (!React.isValidElement(child)) {
    throw new Error(`Component's child must be a single element`);
  }

  if (child.type === React.Fragment || isFluentTriggerComponent(child.type)) {
    const grandchild = cloneTriggerChild(child.props.children, props);
    return React.cloneElement(child, undefined, grandchild);
  }

  return React.cloneElement(child, props);
};
