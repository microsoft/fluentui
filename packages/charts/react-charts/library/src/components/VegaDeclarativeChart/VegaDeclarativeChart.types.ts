import type * as React from 'react';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { VegaLiteSpec, VegaLiteSemanticMode } from './VegaLiteTypes';
import type { VegaLiteDiagnostic } from './VegaLiteDiagnostics';
import type { VegaDataResolver } from './VegaLiteResourceLoader';
import type { Legends } from '../Legends/index';

/** Schema for VegaDeclarativeChart component */
export interface VegaSchema {
  /**
   * Vega-Lite specification
   * @see https://vega.github.io/vega-lite/docs/spec.html
   */
  vegaLiteSpec: VegaLiteSpec;
  /** Selected legends for filtering */
  selectedLegends?: string[];
}

/** Props for VegaDeclarativeChart component */
export interface VegaDeclarativeChartProps {
  /** Vega-Lite chart schema */
  chartSchema: VegaSchema;
  /** Callback when schema changes (e.g., legend selection) */
  onSchemaChange?: (newSchema: VegaSchema) => void;
  /** Semantic capability validation. Legacy preserves native fallbacks; strict rejects unsupported declarations. */
  semanticMode?: VegaLiteSemanticMode;
  /** Receives actionable preflight diagnostics after commit, never during render or server rendering. */
  onDiagnostics?: (diagnostics: VegaLiteDiagnostic[]) => void;
  /** Explicit host-owned resource I/O. Without this callback, no external data is requested. */
  dataResolver?: VegaDataResolver;
  /** HTTP/S origins authorized for absolute resources. Hosts must also enforce redirect policy during I/O. */
  allowedDataOrigins?: readonly string[];
  /** HTTP/S base for relative resources; same-origin relative references need no additional allowlist. */
  dataBaseUrl?: string;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export type VegaDeclarativeChartSlots = { root: Slot<'div'> };
export type VegaLegendProps = {
  canSelectMultipleLegends: boolean;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- Native legend callbacks pass selected keys, not a DOM event.
  onChange: (keys: string[]) => void;
  selectedLegends: string[];
};
export type VegaLegendItems = React.ComponentProps<typeof Legends>['legends'];

type ViewPlanBase = {
  readonly path: string;
  readonly hideLegend: boolean;
  readonly legends: readonly VegaLegendItems[number][];
  /** The palette is shared intentionally; the plan's structure and specs are not mutated by rendering. */
  readonly colorMap: React.RefObject<Map<string, string>>;
};

export type VegaUnitViewPlan = ViewPlanBase & {
  readonly type: 'unit';
  readonly spec: VegaLiteSpec;
  /** Retain the exact WeakMap provenance before producing any presentation copies. */
  readonly sourceSpec: VegaLiteSpec;
  readonly nativeSpec: VegaLiteSpec;
  readonly legacySource?: VegaLiteSpec;
  readonly title?: string;
  readonly composed: boolean;
  readonly empty: boolean;
};

/** Immutable presentation data, independent of React state and native renderer instances. */
export type VegaViewPlan =
  | VegaUnitViewPlan
  | (ViewPlanBase & {
      readonly type: 'concat';
      readonly title?: string;
      readonly columns: number;
      readonly children: readonly VegaViewPlan[];
    });

export type VegaDeclarativeChartState = ComponentState<VegaDeclarativeChartSlots> & {
  plan?: VegaViewPlan;
  mode: VegaLiteSemanticMode;
  isDarkTheme: boolean;
  legendProps: VegaLegendProps;
  error?: Error;
  loading: boolean;
};
