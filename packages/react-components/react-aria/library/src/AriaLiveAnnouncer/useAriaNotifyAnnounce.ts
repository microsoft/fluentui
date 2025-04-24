import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { AnnounceOptions } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import type { AriaLiveAnnounceFn } from './AriaLiveAnnouncer.types';

type AriaNotifyOptions = {
  priority?: 'high' | 'normal';
};

type DocumentWithAriaNotify = Document & {
  ariaNotify: (message: string, options: AriaNotifyOptions) => void;
};

/* INTERNAL: implementation of the announcer using the ariaNotify API */
export const useAriaNotifyAnnounce_unstable = (): AriaLiveAnnounceFn => {
  const { targetDocument } = useFluent();

  const announce: AriaLiveAnnounceFn = React.useCallback(
    (message: string, options: AnnounceOptions = {}) => {
      if (!targetDocument) {
        return;
      }

      const { alert = false, polite } = options;

      // default priority to 0 if polite, 2 if alert, and 1 by default
      // used to set both ariaNotify's priority and interrupt
      const defaultPriority = polite ? 0 : alert ? 2 : 1;
      const priority = options.priority ?? defaultPriority;

      // map fluent announce options to ariaNotify options
      const ariaNotifyOptions: AriaNotifyOptions = {
        priority: priority > 1 ? 'high' : 'normal',
      };

      (targetDocument as DocumentWithAriaNotify).ariaNotify(message, ariaNotifyOptions);
    },
    [targetDocument],
  );

  return announce;
};
