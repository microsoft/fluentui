export type ComponentPerfStats = {
  instances: number;
  renders: number;

  msTotal: number;
  msMin: number;
  msMax: number;

  msResolveVariablesTotal: number;
  msResolveStylesTotal: number;
  msRenderStylesTotal: number;

  stylesRootCacheHits: number;
  stylesSlotsCacheHits: number;
};

export type UseTelemetryResult = {
  setStart: () => void;
  setEnd: () => void;
};

export class Telemetry {
  performance: Record<string, ComponentPerfStats>;
  enabled: boolean;

  constructor() {
    this.performance = {};
    this.enabled = true;
  }

  reset() {
    this.performance = {};
  }
}
