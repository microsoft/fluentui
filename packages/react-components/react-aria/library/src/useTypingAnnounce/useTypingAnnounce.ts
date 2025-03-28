import * as React from 'react';
import { useTimeout } from '@fluentui/react-utilities';
import { useAnnounce } from '@fluentui/react-components';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { AnnounceOptions } from '@fluentui/react-shared-contexts';
import { AriaLiveAnnounceFn } from '../AriaLiveAnnouncer/AriaLiveAnnouncer.types';

const valueMutationOptions = {
  attributes: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['value'],
};

export const useTypingAnnounce = (inputEl: React.RefObject<HTMLElement>): { typingAnnounce: AriaLiveAnnounceFn } => {
  const [setTypingTimeout, clearTypingTimeout] = useTimeout();
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  const { announce } = useAnnounce();

  const typingAnnounce: AriaLiveAnnounceFn = React.useCallback((message: string, options: AnnounceOptions = {}) => {
    if (!win || !inputEl?.current) {
      return;
    }

    const callback: MutationCallback = (mutationList, observer) => {
      clearTypingTimeout();
      setTypingTimeout(() => {
        console.log('announcing:', message);
        announce(message, options);
        observer.disconnect();
      }, 500);
    };

    // create mutation observer
    const observer = new win.MutationObserver(callback);
    observer.observe(inputEl.current, valueMutationOptions);

    setTypingTimeout(() => {
      announce(message, options);
    }, 500);
  }, []);

  return { typingAnnounce };
};
