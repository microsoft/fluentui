'use client';

import * as React from 'react';
import { createPriorityQueue, useEventCallback, useTimeout } from '@fluentui/react-utilities';
import type { ToastAnnounce, ToastAnnounceOptions, ToastLiveMessage } from '@fluentui/react-toast';

/** Duration the message stays in DOM so screen readers register the change. */
const MESSAGE_DURATION = 500;

const visuallyHiddenStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0px, 0px, 0px, 0px)',
};

export type AriaLiveProps = {
  announceRef: React.Ref<ToastAnnounce>;
};

/**
 * Renders two visually-hidden `aria-live` regions (one polite, one assertive)
 * and exposes an imperative `announce(message, { politeness })` API via
 * `announceRef`. No Griffel; visually-hidden via inline styles only.
 */
export const AriaLive = ({ announceRef }: AriaLiveProps): React.ReactNode => {
  const [currentMessage, setCurrentMessage] = React.useState<ToastLiveMessage | undefined>(undefined);
  // Date.now() loses ordering when announce fires multiple times in the same tick.
  const order = React.useRef(0);
  const [messageQueue] = React.useState(() =>
    createPriorityQueue<ToastLiveMessage>((a, b) => {
      if (a.politeness === b.politeness) {
        return a.createdAt - b.createdAt;
      }
      return a.politeness === 'assertive' ? -1 : 1;
    }),
  );

  const announce = useEventCallback((message: string, options: ToastAnnounceOptions) => {
    const { politeness } = options;
    if (message === currentMessage?.message) {
      return;
    }
    const liveMessage: ToastLiveMessage = { message, politeness, createdAt: order.current++ };
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

  React.useImperativeHandle(announceRef, () => announce);

  const politeMessage = currentMessage?.politeness === 'polite' ? currentMessage.message : undefined;
  const assertiveMessage = currentMessage?.politeness === 'assertive' ? currentMessage.message : undefined;

  return (
    <>
      <div aria-live="assertive" style={visuallyHiddenStyle}>
        {assertiveMessage}
      </div>
      <div aria-live="polite" style={visuallyHiddenStyle}>
        {politeMessage}
      </div>
    </>
  );
};

AriaLive.displayName = 'AriaLive';
