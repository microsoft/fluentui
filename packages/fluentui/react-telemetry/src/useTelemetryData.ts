import * as _ from 'lodash';
import * as React from 'react';
import { ComponentPerfStats, Telemetry } from '@fluentui/react-bindings';

export type TelemetryDataItem = ComponentPerfStats & {
  componentName: string;
  msAvg: number;
  msStylesTotal: number;
};

export type TelemetryDataTotals = Omit<TelemetryDataItem, 'componentName'>;

export function useTelemetryData(
  telemetry: Telemetry,
  tick: number,
): { data: TelemetryDataItem[]; totals: TelemetryDataTotals } {
  const data = React.useMemo(
    () =>
      _.map(
        telemetry.performance,
        (values: ComponentPerfStats, componentName: string): TelemetryDataItem => ({
          componentName,
          ...values,
          msAvg: values.msTotal / values.renders,
          msStylesTotal: values.msResolveVariablesTotal + values.msResolveStylesTotal + values.msRenderStylesTotal,
        }),
      ),
    // `tick` is required as a dependency to trigger table's upgrade
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick, telemetry.performance],
  );

  const totals = data.reduce<TelemetryDataTotals>(
    (acc, item) => ({
      instances: acc.instances + item.instances,
      renders: acc.renders + item.renders,

      msTotal: acc.msTotal + item.msTotal,
      msMin: acc.msMin + item.msMin,
      msMax: acc.msTotal + item.msMax,
      msAvg: (acc.msTotal + item.msTotal) / (acc.renders + item.renders),
      msStylesTotal: acc.msStylesTotal + item.msStylesTotal,

      msResolveVariablesTotal: acc.msResolveVariablesTotal + item.msResolveVariablesTotal,
      msResolveStylesTotal: acc.msResolveStylesTotal + item.msResolveStylesTotal,
      msRenderStylesTotal: acc.msRenderStylesTotal + item.msRenderStylesTotal,

      stylesRootCacheHits: acc.stylesRootCacheHits + item.stylesRootCacheHits,
      stylesSlotsCacheHits: acc.stylesSlotsCacheHits + item.stylesSlotsCacheHits,
    }),
    {
      instances: 0,
      renders: 0,

      msTotal: 0,
      msMin: 0,
      msMax: 0,
      msAvg: 0,
      msStylesTotal: 0,

      msResolveVariablesTotal: 0,
      msResolveStylesTotal: 0,
      msRenderStylesTotal: 0,

      stylesRootCacheHits: 0,
      stylesSlotsCacheHits: 0,
    },
  );

  return { data, totals };
}
