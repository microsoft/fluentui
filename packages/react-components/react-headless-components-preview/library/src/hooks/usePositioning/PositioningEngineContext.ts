'use client';

import * as React from 'react';
import type { PositioningEngine } from '@fluentui/react-positioning';

const PositioningEngineContext = React.createContext<PositioningEngine | undefined>(undefined);

/**
 * Supplies a default positioning engine to every headless component below it. A component-level
 * `positioning={{ engine }}` still takes precedence.
 *
 * @example
 * ```tsx
 * import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
 * import { PositioningEngineProvider } from '@fluentui/react-headless-components-preview/positioning';
 *
 * <PositioningEngineProvider value={floatingUIPositioningEngine}>
 *   <App />
 * </PositioningEngineProvider>
 * ```
 */
export const PositioningEngineProvider: React.Provider<PositioningEngine | undefined> =
  PositioningEngineContext.Provider;

export const usePositioningEngineContext = (): PositioningEngine | undefined =>
  React.useContext(PositioningEngineContext);
