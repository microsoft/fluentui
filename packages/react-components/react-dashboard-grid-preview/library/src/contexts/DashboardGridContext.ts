'use client';

import type { Context, ContextSelector } from '@fluentui/react-context-selector';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { DashboardGridInteractionCoordinator } from '../interaction/types';
import type { DashboardGridDomGeometrySession } from '../interaction/domGeometry';
import type { DashboardGridResizeObserverController } from '../observers/useDashboardGridResizeObserver';
import type { DashboardGridRegistry } from '../provider/DashboardGridRegistry.types';
import type { DashboardGridStore } from '../state/DashboardGridStore.types';
import type { DashboardGridEngineDiagnostic } from '../engine';
import type { DashboardGridAriaStrings } from '../accessibility/aria';
import type { DashboardGridAnnouncementStrings } from '../accessibility/announcements';
import type {
  DashboardGridFocusableItem,
  useDashboardGridFocusManager,
} from '../accessibility/focusManager';

export type DashboardGridContextValue = {
  gridId: string;
  store: DashboardGridStore;
  registry: DashboardGridRegistry;
  coordinator?: DashboardGridInteractionCoordinator;
  targetDocument?: Document | null;
  direction: 'ltr' | 'rtl';
  parentGridId?: string;
  parentItemId?: string;
  resizeObserver: DashboardGridResizeObserverController;
  getDomGeometry(): DashboardGridDomGeometrySession | undefined;
  onArrangeModeChange?(event: Event | undefined, data: Record<string, unknown>): void;
  printMode: 'flow' | 'exact';
  rootRole: 'group' | 'list' | 'grid';
  onDiagnostic?(diagnostic: DashboardGridEngineDiagnostic): void;
  strings?: DashboardGridAriaStrings & DashboardGridAnnouncementStrings;
  focusManager: ReturnType<typeof useDashboardGridFocusManager>;
  registerFocusableItem(item: DashboardGridFocusableItem): () => void;
};

const DashboardGridContext: Context<DashboardGridContextValue | undefined> =
  createContext<DashboardGridContextValue | undefined>(undefined);

export const { Provider: DashboardGridContextProvider } = DashboardGridContext;

export const useDashboardGridContext_unstable = <T>(
  selector: ContextSelector<DashboardGridContextValue, T>,
): T | undefined => useContextSelector(DashboardGridContext, value => (value ? selector(value) : undefined));

export const useRequiredDashboardGridContext_unstable = <T>(
  selector: ContextSelector<DashboardGridContextValue, T>,
): T => {
  const context = useContextSelector(DashboardGridContext, value => value);
  if (!context) {
    throw new Error(
      '@fluentui/react-dashboard-grid-preview: DashboardGridItem must be used inside a DashboardGrid.',
    );
  }
  return selector(context);
};
