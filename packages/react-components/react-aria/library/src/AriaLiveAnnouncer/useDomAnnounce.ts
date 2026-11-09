'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { AnnounceOptions } from '@fluentui/react-shared-contexts';
import { createPriorityQueue, useTimeout } from '@fluentui/react-utilities';
import { useDangerousNeverHidden_unstable as useDangerousNeverHidden } from '@fluentui/react-tabster';
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
  const tabsterNeverHiddenAttributes = useDangerousNeverHidden();

  const elementsRef = React.useRef<{ assertive: HTMLDivElement; polite: HTMLDivElement } | null>(null);

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
    if (timeoutRef.current || !elementsRef.current) {
      return;
    }

    const runCycle = () => {
      const elements = elementsRef.current;
      if (!elements) {
        return;
      }

      if (targetDocument && messageQueue.peek()) {
        // need a wrapping element for Narrator/Edge, which currently does not pick up text-only live region changes
        // consistently
        // if this is fixed, we can set textContent to the string directly
        const messages = messageQueue
          .all()
          .filter(msg => msg.message.trim().length > 0)
          .sort((a, b) => b.priority - a.priority || a.createdAt - b.createdAt);

        for (const polite of [false, true]) {
          const element = polite ? elements.polite : elements.assertive;
          const text = messages
            .filter(msg => msg.polite === polite)
            .reduce((prevText, currMsg) => prevText + currMsg.message + '. ', '');
          element.textContent = '';
          if (text) {
            const wrappingEl = targetDocument.createElement('span');
            wrappingEl.innerText = text;
            element.appendChild(wrappingEl);
          }
        }

        messageQueue.clear();
        batchMessages.current = [];

        // begin new cycle to clear (or update) messages
        timeoutRef.current = setAnnounceTimeout(() => {
          runCycle();
        }, MESSAGE_DURATION);
      } else {
        elements.assertive.textContent = '';
        elements.polite.textContent = '';
        clearAnnounceTimeout();

        timeoutRef.current = undefined;
      }
    };

    // Run the first cycle with a 0 timeout to ensure multiple messages in the same tick are handled
    timeoutRef.current = setAnnounceTimeout(() => {
      runCycle();
    }, 0);
  }, [clearAnnounceTimeout, messageQueue, setAnnounceTimeout, targetDocument]);

  const announce: AriaLiveAnnounceFn = React.useCallback(
    (message: string, options: AnnounceOptions = {}) => {
      const { alert = false, priority = 0, batchId, polite = false } = options;

      // check if message is an alert
      if (alert) {
        // TODO: alert implementation
        // setAlertList([...alertList, message]);
      }

      const liveMessage: AriaLiveMessage = {
        message,
        createdAt: order.current++,
        priority,
        polite,
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

    const elements = {
      assertive: targetDocument.createElement('div'),
      polite: targetDocument.createElement('div'),
    };
    for (const [politeness, element] of Object.entries(elements)) {
      element.setAttribute('aria-live', politeness);
      Object.entries(tabsterNeverHiddenAttributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
      Object.assign(element.style, VISUALLY_HIDDEN_STYLES);
      targetDocument.body.append(element);
    }

    elementsRef.current = elements;
    if (messageQueue.peek()) {
      queueMessage();
    }

    return () => {
      elements.assertive.remove();
      elements.polite.remove();
      elementsRef.current = null;
      clearAnnounceTimeout();
      timeoutRef.current = undefined;
    };
  }, [clearAnnounceTimeout, messageQueue, queueMessage, tabsterNeverHiddenAttributes, targetDocument]);

  return announce;
};
