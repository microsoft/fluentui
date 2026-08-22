import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Enter,
  Escape,
  F2,
  Space,
  Tab,
} from '@fluentui/keyboard-keys';
import { mirrorDashboardGridResizeEdge } from './domGeometry';
import { getDashboardGridDeepActiveElement } from './pointerSession';
import type {
  DashboardGridDirection,
  DashboardGridInteractionCoordinator,
  DashboardGridItemRegistration,
  DashboardGridMoveProposal,
  DashboardGridMoveResult,
  DashboardGridRect,
  DashboardGridRejectedReason,
  DashboardGridResizeEdge,
} from './types';

export type DashboardGridKeyboardInteractionController = {
  onKeyDown(event: KeyboardEvent): boolean;
  isArranging(): boolean;
  cancel(event?: Event): void;
};

const isActivationKey = (key: string): boolean => key === Enter || key === Space || key === 'Spacebar' || key === F2;

const isArrowKey = (key: string): key is typeof ArrowLeft | typeof ArrowRight | typeof ArrowUp | typeof ArrowDown =>
  key === ArrowLeft || key === ArrowRight || key === ArrowUp || key === ArrowDown;

const containsEventTarget = (element: HTMLElement, target: EventTarget | null): boolean =>
  !!target && typeof target === 'object' && 'nodeType' in target && element.contains(target as Node);

const getResizeHandleEdge = (
  target: EventTarget | null,
  resizeHandles: Partial<Record<DashboardGridResizeEdge, HTMLElement | null>> | undefined,
): DashboardGridResizeEdge | undefined => {
  for (const [edge, element] of Object.entries(resizeHandles ?? {}) as Array<
    [DashboardGridResizeEdge, HTMLElement | null | undefined]
  >) {
    if (element && containsEventTarget(element, target)) {
      return edge;
    }
  }

  return undefined;
};

export const getDashboardGridKeyboardResizeProposal = (options: {
  current: DashboardGridRect;
  edge: DashboardGridResizeEdge;
  key: typeof ArrowLeft | typeof ArrowRight | typeof ArrowUp | typeof ArrowDown;
  direction: DashboardGridDirection;
}): DashboardGridMoveProposal | undefined => {
  const { current, direction, edge, key } = options;
  const horizontalDelta =
    key === ArrowLeft
      ? direction === 'rtl'
        ? 1
        : -1
      : key === ArrowRight
        ? direction === 'rtl'
          ? -1
          : 1
        : 0;
  const verticalDelta = key === ArrowUp ? -1 : key === ArrowDown ? 1 : 0;
  const proposal: DashboardGridMoveProposal = {
    input: 'keyboard',
    resizing: true,
    resizeEdge: mirrorDashboardGridResizeEdge(edge, direction),
  };
  let changed = false;

  if (horizontalDelta !== 0 && edge.includes('e')) {
    Object.assign(proposal, { columnSpan: current.columnSpan + horizontalDelta });
    changed = true;
  } else if (horizontalDelta !== 0 && edge.includes('w')) {
    Object.assign(proposal, {
      column: current.column + horizontalDelta,
      columnSpan: current.columnSpan - horizontalDelta,
    });
    changed = true;
  }

  if (verticalDelta !== 0 && edge.includes('s')) {
    Object.assign(proposal, { rowSpan: current.rowSpan + verticalDelta });
    changed = true;
  } else if (verticalDelta !== 0 && edge.includes('n')) {
    Object.assign(proposal, {
      row: current.row + verticalDelta,
      rowSpan: current.rowSpan - verticalDelta,
    });
    changed = true;
  }

  return changed ? proposal : undefined;
};

