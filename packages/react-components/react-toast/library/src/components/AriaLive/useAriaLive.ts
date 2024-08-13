import * as React from 'react';
import { createPriorityQueue, useEventCallback, slot, useTimeout } from '@fluentui/react-utilities';
import type { AnnounceOptions, AriaLiveProps, AriaLiveState, LiveMessage } from './AriaLive.types';

/** The duration the message needs to be in present in DOM for screen readers to register a change and announce */
const MESSAGE_DURATION = 500;

/**
 * Create the state required to render AriaLive.
 *
 * The returned state can be modified with hooks such as useAriaLiveStyles_unstable,
 * before being passed to renderAriaLive_unstable.
 *
 * @param props - props from this instance of AriaLive
 */
export const useAriaLive_unstable = (props: AriaLiveProps): AriaLiveState => {
  const [currentMessage, setCurrentMessage] = React.useState<LiveMessage | undefined>(undefined);
  // Can't rely on Date.now() if user invokes announce more than once in a code block
  const order = React.useRef(0);
  const [messageQueue] = React.useState(() =>
    createPriorityQueue<LiveMessage>((a, b) => {
      if (a.politeness === b.politeness) {
        return a.createdAt - b.createdAt;
      }

      return a.politeness === 'assertive' ? -1 : 1;
    }),
  );

  const announce = useEventCallback((message: string, options: AnnounceOptions) => {
    const { politeness } = options;
    if (message === currentMessage?.message) {
      return;
    }

    const liveMessage: LiveMessage = {
      message,
      politeness,
      createdAt: order.current++,
    };

    if (!currentMessage) {
      setCurrentMessage(liveMessage);
    } else {
      messageQueue.enqueue(liveMessage);
    }
  });

  const [setMessageTimeout, clearMessageTimeout] = useTimeout();

  React.useEffect(() => {
    setMessageTimeout(() => {
      if (messageQueue.peek()) {
        setCurrentMessage(messageQueue.dequeue());
      } else {
        setCurrentMessage(undefined);
      }
    }, MESSAGE_DURATION);

    return () => clearMessageTimeout();
  }, [currentMessage, messageQueue, setMessageTimeout, clearMessageTimeout]);

  React.useImperativeHandle(props.announceRef, () => announce);

  const politeMessage = currentMessage?.politeness === 'polite' ? currentMessage.message : undefined;
  const assertiveMessage = currentMessage?.politeness === 'assertive' ? currentMessage.message : undefined;

  return {
    components: {
      assertive: 'div',
      polite: 'div',
    },

    assertive: slot.always(props.assertive, {
      defaultProps: { 'aria-live': 'assertive', children: assertiveMessage },
      elementType: 'div',
    }),
    polite: slot.always(props.polite, {
      defaultProps: { 'aria-live': 'polite', children: politeMessage },
      elementType: 'div',
    }),
  };
};
