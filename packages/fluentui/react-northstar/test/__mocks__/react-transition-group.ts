import * as React from 'react';

export * from 'react-transition-group';
export const Transition = props => {
  // @ts-ignore
  const {
    in: inProp,
    appear,
    mountOnEnter,
    unmountOnExit,
    timeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children,
    nodeRef,
    ...rest
  } = props;

  if (inProp === false) return null;

  if (children && typeof children === 'function') {
    return children({ classes: props.className }) || null;
  }

  if (!children) {
    return null;
  }

  return React.cloneElement(props.children, rest);
};
