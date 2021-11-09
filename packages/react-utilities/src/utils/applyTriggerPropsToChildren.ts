import * as React from 'react';
import { onlyChild } from './onlyChild';

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
    return React.cloneElement(onlyChild(children), triggerProps);
  }

  return children;
};
