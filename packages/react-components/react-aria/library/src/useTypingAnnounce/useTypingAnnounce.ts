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

interface TypingAnnounceReturn<TInputElement extends HTMLElement = HTMLElement> {
  typingAnnounce: AriaLiveAnnounceFn;
  inputRef: React.RefObject<TInputElement>;
}

export function useTypingAnnounce<
  TInputElement extends HTMLElement = HTMLElement,
>(): TypingAnnounceReturn<TInputElement> {
  const { targetDocument } = useFluent();
  const { announce } = useAnnounce();

  const inputRef = React.useRef<TInputElement>(null);
  const observer = React.useRef<MutationObserver>();
  const [setTypingTimeout, clearTypingTimeout] = useTimeout();
  const messageQueue = React.useRef<Message[]>([]);

  const callback: MutationCallback = React.useCallback(
    (mutationList, mutationObserver) => {
      setTypingTimeout(() => {
        messageQueue.current.forEach(({ message, options }) => {
          announce(message, options);
        });
        messageQueue.current.length = 0;
        mutationObserver.disconnect();
      }, 500);
    },
    [announce, setTypingTimeout],
  );

  const typingAnnounce: AriaLiveAnnounceFn = React.useCallback(
    (message: string, options: AnnounceOptions = {}) => {
      messageQueue.current.push({ message, options });

      if (inputRef.current && observer.current) {
        observer.current.observe(inputRef.current, valueMutationOptions);
      }

      setTypingTimeout(() => {
        observer.current && callback([], observer.current);
      }, 500);
    },
    [callback, inputRef, setTypingTimeout],
  );

  React.useEffect(() => {
    const win = targetDocument?.defaultView;
    if (!win) {
      return;
    }

    if (!observer.current) {
      observer.current = new win.MutationObserver(callback);
    }

    return () => {
      // Clean up the observer when the component unmounts
      if (observer.current) {
        observer.current.disconnect();
        clearTypingTimeout();
      }
    };
  }, [callback, clearTypingTimeout, targetDocument]);

  return { typingAnnounce, inputRef };
}
