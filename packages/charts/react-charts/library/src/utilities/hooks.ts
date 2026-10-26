'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { Chart, ImageExportOptions } from '../types/index';
import type { LegendContainer } from '../Legends';
import { exportChartsAsImage } from './image-export-utils';
import { useRtl } from './utilities';

export const useImageExport = (
  componentRef: React.Ref<Chart> | undefined,
  hideLegends: boolean | undefined,
  isChartCartesian: boolean = true,
): {
  cartesianChartRef: React.RefObject<Chart | null>;
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  legendsRef: React.RefObject<LegendContainer | null>;
} => {
  const cartesianChartRef = React.useRef<Chart>(null);
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const legendsRef = React.useRef<LegendContainer>(null);
  const isRTL = useRtl();

  const toImage = useEventCallback((opts?: ImageExportOptions): Promise<string> => {
    const container = isChartCartesian ? cartesianChartRef.current?.chartContainer : chartContainerRef.current;
    return exportChartsAsImage([{ container }], hideLegends ? undefined : legendsRef.current?.toSVG, isRTL, opts);
  });
  const getChartContainer = useEventCallback(
    () => (isChartCartesian ? cartesianChartRef.current?.chartContainer : chartContainerRef.current) ?? null,
  );
  const handle = React.useMemo<Chart>(
    () => ({
      get chartContainer() {
        return getChartContainer();
      },
      toImage,
    }),
    [getChartContainer, toImage],
  );
  React.useImperativeHandle(componentRef, () => handle, [handle]);

  return {
    cartesianChartRef,
    chartContainerRef,
    legendsRef,
  };
};
