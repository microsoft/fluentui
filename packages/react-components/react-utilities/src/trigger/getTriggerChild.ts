import * as React from 'react';
import { isFluentTrigger } from './isFluentTrigger';

/**
 * @internal
 * Gets the trigger element of a FluentTriggerComponent (such as Tooltip or MenuTrigger).
 *
 * In the case where the immediate child is itself a FluentTriggerComponent and/or React Fragment,
 * it returns the first descendant that is _not_ a FluentTriggerComponent or Fragment.
 * This allows multiple triggers to be stacked, and still apply their props to the actual trigger element.
 *
 * For example, the following returns `<div id="child" />`:
 * ```jsx
 * getTriggerChild(
 *   <Tooltip>
 *     <MenuTrigger>
 *       <div id="child" />
 *     </MenuTrigger>
 *   </Tooltip>
 * );
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTriggerChild = <P = any>(
  children: React.ReactNode,
): React.ReactElement<P> & { ref?: React.Ref<unknown> } => {
  const child = React.Children.only(children) as React.ReactElement;
  return isFluentTrigger(child) ? getTriggerChild(child.props.children) : child;
};
