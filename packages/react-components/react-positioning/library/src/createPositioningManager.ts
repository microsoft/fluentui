'use client';

import { canUseDOM } from '@fluentui/react-utilities';

import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type {
  CreatePositioningManagerOptions_unstable,
  OnPositioningEndEvent,
  PositioningManager_unstable,
} from './types';

const createNoopPositioningManager = (): PositioningManager_unstable => ({
  updatePosition: () => undefined,
  dispose: () => undefined,
});

export function createPositioningManager_unstable(
  options: CreatePositioningManagerOptions_unstable,
): PositioningManager_unstable {
  const {
    container,
    target,
    arrow = null,
    dir = 'ltr',
    targetDocument = container.ownerDocument,
    onPositioningEnd,
    enabled = true,
    unstable_disableShift,
    unstable_flipFallbackStrategy,
    ...positioningOptions
  } = options;

  if (!enabled || !canUseDOM()) {
    return createNoopPositioningManager();
  }

  const handlePositioningEnd = (event: Event) => {
    onPositioningEnd?.(event as OnPositioningEndEvent);
  };

  if (onPositioningEnd) {
    container.addEventListener(POSITIONING_END_EVENT, handlePositioningEnd);
  }

  const manager = createPositionManager({
    container,
    target,
    arrow,
    ...resolvePositioningOptions({
      ...positioningOptions,
      container,
      arrow,
      isRtl: dir === 'rtl',
      targetDocument,
      unstable_disableShift,
      unstable_flipFallbackStrategy,
    }),
  });

  return {
    updatePosition: () => manager.updatePosition(),
    dispose: () => {
      if (onPositioningEnd) {
        container.removeEventListener(POSITIONING_END_EVENT, handlePositioningEnd);
      }
      manager.dispose();
    },
  };
}
