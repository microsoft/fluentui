import * as React from 'react';
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
import type { PositioningEngine } from '@fluentui/react-positioning';
import type { JSXElement } from '@fluentui/react-utilities';
import { PositioningEngineContextProvider } from './PositioningEngineContext';
import { fallbackPositioningEngine } from './fallbackPositioningEngine';

/**
 * How headless surfaces below a `PositioningProvider` are positioned.
 *
 * - `fallback`: native CSS anchor positioning, handing over to Floating UI when the browser does not
 *   support `position-area` or a surface uses an option CSS cannot express (`autoSize`, boundaries, …).
 * - `floating-ui`: Floating UI for every surface, the same positioner Fluent UI React v9 uses.
 * - `css`: native CSS anchor positioning only, the default without a provider.
 */
export type PositioningMode = 'fallback' | 'floating-ui' | 'css';

export type PositioningProviderProps = {
  mode: PositioningMode;
  children?: React.ReactNode;
};

const ENGINES: Record<PositioningMode, PositioningEngine | undefined> = {
  fallback: fallbackPositioningEngine(floatingUIPositioningEngine),
  'floating-ui': floatingUIPositioningEngine,
  css: undefined,
};

/**
 * Selects how headless surfaces below it are positioned. The nearest provider wins, so a nested
 * provider overrides the mode for its subtree.
 *
 * @example
 * ```tsx
 * import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';
 *
 * <PositioningProvider mode="fallback">
 *   <App />
 * </PositioningProvider>
 * ```
 */
export const PositioningProvider = (props: PositioningProviderProps): JSXElement => (
  <PositioningEngineContextProvider value={ENGINES[props.mode]}>{props.children}</PositioningEngineContextProvider>
);

PositioningProvider.displayName = 'PositioningProvider';
