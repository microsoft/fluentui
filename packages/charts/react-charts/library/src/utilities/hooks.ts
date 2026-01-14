'use client';

import * as React from 'react';
import { Chart, ImageExportOptions } from '../types/index';
import { LegendContainer } from '../Legends';
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

  React.useImperativeHandle(
    componentRef,
    () => {
      const chartContainer = isChartCartesian ? cartesianChartRef.current?.chartContainer : chartContainerRef.current;

      return {
        chartContainer: chartContainer ?? null,
        toImage: (opts?: ImageExportOptions): Promise<string> => {
          return exportChartsAsImage(
            [{ container: chartContainer }],
            hideLegends ? undefined : legendsRef.current?.toSVG,
            isRTL,
            opts,
          );
        },
      };
    },
    [hideLegends, isChartCartesian, isRTL],
  );

  return {
    cartesianChartRef,
    chartContainerRef,
    legendsRef,
  };
};
