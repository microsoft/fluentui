import type { PositioningEngine } from '@fluentui/react-positioning';

const fallbackEngines = new WeakSet<PositioningEngine>();
const fallbackEnginesByEngine = new WeakMap<PositioningEngine, PositioningEngine>();

/**
 * Marks a positioning engine as a fallback. Surfaces then use native CSS anchor positioning when the
 * browser supports it and their options do not need an engine, and hand over to `engine` otherwise.
 *
 * Calling it again with the same engine returns the same wrapper, so it is safe to call during render.
 *
 * @example
 * ```tsx
 * import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
 * import {
 *   PositioningEngineProvider,
 *   fallbackPositioningEngine,
 * } from '@fluentui/react-headless-components-preview/positioning';
 *
 * <PositioningEngineProvider value={fallbackPositioningEngine(floatingUIPositioningEngine)}>
 *   <App />
 * </PositioningEngineProvider>
 * ```
 */
export function fallbackPositioningEngine(engine: PositioningEngine): PositioningEngine {
  if (fallbackEngines.has(engine)) {
    return engine;
  }

  let fallback = fallbackEnginesByEngine.get(engine);
  if (!fallback) {
    fallback = { create: params => engine.create(params) };
    fallbackEngines.add(fallback);
    fallbackEnginesByEngine.set(engine, fallback);
  }

  return fallback;
}

export const isFallbackPositioningEngine = (engine: PositioningEngine | undefined): boolean =>
  engine !== undefined && fallbackEngines.has(engine);
