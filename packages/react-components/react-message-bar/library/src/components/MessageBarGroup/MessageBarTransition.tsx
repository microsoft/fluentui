import * as React from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { MessageBarTransitionContextProvider } from '../../contexts/messageBarTransitionContext';
import { MessageBarGroupProps } from './MessageBarGroup.types';

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
