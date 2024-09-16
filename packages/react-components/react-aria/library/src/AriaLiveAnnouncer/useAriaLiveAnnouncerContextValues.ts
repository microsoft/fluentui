import * as React from 'react';
import type { AriaLiveAnnouncerContextValues, AriaLiveAnnouncerState } from './AriaLiveAnnouncer.types';

export function useAriaLiveAnnouncerContextValues_unstable(
  state: AriaLiveAnnouncerState,
): AriaLiveAnnouncerContextValues {
  const { announce } = state;

  return React.useMemo(() => ({ announce: { announce } }), [announce]);
}
