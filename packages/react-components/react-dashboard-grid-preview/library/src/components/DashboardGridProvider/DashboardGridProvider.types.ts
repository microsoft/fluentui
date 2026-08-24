import type * as React from 'react';
import type { EventHandler } from '@fluentui/react-utilities';
import type { DashboardGridRegistryError } from '../../provider/DashboardGridRegistry.types';
import type {
  DashboardGridTransferIntent,
} from '../../interaction/types';

/** Data emitted for a provider-approved custom non-grid drop. */
export type DashboardGridCustomDropData = DashboardGridTransferIntent & {
  /** Fluent event discriminator. */
  type: 'custom-drop';
  /** Native custom-drop event. */
  event: Event;
};

/** Data emitted for provider identity and transfer errors. */
export type DashboardGridProviderErrorData = {
  type: 'error';
  event: Event;
  error: DashboardGridRegistryError | unknown;
};

/** Props for DashboardGridProvider. */
export type DashboardGridProviderProps = {
  /** Provider-owned grid and source content. */
  children: React.ReactNode;
  /** Document used for DOM ownership, observers, and interaction listeners. */
  targetDocument?: Document | null;
  /** Receives provider identity and transfer errors. */
  onError?: EventHandler<DashboardGridProviderErrorData>;
  /** Handles custom non-grid drop zones. Prevent default to reject the drop. */
  onCustomDrop?: EventHandler<DashboardGridCustomDropData>;
};
