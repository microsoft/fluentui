'use client';

import * as React from 'react';
import type { PositioningEngine } from '@fluentui/react-positioning';

const PositioningEngineContext = React.createContext<PositioningEngine | undefined>(undefined);

/**
 * Internal: supplies the positioning engine to every headless component below it. Consumers select
 * an engine through `PositioningProvider` from the `positioning-floating-ui` entry.
 */
export const PositioningEngineContextProvider: React.Provider<PositioningEngine | undefined> =
  PositioningEngineContext.Provider;

export const usePositioningEngineContext = (): PositioningEngine | undefined =>
  React.useContext(PositioningEngineContext);
