'use client';

import { canUseDOM } from '@fluentui/react-utilities';

import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type { CreatePositioningManagerOptions, OnPositioningEndEvent, PositionManager } from './types';

const noopPositionManager: PositionManager = {
  updatePosition: () => undefined,
  dispose: () => undefined,
};

/**
 * @internal
 */
function createPositioningManager(options: CreatePositioningManagerOptions): PositionManager {
  const {
    arrow = null,
    container,
    dir,
    enabled = true,
    onPositioningEnd,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
    positioningRef: _positioningRef,
    target,
    targetDocument,
    ...positioningOptions
  } = options;

  if (!enabled || !canUseDOM() || !container || !target) {
    return noopPositionManager;
  }

  const resolvedTargetDocument = targetDocument ?? container.ownerDocument;
  const resolvedDir = dir ?? (resolvedTargetDocument?.dir === 'rtl' ? 'rtl' : 'ltr');
  const onPositioningEndListener = onPositioningEnd
    ? (event: Event) => onPositioningEnd(event as OnPositioningEndEvent)
    : undefined;

  if (onPositioningEndListener) {
    container.addEventListener(POSITIONING_END_EVENT, onPositioningEndListener);
  }

  const manager = createPositionManager({
    container,
    target,
    arrow,
    ...resolvePositioningOptions({
      container,
      arrow,
      dir: resolvedDir,
      targetDocument: resolvedTargetDocument,
      positionFixed,
      ...positioningOptions,
    }),
  });

  return {
    updatePosition: manager.updatePosition,
    dispose: () => {
      if (onPositioningEndListener) {
        container.removeEventListener(POSITIONING_END_EVENT, onPositioningEndListener);
      }

      manager.dispose();
    },
  };
}

export { createPositioningManager as createPositioningManager_unstable };
