import * as React from 'react';
import { useTimeout } from '@fluentui/react-utilities';
import { useAnnounce, useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { AnnounceOptions } from '@fluentui/react-shared-contexts';
import { AriaLiveAnnounceFn } from '../AriaLiveAnnouncer/AriaLiveAnnouncer.types';

type Message = {
  message: string;
  options: AnnounceOptions;
};

const valueMutationOptions = {
  attributes: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['value'],
};

export const useTypingAnnounce = (inputEl: React.RefObject<HTMLElement>): { typingAnnounce: AriaLiveAnnounceFn } => {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  const { announce } = useAnnounce();

  const observer = React.useRef<MutationObserver>();
  const [setTypingTimeout, clearTypingTimeout] = useTimeout();
  const messageQueue = React.useRef<Message[]>([]);

  const callback: MutationCallback = React.useCallback((mutationList, observer) => {
    clearTypingTimeout();
    setTypingTimeout(() => {
      messageQueue.current.forEach(({ message, options }) => {
        announce(message, options);
      });
      messageQueue.current.length = 0;
      observer.disconnect();
    }, 500);
  }, []);

  const typingAnnounce: AriaLiveAnnounceFn = React.useCallback((message: string, options: AnnounceOptions = {}) => {
    if (!win || !inputEl?.current) {
      return;
    }

    messageQueue.current.push({ message, options });

    if (!observer.current) {
      // create mutation observer if it doesn't exist
      observer.current = new win.MutationObserver(callback);
    }

    observer.current.observe(inputEl.current, valueMutationOptions);

    setTypingTimeout(() => {
      observer.current && callback([], observer.current);
    }, 500);
  }, []);

  return { typingAnnounce };
};
