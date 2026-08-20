import type * as React from 'react';
import type { EventHandler } from '@fluentui/react-utilities';
import type { DashboardGridRegistryError } from '../../provider/DashboardGridRegistry.types';
import type {
  DashboardGridTransferIntent,
} from '../../interaction/types';

export type DashboardGridCustomDropData = DashboardGridTransferIntent & {
  type: 'custom-drop';
  event: Event;
};

export type DashboardGridProviderProps = {
  children: React.ReactNode;
  targetDocument?: Document | null;
  onError?: (error: DashboardGridRegistryError | unknown) => void;
  onCustomDrop?: EventHandler<DashboardGridCustomDropData>;
};
