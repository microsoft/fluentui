import * as React from 'react';

import type { AriaLiveAnnouncerProps } from './AriaLiveAnnouncer.types';
import { renderAriaLiveAnnouncer_unstable } from './renderAriaLiveAnnouncer';
import { useAriaLiveAnnouncer_unstable } from './useAriaLiveAnnouncer';
import { useAriaLiveAnnouncerContextValues_unstable } from './useAriaLiveAnnouncerContextValues';

/**
 * A sample implementation of a component that manages aria live announcements.
 */
export const AriaLiveAnnouncer: React.FC<AriaLiveAnnouncerProps> = props => {
  const state = useAriaLiveAnnouncer_unstable(props);
  const contextValues = useAriaLiveAnnouncerContextValues_unstable(state);

  return renderAriaLiveAnnouncer_unstable(state, contextValues);
};

AriaLiveAnnouncer.displayName = 'AriaLiveAnnouncer';
