import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { AnnounceOptions } from '@fluentui/react-shared-contexts';
import { createPriorityQueue, useTimeout } from '@fluentui/react-utilities';
import * as React from 'react';

import type { AriaLiveAnnounceFn, AriaLiveMessage } from './AriaLiveAnnouncer.types';

/** The duration the message needs to be in present in DOM for screen readers to register a change and announce */
const MESSAGE_DURATION = 500;

const VISUALLY_HIDDEN_STYLES = {
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  margin: '-1px',
  width: '1px',
  position: 'absolute',
  overflow: 'hidden',
  textWrap: 'nowrap',
};

/* INTERNAL: implementation of the announcer using a live region element */
export const useDomAnnounce_unstable = (): AriaLiveAnnounceFn => {
  const { targetDocument } = useFluent();

  const timeoutRef = React.useRef<number | undefined>(undefined);
  const [setAnnounceTimeout, clearAnnounceTimeout] = useTimeout();

  const elementRef = React.useRef<HTMLDivElement | null>(null);

  const order = React.useRef(0);

  // investigate alert implementation later
  // const [alertList, setAlertList] = React.useState<string[]>([]);

  const batchMessages = React.useRef<{ batchId: string; message: AriaLiveMessage }[]>([]);

  const [messageQueue] = React.useState(() =>
    createPriorityQueue<AriaLiveMessage>((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }

      return a.createdAt - b.createdAt;
    }),
  );

  const queueMessage = React.useCallback(() => {
    if (timeoutRef.current || !elementRef.current) {
      return;
    }

    const runCycle = () => {
      if (!elementRef.current) {
        return;
      }

      if (targetDocument && messageQueue.peek()) {
        // need a wrapping element for Narrator/Edge, which currently does not pick up text-only live region changes
        // consistently
        // if this is fixed, we can set textContent to the string directly

        const wrappingEl = targetDocument.createElement('span');

        wrappingEl.innerText = messageQueue
          .all()
          .filter(msg => msg.message.trim().length > 0)
          .reduce((prevText, currMsg) => prevText + currMsg.message + '. ', '');

        elementRef.current.innerText = '';
        elementRef.current.appendChild(wrappingEl);

        messageQueue.clear();
        batchMessages.current = [];

        // begin new cycle to clear (or update) messages
        timeoutRef.current = setAnnounceTimeout(() => {
          runCycle();
        }, MESSAGE_DURATION);
      } else {
        elementRef.current.textContent = '';
        clearAnnounceTimeout();

        timeoutRef.current = undefined;
      }
    };

    runCycle();
  }, [clearAnnounceTimeout, messageQueue, setAnnounceTimeout, targetDocument]);

  const announce: AriaLiveAnnounceFn = React.useCallback(
    (message: string, options: AnnounceOptions = {}) => {
      const { alert = false, priority = 0, batchId } = options;

      // check if message is an alert
      if (alert) {
        // TODO: alert implementation
        // setAlertList([...alertList, message]);
      }

      const liveMessage: AriaLiveMessage = {
        message,
        createdAt: order.current++,
        priority,
        batchId,
      };

      // check if batchId exists
      if (batchId) {
        // update associated msg if it does
        const batchMessage = batchMessages.current.find(msg => msg.batchId === batchId);

        if (batchMessage) {
          // replace existing message in queue
          messageQueue.remove(batchMessage.message);

          // update list of existing batchIds w/ most recent message
          batchMessage.message = liveMessage;
        } else {
          // update list of existing batchIds, add new if doesn't already exist
          batchMessages.current = [...batchMessages.current, { batchId, message: liveMessage }];
        }
      }

      // add new message
      messageQueue.enqueue(liveMessage);
      queueMessage();
    },
    [messageQueue, queueMessage],
  );

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    const element = targetDocument.createElement('div');
    element.setAttribute('aria-live', 'assertive');

    Object.assign(element.style, VISUALLY_HIDDEN_STYLES);
    targetDocument.body.append(element);

    elementRef.current = element;

    return () => {
      element.remove();
      elementRef.current = null;
      clearAnnounceTimeout();
      timeoutRef.current = undefined;
    };
  }, [clearAnnounceTimeout, targetDocument]);

  return announce;
};
