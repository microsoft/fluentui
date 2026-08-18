import { createPositioningManager_unstable } from '@fluentui/react-positioning';

/**
 * Positioning implementation loaded only when the target document cannot use
 * the complete CSS Anchor Positioning contract required by Headless.
 */
export const fallbackPositioningRuntime = {
  createPositioningManager: createPositioningManager_unstable,
};

export type FallbackPositioningRuntime = typeof fallbackPositioningRuntime;
