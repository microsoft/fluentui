import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useDomAnnounce_unstable } from './useDomAnnounce';
import { useAriaNotifyAnnounce_unstable } from './useAriaNotifyAnnounce';

import type { AriaLiveAnnouncerState, AriaLiveAnnouncerProps } from './AriaLiveAnnouncer.types';

export const useAriaLiveAnnouncer_unstable = (props: AriaLiveAnnouncerProps): AriaLiveAnnouncerState => {
  const { targetDocument } = useFluent();
  const domAnnounce = useDomAnnounce_unstable();
  const ariaNotifyAnnounce = useAriaNotifyAnnounce_unstable();

  const announce = React.useMemo(() => {
    const supportsAriaNotify = typeof (targetDocument as any)?.ariaNotify === 'function';
    return supportsAriaNotify ? ariaNotifyAnnounce : domAnnounce;
  }, [targetDocument]);

  return {
    announce,
    children: props.children,
  };
};
