import * as React from 'react';
import { isFluentTrigger } from './isFluentTrigger';
import type { TriggerProps } from './types';

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
 *
 * In the case where the immediate child is not a valid element,
 * null is returned
 */
export function getTriggerChild<TriggerChildProps>(
  children: TriggerProps<TriggerChildProps>['children'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (React.ReactElement<Partial<TriggerChildProps>> & { ref?: React.Ref<any> }) | null {
  if (!React.isValidElement<TriggerChildProps>(children)) {
    return null;
  }
  return isFluentTrigger(children)
    ? getTriggerChild(
        // FIXME: This casting should be unnecessary as isFluentTrigger is a guard type method,
        // but for some reason it's failing on build
        (children.props as TriggerProps).children,
      )
    : children;
}