export const createDashboardGridKeyboardInteraction = (options: {
  targetDocument: Document;
  coordinator: DashboardGridInteractionCoordinator;
  gridId: string;
  itemId: string;
  itemElement: HTMLElement;
  dragHandle?: HTMLElement | null;
  resizeHandles?: Partial<Record<DashboardGridResizeEdge, HTMLElement | null>>;
  direction?: DashboardGridDirection;
  onArrangeChange?: (arranging: boolean) => void;
  onResizeHandleActiveChange?: (edge: DashboardGridResizeEdge | undefined) => void;
  onResult?: (result: DashboardGridMoveResult) => void;
  onRejected?: (reason: DashboardGridRejectedReason) => void;
}): DashboardGridKeyboardInteractionController => {
  const direction = options.direction ?? options.coordinator.getGrid(options.gridId)?.direction ?? 'ltr';
  let activeResizeEdge: DashboardGridResizeEdge | undefined;

  const getRegistration = (): DashboardGridItemRegistration | undefined =>
    options.coordinator.getItem(options.gridId, options.itemId);

  const getResizeHandles = () => options.resizeHandles ?? getRegistration()?.resizeHandles;

  const syncResizeHandleAria = (edge: DashboardGridResizeEdge | undefined) => {
    for (const [candidate, element] of Object.entries(getResizeHandles() ?? {}) as Array<
      [DashboardGridResizeEdge, HTMLElement | null | undefined]
    >) {
      if (!element) {
        continue;
      }
      const active = candidate === edge;
      element.setAttribute('aria-pressed', String(active));
      element.setAttribute(
        'aria-keyshortcuts',
        active
          ? 'ArrowLeft ArrowRight ArrowUp ArrowDown Enter Space Escape'
          : 'Enter Space F2',
      );
    }
  };

  const isArranging = () => {
    const session = options.coordinator.getSession();
    return (
      session?.operation === 'keyboard' &&
      session.sourceGridId === options.gridId &&
      session.itemId === options.itemId
    );
  };

  const handleResult = (result: DashboardGridMoveResult | undefined) => {
    if (!result) {
      return;
    }
    options.onResult?.(result);
    if (result.status === 'rejected') {
      options.onRejected?.(result.reason);
    }
    if (activeResizeEdge) {
      Promise.resolve().then(() => syncResizeHandleAria(activeResizeEdge));
    }
  };

  const setActiveResizeEdge = (edge: DashboardGridResizeEdge | undefined) => {
    syncResizeHandleAria(edge);
    if (activeResizeEdge !== edge) {
      activeResizeEdge = edge;
      options.onResizeHandleActiveChange?.(edge);
    }
  };

  const begin = (event: KeyboardEvent): boolean => {
    const target = event.target;
    const registration = getRegistration();
    const resizeEdge = getResizeHandleEdge(
      target,
      getResizeHandles(),
    );
    const dragHandleTarget = !!options.dragHandle && containsEventTarget(options.dragHandle, target);
    if (target !== options.itemElement && !dragHandleTarget && !resizeEdge) {
      return false;
    }

    if (!registration) {
      return false;
    }
    if (
      resizeEdge &&
      (!registration.resizable ||
        (registration.resizeDirections && !registration.resizeDirections.includes(resizeEdge)))
    ) {
      options.onRejected?.('not-resizable');
      return false;
    }

    const keyboardSession = options.coordinator.beginKeyboard({
      gridId: options.gridId,
      itemId: options.itemId,
      resizeEdge,
      focusReturn: {
        element: getDashboardGridDeepActiveElement(options.targetDocument),
        gridId: options.gridId,
        itemId: options.itemId,
      },
      nativeEvent: event,
    });
    if (!keyboardSession) {
      return false;
    }

    event.preventDefault();
    setActiveResizeEdge(resizeEdge);
    options.onArrangeChange?.(true);
    return true;
  };

  const onKeyDown = (event: KeyboardEvent): boolean => {
    if (!isArranging()) {
      setActiveResizeEdge(undefined);
      return isActivationKey(event.key) ? begin(event) : false;
    }

    if (event.key === Escape) {
      event.preventDefault();
      options.coordinator.cancel(event);
      setActiveResizeEdge(undefined);
      options.onArrangeChange?.(false);
      return true;
    }

    if (event.key === Tab) {
      void options.coordinator.commit(event);
      setActiveResizeEdge(undefined);
      options.onArrangeChange?.(false);
      return false;
    }

    if (event.key === Enter || event.key === Space || event.key === 'Spacebar') {
      event.preventDefault();
      void options.coordinator.commit(event);
      setActiveResizeEdge(undefined);
      options.onArrangeChange?.(false);
      return true;
    }

    if (event.key === 'r' || event.key === 'R') {
      event.preventDefault();
      handleResult(options.coordinator.rotateKeyboard(event));
      return true;
    }

    if (!isArrowKey(event.key)) {
      return false;
    }

    const registration = getRegistration();
    const activeSession = options.coordinator.getSession();
    if (!registration || activeSession?.operation !== 'keyboard') {
      return false;
    }

    event.preventDefault();
    const current = activeSession.lastAcceptedRect;

    if (activeResizeEdge) {
      if (!registration.resizable) {
        options.onRejected?.('not-resizable');
        return true;
      }
      const verticalKey = event.key === ArrowUp || event.key === ArrowDown;
      if (registration.sizeToContent && verticalKey) {
        options.onRejected?.('constraint');
        return true;
      }

      const proposal = getDashboardGridKeyboardResizeProposal({
        current,
        edge: activeResizeEdge,
        key: event.key,
        direction,
      });
      if (proposal) {
        handleResult(options.coordinator.moveKeyboard(proposal, event));
      }
      return true;
    }

    if (event.shiftKey) {
      if (!registration.resizable) {
        options.onRejected?.('not-resizable');
        return true;
      }

      if (event.key === ArrowUp || event.key === ArrowDown) {
        handleResult(
          options.coordinator.moveKeyboard(
            {
              input: 'keyboard',
              resizing: true,
              resizeEdge: 's',
              rowSpan: current.rowSpan + (event.key === ArrowDown ? 1 : -1),
            },
            event,
          ),
        );
        return true;
      }

      const horizontalDelta =
        event.key === ArrowRight ? (direction === 'rtl' ? -1 : 1) : direction === 'rtl' ? 1 : -1;
      handleResult(
        options.coordinator.moveKeyboard(
          {
            input: 'keyboard',
            resizing: true,
            resizeEdge: mirrorDashboardGridResizeEdge('e', direction),
            columnSpan: current.columnSpan + horizontalDelta,
          },
          event,
        ),
      );
      return true;
    }

    if (!registration.movable) {
      options.onRejected?.('not-movable');
      return true;
    }

    const horizontalDelta =
      event.key === ArrowLeft
        ? direction === 'rtl'
          ? 1
          : -1
        : event.key === ArrowRight
          ? direction === 'rtl'
            ? -1
            : 1
          : 0;
    const verticalDelta = event.key === ArrowUp ? -1 : event.key === ArrowDown ? 1 : 0;

    handleResult(
      options.coordinator.moveKeyboard(
        {
          input: 'keyboard',
          column: current.column + horizontalDelta,
          row: current.row + verticalDelta,
        },
        event,
      ),
    );
    return true;
  };

  return {
    onKeyDown,
    isArranging,
    cancel: event => {
      if (!isArranging()) {
        return;
      }

      if (event || !options.itemElement.isConnected) {
        options.coordinator.cancel(event);
        setActiveResizeEdge(undefined);
        options.onArrangeChange?.(false);
        return;
      }

      Promise.resolve().then(() => {
        if (!options.itemElement.isConnected && isArranging()) {
          options.coordinator.cancel();
        }
      });
    },
  };
};
