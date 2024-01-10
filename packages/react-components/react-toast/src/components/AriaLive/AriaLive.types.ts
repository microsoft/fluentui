import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AriaLiveSlots = {
  assertive: NonNullable<Slot<'div'>>;
  polite: NonNullable<Slot<'div'>>;
};

export type AriaLivePoliteness = 'polite' | 'assertive';

/**
 * AriaLive Props
 */
export type AriaLiveProps = ComponentProps<Partial<AriaLiveSlots>> & {
  announceRef: React.Ref<Announce>;
};

/**
 * State used in rendering AriaLive
 */
export type AriaLiveState = ComponentState<AriaLiveSlots>;

export type Announce = (message: string, options: AnnounceOptions) => void;

export type LiveMessage = {
  message: string;
  createdAt: number;
  politeness: AriaLivePoliteness;
};

export type AnnounceOptions = {
  politeness: AriaLivePoliteness;
};
