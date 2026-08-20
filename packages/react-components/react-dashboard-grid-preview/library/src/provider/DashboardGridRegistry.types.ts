import type * as React from 'react';
import type { DashboardGridColumnLayout } from '../engine';
import type {
  DashboardGridDirection,
  DashboardGridNestingIntent,
  DashboardGridProviderInteractionRegistry,
  DashboardGridRejectedReason,
  DashboardGridTransferIntent,
  DashboardGridTransferResult,
} from '../interaction/types';
import type { DashboardGridItemDefinition, DashboardGridStore } from '../state/DashboardGridStore.types';
import type { DashboardGridItemHostRegistry } from './itemHostRegistry';
import type { DashboardGridSerializerRegistry } from '../serialization/serializerRegistry';
import type { DashboardGridFocusRecord } from '../accessibility/focusManager';

export type DashboardGridRegistryError = {
  code: 'duplicate-grid-id' | 'duplicate-item-id' | 'transfer-failed';
  message: string;
  gridId?: string;
  itemId?: string;
  cause?: unknown;
};

export type DashboardGridRegistration = {
  id: string;
  store: DashboardGridStore;
  targetDocument?: Document | null;
  rootElement?: HTMLElement | null;
  surfaceElement?: HTMLElement | null;
  parentGridId?: string;
  parentItemId?: string;
  direction?: DashboardGridDirection;
  label?: string;
  nestedLayout?: DashboardGridColumnLayout;
};

export type DashboardGridProviderItemRegistration = {
  id: string;
  gridId: string;
  content?: React.ReactNode;
};

export type DashboardGridRegistrySnapshot = {
  revision: number;
  gridIds: readonly string[];
  itemIds: readonly string[];
};

export type DashboardGridRegistryOptions = {
  onError?: (error: DashboardGridRegistryError) => void;
  onCustomDrop?: (
    intent: DashboardGridTransferIntent,
  ) => DashboardGridTransferResult | Promise<DashboardGridTransferResult>;
  captureFocus?: (gridId: string, itemId: string) => DashboardGridFocusRecord;
  requestPendingFocus?: (record: DashboardGridFocusRecord) => void;
  focusAfterRemoval?: (gridId: string, removedRect?: DOMRectReadOnly) => boolean;
};

export type DashboardGridRegistry = DashboardGridProviderInteractionRegistry & {
  itemHosts: DashboardGridItemHostRegistry;
  serializers: DashboardGridSerializerRegistry;

  getSnapshot(): DashboardGridRegistrySnapshot;
  subscribe(listener: () => void): () => void;

  registerGrid(registration: DashboardGridRegistration): () => void;
  updateGrid(id: string, patch: Partial<DashboardGridRegistration>): void;
  getGrid(id: string): DashboardGridRegistration | undefined;
  getGrids(): readonly DashboardGridRegistration[];

  registerItem(registration: DashboardGridProviderItemRegistration): () => void;
  getItemOwner(id: string): string | undefined;
  attachItemHost(id: string, container: HTMLElement): HTMLDivElement | null;
  detachItemHost(id: string, container?: HTMLElement | null): void;
  setParkingElement(element: HTMLElement | null): void;

  transfer(intent: DashboardGridTransferIntent): DashboardGridTransferResult;
  remove(intent: DashboardGridTransferIntent): DashboardGridTransferResult;
  drop(
    intent: DashboardGridTransferIntent,
  ): DashboardGridTransferResult | Promise<DashboardGridTransferResult>;
  requestNesting(intent: DashboardGridNestingIntent): DashboardGridTransferResult;
  dispose(): void;
};

export type DashboardGridTransferDefinitionResult =
  | {
      status: 'accepted';
      definition: DashboardGridItemDefinition;
    }
  | {
      status: 'rejected';
      reason: DashboardGridRejectedReason;
    };
