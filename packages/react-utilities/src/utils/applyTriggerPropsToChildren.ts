import * as React from 'react';
import { onlyChild } from './onlyChild';

/**
 * Apply the trigger props to the children, either by calling the render function, or cloning with the new props.
 */
export const applyTriggerPropsToChildren = <TTriggerProps>(
  children: React.ReactElement | ((props: TTriggerProps) => React.ReactNode) | null | undefined,
  triggerProps: TTriggerProps,
): React.ReactElement<TTriggerProps> => {
  if (typeof children === 'function') {
    (children as React.ReactNode) = children(triggerProps);
  } else if (children) {
    (children as React.ReactNode) = React.cloneElement(onlyChild(children), triggerProps);
  }

  return children as React.ReactElement<TTriggerProps>;
};
