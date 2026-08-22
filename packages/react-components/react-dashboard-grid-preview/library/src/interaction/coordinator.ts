import {
  composedContains,
  createDashboardGridDomGeometrySession,
  dashboardGridPixelRectToRawRect,
  isDashboardGridPointWithinElement,
  sortDashboardGridElementsDeepestFirst,
} from './domGeometry';
import type {
  DashboardGridCoordinatorOptions,
  DashboardGridDragSourceRegistration,
  DashboardGridDropAcceptanceContext,
  DashboardGridDropZoneRegistration,
  DashboardGridGridRegistration,
  DashboardGridInteractionCoordinator,
  DashboardGridInteractionIntent,
  DashboardGridInteractionOperation,
  DashboardGridInteractionPreview,
  DashboardGridInteractionSession,
  DashboardGridItemRegistration,
  DashboardGridKeyboardSession,
  DashboardGridMoveProposal,
  DashboardGridMoveResult,
  DashboardGridPoint,
  DashboardGridPreparedTransferResult,
  DashboardGridPointerSession,
  DashboardGridRejectedReason,
  DashboardGridTransferIntent,
} from './types';

type RegistrationEntry<T> = {
  count: number;
  value: T;
};

type PointerClaim = {
  timeStamp: number;
  ownerElement: HTMLElement;
};

const itemKey = (gridId: string, itemId: string): string => `${gridId}\u0000${itemId}`;

const focusElement = (element: HTMLElement | null | undefined): void => {
  if (!element?.isConnected) {
    return;
  }

  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
};

const getExternalDescriptor = (registration: DashboardGridDragSourceRegistration | undefined) => {
  if (!registration) {
    return undefined;
  }

  return typeof registration.descriptor === 'function' ? registration.descriptor() : registration.descriptor;
};

