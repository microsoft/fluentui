'use client';

import { defaultPositioningPlugins } from './plugins/plugins';
import type { PositioningOptions, PositioningProps, UsePositioningReturn } from './types';
import { usePositioningCore } from './usePositioningCore';

/**
 * @internal
 */
export function usePositioning(options: PositioningProps & PositioningOptions): UsePositioningReturn {
  return usePositioningCore(options, defaultPositioningPlugins);
}
