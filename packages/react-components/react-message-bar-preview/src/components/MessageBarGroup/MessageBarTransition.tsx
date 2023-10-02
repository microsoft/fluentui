import * as React from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { MessageBarTransitionContextProvider } from '../../contexts/messageBarTransitionContext';
import { MessageBarGroupProps } from './MessageBarGroup.types';
import { useMergedRefs } from '@fluentui/react-utilities';

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
  children: React.ReactElement;
  enterClassName: string;
  exitClassName: string;
  animate: MessageBarGroupProps['animate'];
}> = ({ children, enterClassName, exitClassName, animate, ...rest }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Clone element to set nodeRef on <Transition /> and avoid findDOMNode
  // Here we are already sure the children is one ReactElement
  // https://github.com/reactjs/react-transition-group/blob/2989b5b87b4b4d1001f21c8efa503049ffb4fe8d/src/Transition.js#L404-L412
  const clone = React.cloneElement(children, { ...children.props, ref: useMergedRefs(children.props.ref, ref) });

  return (
    <Transition timeout={250} nodeRef={ref} {...rest}>
      {state => (
        <MessageBarTransitionContextProvider value={getClassName(state, enterClassName, exitClassName, animate)}>
          {clone}
        </MessageBarTransitionContextProvider>
      )}
    </Transition>
  );
};
