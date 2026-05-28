'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { useAnnounce } from '@fluentui/react-shared-contexts';
import type { ToastAnnounce } from '@fluentui/react-toast';

export type AriaLiveProps = {
  /**
   * Receives the announce function resolved from `AnnounceContext`. Must be
   * rendered inside an `<AriaLiveAnnouncer>` ancestor.
   */
  announceRef: React.Ref<ToastAnnounce>;
};

export const AriaLive = (props: AriaLiveProps): JSXElement | null => {
  const { announce } = useAnnounce();

  React.useImperativeHandle<ToastAnnounce, ToastAnnounce>(
    props.announceRef,
    () => (message, options) => {
      announce(message, { polite: options?.politeness === 'polite' });
    },
    [announce],
  );

  return null;
};

AriaLive.displayName = 'AriaLive';