export const createDashboardGridInteractionCoordinator = (
  options: DashboardGridCoordinatorOptions,
): DashboardGridInteractionCoordinator => {
  const grids = new Map<string, RegistrationEntry<DashboardGridGridRegistration>>();
  const items = new Map<string, RegistrationEntry<DashboardGridItemRegistration>>();
  const dragSources = new Map<string, RegistrationEntry<DashboardGridDragSourceRegistration>>();
  const dropZones = new Map<string, RegistrationEntry<DashboardGridDropZoneRegistration>>();
  const geometrySessions = new Map<string, ReturnType<typeof createDashboardGridDomGeometrySession>>();
  const listeners = new Set<() => void>();
  let session: DashboardGridInteractionSession | null = null;
  let pointerClaim: PointerClaim | null = null;
  let activeDropZone: DashboardGridDropZoneRegistration | undefined;
  let visualDropZone: DashboardGridDropZoneRegistration | undefined;
  let nextSessionId = 1;
  let destroyed = false;

  const getGrid = (id: string | undefined) => (id ? grids.get(id)?.value : undefined);
  const getItem = (gridId: string, id: string) => items.get(itemKey(gridId, id))?.value;

  const emit = (intent: DashboardGridInteractionIntent) => {
    const queuedIntent: DashboardGridInteractionIntent = {
      ...intent,
      kind: intent.kind ?? intent.operation,
      input: intent.input ?? (intent.operation === 'keyboard' ? 'keyboard' : 'pointer'),
    };
    const queue =
      options.eventQueue ??
      getGrid(queuedIntent.sourceGridId)?.store.events ??
      getGrid(queuedIntent.targetGridId)?.store.events;
    queue?.enqueue(queuedIntent);
    return queue;
  };

  const notify = () => {
    options.onSessionChange?.(session);
    for (const listener of listeners) {
      listener();
    }
  };

  const setSession = (nextSession: DashboardGridInteractionSession | null) => {
    session = nextSession;
    if (!nextSession) {
      geometrySessions.clear();
    }
    notify();
  };

  const setDropZoneState = (
    registration: DashboardGridDropZoneRegistration | undefined,
    active: boolean,
    valid: boolean,
    reason?: DashboardGridRejectedReason,
  ) => {
    registration?.onStateChange?.({ active, valid, reason });
  };

  const clearDropTarget = () => {
    setDropZoneState(visualDropZone, false, false);
    activeDropZone = undefined;
    visualDropZone = undefined;
  };

  const publishPreview = (preview: DashboardGridInteractionPreview) => {
    const sourceGrid = getGrid(preview.sourceGridId);
    const targetGrid = getGrid(preview.targetGridId);
    sourceGrid?.store.publishPreview?.(preview);
    if (targetGrid && targetGrid !== sourceGrid) {
      targetGrid.store.publishPreview?.(preview);
    }
  };

  const clearPreview = (activeSession: DashboardGridInteractionSession) => {
    getGrid(activeSession.sourceGridId)?.store.clearPreview?.();
    if (activeSession.targetGridId !== activeSession.sourceGridId) {
      getGrid(activeSession.targetGridId)?.store.clearPreview?.();
    }
  };

  const getTemporaryRows = (
    operation: DashboardGridInteractionSession['operation'],
    gridId: string | undefined,
    rect: DashboardGridInteractionSession['lastAcceptedRect'],
  ): number | undefined => {
    if ((operation !== 'drag' && operation !== 'external') || !rect) {
      return undefined;
    }

    const snapshot = getGrid(gridId)?.store.getSnapshot();
    if (!snapshot) {
      return undefined;
    }
    const currentRows = snapshot.items.reduce(
      (rows, item) => Math.max(rows, item.row + item.rowSpan),
      0,
    );
    const itemBottom = rect.row + rect.rowSpan;
    if (itemBottom < currentRows) {
      return undefined;
    }

    return Math.min(snapshot.maxRows ?? itemBottom + 1, itemBottom + 1);
  };

  const register = <T>(
    map: Map<string, RegistrationEntry<T>>,
    key: string,
    value: T,
    onLastUnregister?: () => void,
  ): (() => void) => {
    const existing = map.get(key);
    if (existing) {
      existing.count++;
      existing.value = value;
    } else {
      map.set(key, { count: 1, value });
    }

    let registered = true;
    return () => {
      if (!registered) {
        return;
      }
      registered = false;

      const entry = map.get(key);
      if (!entry) {
        return;
      }

      entry.count--;
      if (entry.count <= 0) {
        map.delete(key);
        onLastUnregister?.();
      }
    };
  };

  const getIntentOperation = (
    activeSession: DashboardGridInteractionSession,
  ): DashboardGridInteractionOperation =>
    activeSession.operation === 'keyboard' && activeSession.resizeEdge
      ? 'resize'
      : activeSession.operation;

  const deferCancellation = (shouldCancel: () => boolean) => {
    Promise.resolve().then(() => {
      if (shouldCancel()) {
        coordinator.cancel();
      }
    });
  };

  const enqueueStart = (activeSession: DashboardGridInteractionSession, nativeEvent?: Event) => {
    emit({
      type: 'start',
      operation: getIntentOperation(activeSession),
      input:
        activeSession.operation === 'keyboard' ||
        ('pointer' in activeSession && activeSession.pointer.pointerType === 'keyboard')
          ? 'keyboard'
          : 'pointer',
      sourceGridId: activeSession.sourceGridId,
      targetGridId: activeSession.targetGridId,
      itemId: activeSession.itemId,
      sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
      previous: activeSession.originRect,
      nativeEvent,
    });
  };

  const applyMoveResult = (
    activeSession: DashboardGridInteractionSession,
    result: DashboardGridMoveResult,
    nativeEvent?: Event,
    eventType: 'update' | 'rotate' = 'update',
  ): DashboardGridMoveResult => {
    switch (result.status) {
      case 'accepted':
      case 'unchanged': {
        activeSession.lastAcceptedRect = result.item;
        if ('rejectionReason' in activeSession) {
          activeSession.rejectionReason = undefined;
        }
        publishPreview({
          operation: activeSession.operation,
          sourceGridId: activeSession.sourceGridId,
          targetGridId: activeSession.targetGridId,
          itemId: activeSession.itemId,
          sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
          originRect: activeSession.originRect,
          originPixelRect:
            'originPixelRect' in activeSession ? activeSession.originPixelRect : undefined,
          rect: result.item,
          pixelRect: 'currentPixelRect' in activeSession ? activeSession.currentPixelRect : undefined,
          temporaryRows: getTemporaryRows(activeSession.operation, activeSession.targetGridId, result.item),
          valid: true,
        });
        emit({
          type: eventType,
          operation: getIntentOperation(activeSession),
          input:
            activeSession.operation === 'keyboard' ||
            ('pointer' in activeSession && activeSession.pointer.pointerType === 'keyboard')
              ? 'keyboard'
              : 'pointer',
          sourceGridId: activeSession.sourceGridId,
          targetGridId: activeSession.targetGridId,
          itemId: activeSession.itemId,
          previous: activeSession.originRect,
          current: result.item,
          nativeEvent,
        });
        break;
      }
      case 'deferred':
        publishPreview({
          operation: activeSession.operation,
          sourceGridId: activeSession.sourceGridId,
          targetGridId: activeSession.targetGridId,
          itemId: activeSession.itemId,
          sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
          originRect: activeSession.originRect,
          originPixelRect:
            'originPixelRect' in activeSession ? activeSession.originPixelRect : undefined,
          rect: activeSession.lastAcceptedRect,
          pixelRect:
            'currentPixelRect' in activeSession ? activeSession.currentPixelRect : undefined,
          temporaryRows: getTemporaryRows(
            activeSession.operation,
            activeSession.targetGridId,
            activeSession.lastAcceptedRect,
          ),
          valid: true,
        });
        break;
      case 'rejected':
        if ('rejectionReason' in activeSession) {
          activeSession.rejectionReason = result.reason;
        }
        publishPreview({
          operation: activeSession.operation,
          sourceGridId: activeSession.sourceGridId,
          targetGridId: activeSession.targetGridId,
          itemId: activeSession.itemId,
          sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
          originRect: activeSession.originRect,
          originPixelRect:
            'originPixelRect' in activeSession ? activeSession.originPixelRect : undefined,
          rect: activeSession.lastAcceptedRect,
          pixelRect: 'currentPixelRect' in activeSession ? activeSession.currentPixelRect : undefined,
          temporaryRows: getTemporaryRows(
            activeSession.operation,
            activeSession.targetGridId,
            activeSession.lastAcceptedRect,
          ),
          valid: false,
          rejectionReason: result.reason,
        });
        emit({
          type: 'rejected',
          operation: getIntentOperation(activeSession),
          input:
            activeSession.operation === 'keyboard' ||
            ('pointer' in activeSession && activeSession.pointer.pointerType === 'keyboard')
              ? 'keyboard'
              : 'pointer',
          sourceGridId: activeSession.sourceGridId,
          targetGridId: activeSession.targetGridId,
          itemId: activeSession.itemId,
          sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
          previous: activeSession.originRect,
          current: activeSession.lastAcceptedRect,
          rejectionReason: result.reason,
          nativeEvent,
        });
        break;
      case 'nest-requested':
        if (
          activeSession.sourceGridId &&
          activeSession.targetGridId &&
          activeSession.itemId &&
          options.provider?.requestNesting
        ) {
          void options.provider.requestNesting({
            sourceGridId: activeSession.sourceGridId,
            targetGridId: activeSession.targetGridId,
            itemId: activeSession.itemId,
            targetItemId: result.targetId,
            coverage: result.coverage,
            nativeEvent,
          });
        }
        break;
    }

    notify();
    return result;
  };

  const getAcceptanceContext = (activeSession: DashboardGridInteractionSession): DashboardGridDropAcceptanceContext => ({
    operation: activeSession.operation,
    sourceGridId: activeSession.sourceGridId,
    targetGridId: activeSession.targetGridId,
    itemId: activeSession.itemId,
    sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
    descriptor:
      'sourceId' in activeSession ? getExternalDescriptor(dragSources.get(activeSession.sourceId ?? '')?.value) : undefined,
  });

  const createGridDropZone = (grid: DashboardGridGridRegistration): DashboardGridDropZoneRegistration => ({
    id: `grid:${grid.id}`,
    element: grid.outerHitElement ?? grid.surfaceElement ?? grid.element,
    gridId: grid.id,
    parentZoneId: grid.parentGridId ? `grid:${grid.parentGridId}` : undefined,
    kind: 'grid',
    label: grid.label,
    accepts: context => grid.acceptsExternal?.(context) ?? true,
  });

  const resolveDropTargets = (point: DashboardGridPoint): DashboardGridDropZoneRegistration[] => {
    const registeredZones = [...dropZones.values()]
      .map(entry => entry.value)
      .filter(zone => isDashboardGridPointWithinElement(point, zone.element));
    const gridZones = [...grids.values()]
      .map(entry => createGridDropZone(entry.value))
      .filter(zone => isDashboardGridPointWithinElement(point, zone.element));

    return sortDashboardGridElementsDeepestFirst([...registeredZones, ...gridZones]);
  };

  const getGeometrySession = (grid: DashboardGridGridRegistration) => {
    let geometry = geometrySessions.get(grid.id);
    if (!geometry) {
      geometry = createDashboardGridDomGeometrySession({
        targetDocument: options.targetDocument,
        rootElement: grid.surfaceElement ?? grid.element,
        direction: grid.direction,
      });
      geometrySessions.set(grid.id, geometry);
    }
    return geometry;
  };

  const getCandidateRect = (
    activeSession: DashboardGridInteractionSession,
    targetGridId: string | undefined,
  ) => {
    if (
      activeSession.operation === 'keyboard' ||
      !targetGridId ||
      targetGridId === activeSession.sourceGridId ||
      !activeSession.currentClientPixelRect
    ) {
      return activeSession.lastAcceptedRect;
    }

    const targetGrid = getGrid(targetGridId);
    if (!targetGrid) {
      return activeSession.lastAcceptedRect;
    }

    const localRect = getGeometrySession(targetGrid).clientRectToLocalRect(activeSession.currentClientPixelRect);
    const rawRect = dashboardGridPixelRectToRawRect(localRect, targetGrid.getMetrics(), {
      x: activeSession.current.clientX - activeSession.start.clientX,
      y: activeSession.current.clientY - activeSession.start.clientY,
    });
    const descriptor =
      'sourceId' in activeSession
        ? getExternalDescriptor(dragSources.get(activeSession.sourceId ?? '')?.value)
        : undefined;

    return {
      ...rawRect,
      columnSpan: activeSession.originRect?.columnSpan ?? descriptor?.columnSpan ?? rawRect.columnSpan,
      rowSpan: activeSession.originRect?.rowSpan ?? descriptor?.rowSpan ?? rawRect.rowSpan,
    };
  };

  const getTransferIntent = (
    activeSession: DashboardGridInteractionSession,
    nativeEvent?: Event,
  ): DashboardGridTransferIntent => ({
    operation: activeSession.operation === 'external' ? 'external' : 'drag',
    sourceGridId: activeSession.sourceGridId,
    targetGridId: activeSession.targetGridId,
    itemId: activeSession.itemId,
    sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
    targetZoneId: activeDropZone?.id,
    descriptor:
      'sourceId' in activeSession ? getExternalDescriptor(dragSources.get(activeSession.sourceId ?? '')?.value) : undefined,
    rect: activeSession.lastAcceptedRect,
    nativeEvent,
  });

  const coordinator: DashboardGridInteractionCoordinator = {
    targetDocument: options.targetDocument,
    registerGrid: registration =>
      register(grids, registration.id, registration, () => {
        deferCancellation(
          () =>
            !grids.has(registration.id) &&
            (session?.sourceGridId === registration.id || session?.targetGridId === registration.id),
        );
      }),
    registerItem: registration =>
      register(items, itemKey(registration.gridId, registration.id), registration, () => {
        const key = itemKey(registration.gridId, registration.id);
        deferCancellation(
          () =>
            !items.has(key) &&
            session?.sourceGridId === registration.gridId &&
            session.itemId === registration.id,
        );
      }),
    registerDragSource: registration =>
      register(dragSources, registration.id, registration, () => {
        deferCancellation(() => {
          const activeSession = session;
          return (
            !dragSources.has(registration.id) &&
            !!activeSession &&
            'sourceId' in activeSession &&
            activeSession.sourceId === registration.id
          );
        });
      }),
    registerDropZone: registration =>
      register(dropZones, registration.id, registration, () => {
        if (activeDropZone?.id === registration.id || visualDropZone?.id === registration.id) {
          clearDropTarget();
        }
      }),
    getGrid: id => getGrid(id),
    getGrids: () => [...grids.values()].map(entry => entry.value),
    getItem,
    getSession: () => session,
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    beginPointer: request => {
      if (
        destroyed ||
        session ||
        request.pointer.button !== 0 ||
        !request.pointer.isPrimary ||
        request.pointer.pointerId < 0
      ) {
        return null;
      }

      if (pointerClaim?.timeStamp === request.timeStamp) {
        if (composedContains(request.ownerElement, pointerClaim.ownerElement)) {
          return null;
        }
        if (!composedContains(pointerClaim.ownerElement, request.ownerElement)) {
          return null;
        }
      }
      const claim = { timeStamp: request.timeStamp, ownerElement: request.ownerElement };
      pointerClaim = claim;
      Promise.resolve().then(() => {
        if (pointerClaim === claim) {
          pointerClaim = null;
        }
      });

      const grid = getGrid(request.sourceGridId);
      const item =
        request.sourceGridId && request.itemId ? getItem(request.sourceGridId, request.itemId) : undefined;
      const source = request.sourceId ? dragSources.get(request.sourceId)?.value : undefined;

      if (request.operation === 'external') {
        if (!source || source.disabled) {
          return null;
        }
      } else if (!grid || !item) {
        return null;
      } else if (request.operation === 'drag' && !item.movable) {
        return null;
      } else if (
        request.operation === 'resize' &&
        (!item.resizable ||
          !request.resizeEdge ||
          (item.resizeDirections && !item.resizeDirections.includes(request.resizeEdge)))
      ) {
        return null;
      }

      const originRect = grid && request.itemId ? grid.store.getItem(request.itemId) : undefined;
      const nextSession: DashboardGridPointerSession = {
        id: nextSessionId++,
        phase: 'armed',
        operation: request.operation,
        pointer: request.pointer,
        startedAt: request.timeStamp,
        start: request.point,
        current: request.point,
        sourceGridId: request.sourceGridId,
        targetGridId: request.sourceGridId,
        itemId: request.itemId,
        sourceId: request.sourceId,
        resizeEdge: request.resizeEdge,
        originRect,
        originPixelRect: request.originPixelRect,
        currentPixelRect: request.originPixelRect,
        currentClientPixelRect: request.operation === 'external' ? request.originPixelRect : undefined,
        lastAcceptedRect: originRect,
        sourceInteractionClosed: false,
        focusReturn: request.focusReturn,
      };
      setSession(nextSession);
      return nextSession;
    },
    activatePointer: request => {
      if (!session || session.operation === 'keyboard' || session.phase !== 'armed') {
        return undefined;
      }

      session.phase = 'active';
      session.currentPixelRect = request.pixelRect;
      if (request.rect) {
        session.lastAcceptedRect = request.rect;
      }

      enqueueStart(session, request.nativeEvent);
      const sourceGrid = getGrid(session.sourceGridId);
      if (sourceGrid && session.itemId && session.operation !== 'external') {
        sourceGrid.store.beginInteraction(session.itemId, {
          kind: session.operation,
          source: 'internal',
          metrics: sourceGrid.getMetrics(),
          originPixelRect: session.originPixelRect,
          allowNesting: true,
          nestingDwell: sourceGrid.nestingDwell,
        });
      }

      publishPreview({
        operation: session.operation,
        sourceGridId: session.sourceGridId,
        targetGridId: session.targetGridId,
        itemId: session.itemId,
        sourceId: session.sourceId,
        originRect: session.originRect,
        originPixelRect: session.originPixelRect,
        rect: session.lastAcceptedRect,
        pixelRect: session.currentPixelRect,
        temporaryRows: getTemporaryRows(session.operation, session.targetGridId, session.lastAcceptedRect),
        valid: true,
      });
      notify();
      return undefined;
    },
    updatePointer: request => {
      if (!session || session.operation === 'keyboard' || session.phase !== 'active') {
        return undefined;
      }

      session.current = request.point;
      session.currentPixelRect = request.pixelRect;
      session.currentClientPixelRect = request.clientPixelRect;
      coordinator.updateDropTarget(request.point, request.nativeEvent);

      if (
        session.operation === 'external' ||
        (session.targetGridId && session.sourceGridId && session.targetGridId !== session.sourceGridId)
      ) {
        publishPreview({
          operation: session.operation,
          sourceGridId: session.sourceGridId,
          targetGridId: session.targetGridId,
          itemId: session.itemId,
          sourceId: session.sourceId,
          originRect: session.originRect,
          originPixelRect: session.originPixelRect,
          rect: session.lastAcceptedRect,
          pixelRect: session.currentPixelRect,
          temporaryRows: getTemporaryRows(session.operation, session.targetGridId, session.lastAcceptedRect),
          valid: !session.rejectionReason,
          rejectionReason: session.rejectionReason,
        });
        notify();
        return undefined;
      }

      const sourceGrid = getGrid(session.sourceGridId);
      if (!sourceGrid || !session.itemId || !request.proposal) {
        return undefined;
      }

      return applyMoveResult(session, sourceGrid.store.move(session.itemId, request.proposal), request.nativeEvent);
    },
    updateDropTarget: (point, nativeEvent) => {
      if (!session || session.operation === 'keyboard') {
        return undefined;
      }

      const context = getAcceptanceContext(session);
      const candidates = resolveDropTargets(point);
      let selected: DashboardGridDropZoneRegistration | undefined;
      let rejected: DashboardGridDropZoneRegistration | undefined;
      let rejectionReason: DashboardGridRejectedReason | undefined;
      const previousVisualZoneId = visualDropZone?.id;

      for (const candidate of candidates) {
        if (
          candidate.kind === 'grid' &&
          candidate.gridId === session.sourceGridId &&
          session.operation !== 'external'
        ) {
          selected = candidate;
          break;
        }

        const accepts =
          !candidate.disabled &&
          (typeof candidate.accepts === 'function'
            ? candidate.accepts({ ...context, targetGridId: candidate.gridId })
            : candidate.accepts !== false);
        if (!accepts) {
          rejected ??= candidate;
          rejectionReason ??= candidate.disabled ? 'disabled' : 'target-rejected';
          continue;
        }

        const candidateRect = getCandidateRect(session, candidate.gridId);
        const preflight =
          candidate.kind === 'grid'
            ? options.provider?.preflightTransfer?.({
                ...getTransferIntent(session, nativeEvent),
                targetGridId: candidate.gridId,
                targetZoneId: candidate.id,
                rect: candidateRect,
              })
            : undefined;
        if (preflight?.status === 'rejected') {
          rejected ??= candidate;
          rejectionReason ??= preflight.reason;
          continue;
        }

        selected = candidate;
        if (
          session.operation === 'external' ||
          (candidate.gridId && candidate.gridId !== session.sourceGridId)
        ) {
          session.lastAcceptedRect = preflight?.status === 'accepted' ? preflight.rect ?? candidateRect : candidateRect;
        }
        break;
      }

      const nextVisualZone = selected ?? rejected;
      if (visualDropZone?.id !== nextVisualZone?.id) {
        setDropZoneState(visualDropZone, false, false);
        visualDropZone = nextVisualZone;
      }

      activeDropZone = selected;
      if (selected) {
        setDropZoneState(selected, true, true);
      } else if (rejected) {
        setDropZoneState(rejected, true, false, rejectionReason);
      }

      const previousTargetGridId = session.targetGridId;
      session.targetGridId = selected?.gridId;
      session.rejectionReason = selected ? undefined : rejectionReason;

      const initialSourceTarget =
        previousVisualZoneId === undefined &&
        previousTargetGridId === session.sourceGridId &&
        selected?.gridId === session.sourceGridId &&
        session.operation !== 'external';
      if (
        !initialSourceTarget &&
        (previousTargetGridId !== session.targetGridId || previousVisualZoneId !== nextVisualZone?.id)
      ) {
        emit({
          type: 'target',
          operation: session.operation,
          input: session.pointer.pointerType === 'keyboard' ? 'keyboard' : 'pointer',
          sourceGridId: session.sourceGridId,
          targetGridId: session.targetGridId,
          itemId: session.itemId,
          sourceId: session.sourceId,
          targetZoneId: selected?.id ?? rejected?.id,
          valid: !!selected,
          rejectionReason,
          nativeEvent,
        });
      }

      notify();
      return selected;
    },
    invalidateGeometry: gridId => {
      if (gridId) {
        geometrySessions.get(gridId)?.invalidate();
      } else {
        for (const geometry of geometrySessions.values()) {
          geometry.invalidate();
        }
      }
    },
    beginKeyboard: request => {
      if (destroyed || session) {
        return null;
      }

      const grid = getGrid(request.gridId);
      const itemRegistration = getItem(request.gridId, request.itemId);
      const item = grid?.store.getItem(request.itemId);
      if (!grid || !itemRegistration || !item) {
        return null;
      }

      const nextSession: DashboardGridKeyboardSession = {
        id: nextSessionId++,
        phase: 'active',
        operation: 'keyboard',
        startedAt: request.nativeEvent?.timeStamp ?? 0,
        sourceGridId: request.gridId,
        targetGridId: request.gridId,
        itemId: request.itemId,
        resizeEdge: request.resizeEdge,
        originRect: item,
        lastAcceptedRect: item,
        focusReturn: request.focusReturn,
      };

      enqueueStart(nextSession, request.nativeEvent);
      grid.store.beginInteraction(request.itemId, { kind: 'keyboard', source: 'internal' });
      grid.store.publishPreview?.({
        operation: 'keyboard',
        sourceGridId: request.gridId,
        targetGridId: request.gridId,
        itemId: request.itemId,
        originRect: item,
        rect: item,
        valid: true,
      });
      setSession(nextSession);
      return nextSession;
    },
    moveKeyboard: (proposal: DashboardGridMoveProposal, nativeEvent?: Event) => {
      if (!session || session.operation !== 'keyboard' || session.phase !== 'active') {
        return undefined;
      }

      const grid = getGrid(session.sourceGridId);
      if (!grid) {
        return undefined;
      }

      return applyMoveResult(session, grid.store.move(session.itemId, proposal), nativeEvent);
    },
    rotateKeyboard: (nativeEvent?: Event) => {
      if (!session || session.operation !== 'keyboard' || session.phase !== 'active') {
        return undefined;
      }

      const grid = getGrid(session.sourceGridId);
      if (!grid) {
        return undefined;
      }

      return applyMoveResult(
        session,
        grid.store.rotate(session.itemId, { input: 'keyboard' }),
        nativeEvent,
        'rotate',
      );
    },
    commit: async nativeEvent => {
      if (!session || session.phase === 'cancelled') {
        return undefined;
      }

      const activeSession = session;
      activeSession.phase = 'committing';
      notify();
      let transferResult: DashboardGridPreparedTransferResult | undefined;
      const isTransfer =
        activeSession.operation === 'external' ||
        activeSession.targetGridId !== activeSession.sourceGridId ||
        (activeDropZone && activeDropZone.kind !== 'grid');

      if (isTransfer) {
        const providerCommand =
          activeDropZone?.kind === 'remove'
            ? options.provider?.remove
            : activeDropZone?.kind === 'custom'
              ? options.provider?.drop ?? options.provider?.transfer
              : options.provider?.transfer;
        if (!activeDropZone || !providerCommand) {
          transferResult = {
            status: 'rejected',
            reason:
              ('rejectionReason' in activeSession ? activeSession.rejectionReason : undefined) ?? 'target-rejected',
          };
        } else {
          if (
            activeSession.operation !== 'external' &&
            activeSession.operation !== 'keyboard' &&
            !activeSession.sourceInteractionClosed
          ) {
            getGrid(activeSession.sourceGridId)?.store.cancelInteraction();
            activeSession.sourceInteractionClosed = true;
          }
          transferResult = await providerCommand(getTransferIntent(activeSession, nativeEvent));
        }
      } else {
        getGrid(activeSession.sourceGridId)?.store.commitInteraction();
      }

      if (transferResult?.status === 'rejected') {
        emit({
          type: 'rejected',
          operation: getIntentOperation(activeSession),
          input:
            activeSession.operation === 'keyboard' ||
            ('pointer' in activeSession && activeSession.pointer.pointerType === 'keyboard')
              ? 'keyboard'
              : 'pointer',
          sourceGridId: activeSession.sourceGridId,
          targetGridId: activeSession.targetGridId,
          itemId: activeSession.itemId,
          sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
          previous: activeSession.originRect,
          current: activeSession.lastAcceptedRect,
          rejectionReason: transferResult.reason,
          nativeEvent,
        });
        coordinator.cancel(nativeEvent);
        return transferResult;
      }

      clearPreview(activeSession);
      clearDropTarget();
      const stopGridId = transferResult?.targetGridId ?? activeSession.targetGridId;
      const stopQueue = emit({
        type: 'stop',
        operation: getIntentOperation(activeSession),
        input:
          activeSession.operation === 'keyboard' ||
          ('pointer' in activeSession && activeSession.pointer.pointerType === 'keyboard')
            ? 'keyboard'
            : 'pointer',
        sourceGridId: activeSession.sourceGridId,
        targetGridId: stopGridId,
        itemId: activeSession.itemId,
        sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
        previous: activeSession.originRect,
        current: transferResult?.rect ?? activeSession.lastAcceptedRect,
        nativeEvent,
      });
      if (stopQueue?.flush) {
        stopQueue.flush(stopGridId ?? activeSession.sourceGridId);
      } else {
        await Promise.resolve();
      }
      try {
        await transferResult?.finalize();
      } finally {
        setSession(null);
      }
      return transferResult;
    },
    cancel: nativeEvent => {
      if (!session) {
        return;
      }

      const activeSession = session;
      const wasArmed = activeSession.phase === 'armed';
      activeSession.phase = 'cancelled';
      if (wasArmed) {
        setSession(null);
        return;
      }
      const shouldCancelStore =
        activeSession.operation === 'keyboard' ||
        ((activeSession.operation === 'drag' || activeSession.operation === 'resize') &&
          !activeSession.sourceInteractionClosed);
      if (!wasArmed && shouldCancelStore) {
        getGrid(activeSession.sourceGridId)?.store.cancelInteraction();
      }
      options.provider?.cancel?.(activeSession);
      clearPreview(activeSession);
      clearDropTarget();
      emit({
        type: 'cancel',
        operation: getIntentOperation(activeSession),
        input:
          activeSession.operation === 'keyboard' ||
          ('pointer' in activeSession && activeSession.pointer.pointerType === 'keyboard')
            ? 'keyboard'
            : 'pointer',
        sourceGridId: activeSession.sourceGridId,
        targetGridId: activeSession.targetGridId,
        itemId: activeSession.itemId,
        sourceId: 'sourceId' in activeSession ? activeSession.sourceId : undefined,
        previous: activeSession.originRect,
        current: activeSession.lastAcceptedRect,
        nativeEvent,
      });
      setSession(null);
      focusElement(activeSession.focusReturn?.element);
    },
    destroy: () => {
      if (destroyed) {
        return;
      }
      coordinator.cancel();
      destroyed = true;
      grids.clear();
      items.clear();
      dragSources.clear();
      dropZones.clear();
      geometrySessions.clear();
      listeners.clear();
      pointerClaim = null;
    },
  };

  return coordinator;
};
