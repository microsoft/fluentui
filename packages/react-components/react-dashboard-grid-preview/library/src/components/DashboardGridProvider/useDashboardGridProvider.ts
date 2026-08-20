'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { createDashboardGridInteractionCoordinator } from '../../interaction/coordinator';
import type { DashboardGridInteractionCoordinator } from '../../interaction/types';
import { createDashboardGridRegistry } from '../../provider/createDashboardGridRegistry';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import type { DashboardGridProviderContextValue } from '../../contexts/DashboardGridProviderContext';
import type { DashboardGridProviderProps } from './DashboardGridProvider.types';
import {
  useDashboardGridFocusManager,
  type DashboardGridFocusableItem,
  type DashboardGridFocusRecord,
} from '../../accessibility/focusManager';
import type {
  DashboardGridTransferIntent,
  DashboardGridTransferResult,
} from '../../interaction/types';

export type DashboardGridProviderState = {
  children: React.ReactNode;
  registry: DashboardGridRegistry;
  coordinator?: DashboardGridInteractionCoordinator;
  contextValue: DashboardGridProviderContextValue;
};

export const useDashboardGridProvider_unstable = (
  props: DashboardGridProviderProps,
): DashboardGridProviderState => {
  const fluent = useFluent();
  const targetDocument =
    props.targetDocument === undefined ? fluent.targetDocument : props.targetDocument;
  const onError = useEventCallback((error: unknown) => props.onError?.(error));
  const onCustomDrop = useEventCallback(
    (intent: DashboardGridTransferIntent): DashboardGridTransferResult => {
      if (!props.onCustomDrop) {
        return { status: 'rejected', reason: 'target-rejected' };
      }

      const event =
        intent.nativeEvent ??
        (targetDocument?.defaultView
          ? new targetDocument.defaultView.Event('custom-drop', {
              cancelable: true,
            })
          : undefined);
      if (!event) {
        return { status: 'rejected', reason: 'target-rejected' };
      }

      props.onCustomDrop(event as never, {
        ...intent,
        type: 'custom-drop',
        event,
      } as never);
      return event.defaultPrevented
        ? { status: 'rejected', reason: 'target-rejected' }
        : { status: 'accepted', rect: intent.rect };
    },
  );
  const focusManagerRef = React.useRef<
    ReturnType<typeof useDashboardGridFocusManager> | undefined
  >(undefined);

  const [registry] = React.useState(() =>
    createDashboardGridRegistry({
      onError,
      onCustomDrop,
      captureFocus: (gridId, itemId) =>
        focusManagerRef.current?.captureFocus(gridId, itemId) ?? {
          element: null,
          gridId,
          itemId,
        },
      requestPendingFocus: (record: DashboardGridFocusRecord) =>
        focusManagerRef.current?.requestPendingFocus(record),
      focusAfterRemoval: (gridId, removedRect) =>
        focusManagerRef.current?.focusAfterRemoval(gridId, removedRect) ?? false,
    }),
  );

  const coordinator = React.useMemo(
    () =>
      targetDocument
        ? createDashboardGridInteractionCoordinator({
            targetDocument,
            provider: registry,
            eventQueue: {
              enqueue(intent) {
                const gridId = intent.targetGridId ?? intent.sourceGridId;
                const grid = gridId ? registry.getGrid(gridId) : undefined;
                grid?.store.events.enqueue(intent);
              },
            },
          })
        : undefined,
    [registry, targetDocument],
  );
  const focusableItems = React.useRef(new Map<string, DashboardGridFocusableItem>());
  const focusManagerState = useDashboardGridFocusManager({
    targetDocument: targetDocument ?? undefined,
    getGridElement: gridId => registry.getGrid(gridId)?.rootElement ?? undefined,
    getItems: () => [...focusableItems.current.values()],
  });
  const focusManager = React.useMemo(
    () => focusManagerState,
    [
      focusManagerState.captureFocus,
      focusManagerState.focusAfterRemoval,
      focusManagerState.focusGeometric,
      focusManagerState.focusItem,
      focusManagerState.navigationAttributes,
      focusManagerState.notifyItemRegistered,
      focusManagerState.requestPendingFocus,
      focusManagerState.restoreFocus,
    ],
  );
  useIsomorphicLayoutEffect(() => {
    focusManagerRef.current = focusManager;
    return () => {
      if (focusManagerRef.current === focusManager) {
        focusManagerRef.current = undefined;
      }
    };
  }, [focusManager]);
  const registerFocusableItem = React.useCallback(
    (item: DashboardGridFocusableItem) => {
      const key = `${item.gridId}\u0000${item.itemId}`;
      focusableItems.current.set(key, item);
      focusManager.notifyItemRegistered(item);
      return () => {
        if (focusableItems.current.get(key) === item) {
          focusableItems.current.delete(key);
        }
      };
    },
    [focusManager],
  );

  React.useEffect(
    () => () => {
      coordinator?.destroy();
    },
    [coordinator],
  );

  React.useEffect(
    () => () => {
      registry.dispose();
    },
    [registry],
  );

  const contextValue = React.useMemo<DashboardGridProviderContextValue>(
    () => ({
      registry,
      coordinator,
      targetDocument,
      focusManager,
      registerFocusableItem,
    }),
    [
      coordinator,
      focusManager,
      registerFocusableItem,
      registry,
      targetDocument,
    ],
  );

  return {
    children: props.children,
    registry,
    coordinator,
    contextValue,
  };
};
