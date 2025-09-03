import * as React from 'react';
import { IGroupedVerticalBarChartV2Props } from './GroupedVerticalBarChartV2.types';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { IGroupedVerticalBarChartData, ILineChartPoints } from '../../types/IDataPoint';

export const GroupedVerticalBarChartV2: React.FunctionComponent<IGroupedVerticalBarChartV2Props> = ({
  data,
  ...props
}) => {
  const { gvbcBarData, gvbcLineData } = React.useMemo(() => {
    const gvbcLineData: ILineChartPoints[] = [];
    const mapXToDataPoints: Record<string, IGroupedVerticalBarChartData> = {};

    data.forEach(series => {
      if (series.type === 'bar') {
        series.x.forEach((x, i) => {
          if (!mapXToDataPoints[x]) {
            mapXToDataPoints[x] = { name: x, series: [] };
          }

          mapXToDataPoints[x].series.push({
            key: '',
            data: series.y[i],
            // xAxisCalloutData: x as string,
            color: '',
            legend: '',
            // useSecondaryYScale: usesSecondaryYScale(series, processedInput.layout),
            // yAxisCalloutData: getFormattedCalloutYData(yVal, yAxisTickFormat),
          });
        });
      } else if (series.type === 'line') {
        gvbcLineData.push({
          // legend,
          // legendShape,
          data: series.x.map((x, i: number) => ({
            x,
            y: series.y[i],
            // ...(Array.isArray(series.marker?.size)
            //   ? { markerSize: markerSizes[i] }
            //   : typeof series.marker?.size === 'number'
            //   ? { markerSize: series.marker.size }
            //   : {}),
            // ...(textValues ? { text: textValues[i] } : {}),
            // yAxisCalloutData: getFormattedCalloutYData(rangeYValues[i] as number, yAxisTickFormat),
          })),
          // color: rgb(seriesColor).copy({ opacity: seriesOpacity }).formatHex8() ?? seriesColor,
          // lineOptions: {
          //   ...(lineOptions ?? {}),
          //   mode: series.type !== 'scatterpolar' ? series.mode : 'scatterpolar',
          //   // originXOffset is not typed on Layout, but may be present in input.layout as a part of projection of
          //   // scatter polar coordingates to cartesian coordinates

          //   ...(series.type === 'scatterpolar'
          //     ? {
          //         originXOffset: (input.layout as { __polarOriginX?: number } | undefined)?.__polarOriginX,
          //         direction: input.layout?.polar?.angularaxis?.direction,
          //         rotation: input.layout?.polar?.angularaxis?.rotation,
          //         axisLabel: (series as { __axisLabel: string[] }).__axisLabel
          //           ? (series as { __axisLabel: string[] }).__axisLabel
          //           : {},
          //       }
          //     : {}),
          // },
          // useSecondaryYScale: usesSecondaryYScale(series, input.layout),
        });
      }
    });

    return {
      gvbcBarData: Object.values(mapXToDataPoints),
      gvbcLineData,
    };
  }, [data]);

  return <GroupedVerticalBarChart {...props} data={gvbcBarData} lineData={gvbcLineData} />;
};
