import * as React from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { MessageBarTransitionContextProvider } from '../../contexts/messageBarTransitionContext';
import { MessageBarGroupProps } from './MessageBarGroup.types';

// TODO: delete this unused code to save bytes
const getClassName = (
  status: TransitionStatus,
  enterClassName: string,
  exitClassName: string,
  animate: MessageBarGroupProps['animate'],
) => {
  switch (status) {
    case 'entering':
    case 'entered':
      return animate === 'both' ? enterClassName : '';
    case 'exiting':
    case 'exited':
      return exitClassName;
    default:
      return '';
  }
};

/**
 * Internal component that controls the animation transition for MessageBar components
 * @internal
 * @deprecated Code is unused, replaced by motion components
 */
export const MessageBarTransition: React.FC<{
  children: React.ReactElement;
  enterClassName: string;
  exitClassName: string;
  animate: MessageBarGroupProps['animate'];
}> = ({ children, enterClassName, exitClassName, animate, ...rest }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Transition timeout={250} nodeRef={nodeRef} {...rest}>
      {state => (
        <MessageBarTransitionInner
          animate={animate}
          enterClassName={enterClassName}
          exitClassName={exitClassName}
          nodeRef={nodeRef}
          state={state}
        >
          {children}
        </MessageBarTransitionInner>
      )}
    </Transition>
  );
};

// TODO: delete this unused code to save bytes
const MessageBarTransitionInner: React.FC<{
  children: React.ReactElement;
  enterClassName: string;
  exitClassName: string;
  animate: MessageBarGroupProps['animate'];
  nodeRef: React.Ref<HTMLDivElement | null>;
  state: TransitionStatus;
}> = ({ children, state, enterClassName, exitClassName, animate, nodeRef }) => {
  const className = getClassName(state, enterClassName, exitClassName, animate);
  const context = React.useMemo(
    () => ({
      className,
      nodeRef,
    }),
    [className, nodeRef],
  );

  return <MessageBarTransitionContextProvider value={context}>{children}</MessageBarTransitionContextProvider>;
};
