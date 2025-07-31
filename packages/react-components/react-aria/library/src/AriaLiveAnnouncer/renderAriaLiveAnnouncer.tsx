import * as React from 'react';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';

import type { AriaLiveAnnouncerContextValues, AriaLiveAnnouncerState } from './AriaLiveAnnouncer.types';

export const renderAriaLiveAnnouncer_unstable = (
  state: AriaLiveAnnouncerState,
  contextValues: AriaLiveAnnouncerContextValues,
): // eslint-disable-next-line @typescript-eslint/no-deprecated
JSX.Element => {
  return <AnnounceProvider value={contextValues.announce}>{state.children}</AnnounceProvider>;
};
