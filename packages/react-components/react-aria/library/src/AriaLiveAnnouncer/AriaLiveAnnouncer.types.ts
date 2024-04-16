import type { AnnounceContextValue } from '@fluentui/react-shared-contexts';
import * as React from 'react';

export type AriaLiveAnnounceFn = AnnounceContextValue['announce'];

export type AriaLiveMessage = {
  message: string;

  createdAt: number;

  priority: number;
  batchId?: string;
};

export type AriaLiveAnnouncerProps = {
  children?: React.ReactNode;
};

export type AriaLiveAnnouncerState = {
  announce: AriaLiveAnnounceFn;
  children?: React.ReactNode;
};

export type AriaLiveAnnouncerContextValues = {
  announce: { announce: AriaLiveAnnounceFn };
};
