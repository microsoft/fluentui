import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  EventHandler,
  Slot,
} from '@fluentui/react-utilities';
import type {
  DashboardGridColumnLayout,
  DashboardGridEngineChangeSet,
  DashboardGridEngineDiagnostic,
  DashboardGridEngineError,
  DashboardGridRect,
  DashboardGridResolvedItem,
} from '../../engine';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';
import type { DashboardGridItemDefinition } from '../../state/DashboardGridStore.types';
import type { DashboardGridAriaStrings } from '../../accessibility/aria';
import type { DashboardGridAnnouncementStrings } from '../../accessibility/announcements';
import type {
  DashboardGridInteractionOperation,
  DashboardGridRejectedReason,
} from '../../interaction/types';

export type DashboardGridSlots = {
  root: NonNullable<Slot<'div'>>;
  surface: NonNullable<Slot<'div'>>;
  placeholder?: Slot<'div'>;
  emptyContent?: Slot<'div'>;
};

export type DashboardGridResponsiveBreakpoint = {
  maxWidth: number;
  columns: number;
  layout?: DashboardGridColumnLayout;
};

export type DashboardGridResponsiveOptions = {
  breakpoints: readonly DashboardGridResponsiveBreakpoint[];
  layout?: DashboardGridColumnLayout;
};

export type DashboardGridEventData = {
  type: string;
  event: Event | React.SyntheticEvent<HTMLElement>;
  gridId: string;
  sourceGridId?: string;
  targetGridId?: string;
  itemId?: string;
  items?: readonly DashboardGridResolvedItem[];
  changeSet?: DashboardGridEngineChangeSet;
  columns?: number;
  previousColumns?: number;
  active?: boolean;
  reason?: string;
  rejectionReason?: DashboardGridRejectedReason;
  input?: 'pointer' | 'keyboard' | 'external' | 'api' | 'load' | 'responsive';
  kind?: DashboardGridInteractionOperation | 'layout' | 'columns';
  previous?: DashboardGridRect;
  current?: DashboardGridRect;
  [key: string]: unknown;
};

export type DashboardGridStrings = DashboardGridAriaStrings & DashboardGridAnnouncementStrings;

export type DashboardGridProps = ComponentProps<Partial<DashboardGridSlots>> & {
  gridId?: string;
  items?: readonly DashboardGridItemDefinition[];
  defaultItems?: readonly DashboardGridItemDefinition[];
  columns?: number | 'auto';
  maxRows?: number;
  float?: boolean;
  resizeDisabled?: boolean;
  rowHeight?: number;
  responsive?: DashboardGridResponsiveOptions;
  printMode?: 'flow' | 'exact';
  renderItem?: (item: DashboardGridResolvedItem) => React.ReactNode;
  strings?: DashboardGridStrings;
  imperativeRef?: React.Ref<DashboardGridHandle>;
  onLayoutChange?: EventHandler<DashboardGridEventData>;
  onColumnsChange?: EventHandler<DashboardGridEventData>;
  onArrangeModeChange?: EventHandler<DashboardGridEventData>;
  onItemAdd?: EventHandler<DashboardGridEventData>;
  onItemRemove?: EventHandler<DashboardGridEventData>;
  onDragStart?: EventHandler<DashboardGridEventData>;
  onDragEnd?: EventHandler<DashboardGridEventData>;
  onResizeStart?: EventHandler<DashboardGridEventData>;
  onResizeEnd?: EventHandler<DashboardGridEventData>;
  onTransfer?: EventHandler<DashboardGridEventData>;
  onCancel?: EventHandler<DashboardGridEventData>;
  onResizeContent?: EventHandler<DashboardGridEventData>;
  onDiagnostic?: (diagnostic: DashboardGridEngineDiagnostic) => void;
  onError?: (error: DashboardGridEngineError | unknown) => void;
};

export type DashboardGridState = ComponentState<DashboardGridSlots>;
