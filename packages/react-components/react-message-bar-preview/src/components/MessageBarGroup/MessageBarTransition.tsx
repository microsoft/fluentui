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
  }
};

/**
 * Internal component that controls the animation transition for MessageBar components
 * @internal
 */
export const MessageBarTransition: React.FC<{
  children: React.ReactNode;
  enterClassName: string;
  exitClassName: string;
  animate: MessageBarGroupProps['animate'];
}> = ({ children, enterClassName, exitClassName, animate, ...rest }) => {
  return (
    <Transition timeout={250} {...rest}>
      {state => (
        <MessageBarTransitionContextProvider value={getClassName(state, enterClassName, exitClassName, animate)}>
          {children}
        </MessageBarTransitionContextProvider>
      )}
    </Transition>
  );
};
