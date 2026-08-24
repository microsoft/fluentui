'use client';

import type { Context, ContextSelector } from '@fluentui/react-context-selector';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { DashboardGridInteractionCoordinator } from '../interaction/types';
import type { DashboardGridRegistry } from '../provider/DashboardGridRegistry.types';
import type { DashboardGridFocusableItem, useDashboardGridFocusManager } from '../accessibility/focusManager';

export type DashboardGridProviderContextValue = {
  registry: DashboardGridRegistry;
  coordinator?: DashboardGridInteractionCoordinator;
  targetDocument?: Document | null;
  focusManager?: ReturnType<typeof useDashboardGridFocusManager>;
  registerFocusableItem?(item: DashboardGridFocusableItem): () => void;
};

const DashboardGridProviderContext: Context<DashboardGridProviderContextValue | undefined> = createContext<
  DashboardGridProviderContextValue | undefined
>(undefined);

export const { Provider: DashboardGridProviderContextProvider } = DashboardGridProviderContext;

export const useDashboardGridProviderContext_unstable = <T>(
  selector: ContextSelector<DashboardGridProviderContextValue, T>,
): T | undefined => useContextSelector(DashboardGridProviderContext, value => (value ? selector(value) : undefined));

export const useRequiredDashboardGridProviderContext_unstable = <T>(
  selector: ContextSelector<DashboardGridProviderContextValue, T>,
): T => {
  const context = useContextSelector(DashboardGridProviderContext, value => value);
  if (!context) {
    throw new Error(
      '@fluentui/react-dashboard-grid-preview: This hook must be used inside a DashboardGridProvider or DashboardGrid.',
    );
  }
  return selector(context);
};
