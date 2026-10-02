'use client';

import * as React from 'react';
import type { PositioningEngine } from '@fluentui/react-positioning';

const PositioningEngineContext = React.createContext<PositioningEngine | undefined>(undefined);

/**
 * Supplies a default positioning engine to every headless component below it. A component-level
 * `positioning={{ engine }}` still takes precedence.
 *
 * Wrap the engine with `fallbackPositioningEngine` to keep native CSS anchor positioning for surfaces
 * that do not need an engine; a plain engine positions every surface below the provider.
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
export const PositioningEngineProvider: React.Provider<PositioningEngine | undefined> =
  PositioningEngineContext.Provider;

export const usePositioningEngineContext = (): PositioningEngine | undefined =>
  React.useContext(PositioningEngineContext);
