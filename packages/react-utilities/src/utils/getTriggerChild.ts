import * as React from 'react';
import { isFluentTriggerComponent } from './isFluentTriggerComponent';

/**
 * Gets the trigger element of a FluentTriggerComponent (such as Tooltip or MenuTrigger).
 *
 * In the case where the immediate child is itself a FluentTriggerComponent and/or React Fragment,
 * it returns the first grandchild that is _not_ a FluentTriggerComponent or Fragment.
 * This allows multiple triggers to be stacked, and still apply their props to the actual trigger element.
 *
 * For example, the following returns `<div id="child" />`:
 * ```jsx
 * getTriggerChild(
 *   <Tooltip>
 *     <MenuTrigger>
 *       <>
 *         <div id="child" />
 *       </>
 *     </MenuTrigger>
 *   </Tooltip>
 * );
 * ```
 */
export const getTriggerChild = <P>(
  child: React.ReactElement<P> | React.ReactText | React.ReactFragment | React.ReactPortal | boolean | null | undefined,
): React.ReactElement<P> & { ref?: React.Ref<unknown> } => {
  if (!React.isValidElement(child)) {
    throw new Error(`Component's child must be a single element`);
  }

  if (child.type === React.Fragment || isFluentTriggerComponent(child.type)) {
    return getTriggerChild(child.props.children);
  }

  return child;
};
