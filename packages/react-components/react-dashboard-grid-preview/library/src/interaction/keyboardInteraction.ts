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
import type {
  DashboardGridDirection,
  DashboardGridInteractionCoordinator,
  DashboardGridItemRegistration,
  DashboardGridMoveResult,
  DashboardGridRejectedReason,
} from './types';

export type DashboardGridKeyboardInteractionController = {
  onKeyDown(event: KeyboardEvent): boolean;
  isArranging(): boolean;
  cancel(event?: Event): void;
};

const isActivationKey = (key: string): boolean => key === Enter || key === Space || key === 'Spacebar' || key === F2;

const isArrowKey = (key: string): key is typeof ArrowLeft | typeof ArrowRight | typeof ArrowUp | typeof ArrowDown =>
  key === ArrowLeft || key === ArrowRight || key === ArrowUp || key === ArrowDown;

const getDeepActiveElement = (targetDocument: Document): HTMLElement | null => {
  let activeElement = targetDocument.activeElement;
  while (activeElement && 'shadowRoot' in activeElement && activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement && 'focus' in activeElement ? (activeElement as HTMLElement) : null;
};

export const createDashboardGridKeyboardInteraction = (options: {
  targetDocument: Document;
  coordinator: DashboardGridInteractionCoordinator;
  gridId: string;
  itemId: string;
  itemElement: HTMLElement;
  dragHandle?: HTMLElement | null;
  direction?: DashboardGridDirection;
  onArrangeChange?: (arranging: boolean) => void;
  onResult?: (result: DashboardGridMoveResult) => void;
  onRejected?: (reason: DashboardGridRejectedReason) => void;
}): DashboardGridKeyboardInteractionController => {
  const direction = options.direction ?? options.coordinator.getGrid(options.gridId)?.direction ?? 'ltr';

  const getRegistration = (): DashboardGridItemRegistration | undefined =>
    options.coordinator.getItem(options.gridId, options.itemId);

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
  };

  const begin = (event: KeyboardEvent): boolean => {
    const target = event.target;
    if (target !== options.itemElement && target !== options.dragHandle) {
      return false;
    }

    const registration = getRegistration();
    if (!registration || registration.locked) {
      options.onRejected?.('locked');
      return false;
    }

    const keyboardSession = options.coordinator.beginKeyboard({
      gridId: options.gridId,
      itemId: options.itemId,
      focusReturn: {
        element: getDeepActiveElement(options.targetDocument),
        gridId: options.gridId,
        itemId: options.itemId,
      },
      nativeEvent: event,
    });
    if (!keyboardSession) {
      return false;
    }

    event.preventDefault();
    options.onArrangeChange?.(true);
    return true;
  };

  const onKeyDown = (event: KeyboardEvent): boolean => {
    if (!isArranging()) {
      return isActivationKey(event.key) ? begin(event) : false;
    }

    if (event.key === Escape) {
      event.preventDefault();
      options.coordinator.cancel(event);
      options.onArrangeChange?.(false);
      return true;
    }

    if (event.key === Tab) {
      void options.coordinator.commit(event);
      options.onArrangeChange?.(false);
      return false;
    }

    if (event.key === Enter || event.key === Space || event.key === 'Spacebar') {
      event.preventDefault();
      void options.coordinator.commit(event);
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
