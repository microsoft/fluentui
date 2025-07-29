import * as React from 'react';
import { HorizontalBarChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

import { ChevronDown20Regular } from '@fluentui/react-icons';

export const HorizontalBarStackedAnnotatedInlineLegend = () => {
  const annotationPopover = (names: string[], value?: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {value && <span>{value}%</span>}{' '}
      <button /* styling here */
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          height: '16px', // smaller height
          width: '16px', // smaller width
        }}
      >
        <ChevronDown20Regular />
      </button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          flex: '0 1 auto',
          margin: '4px',
        }}
      >
        {names.map(name => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </div>
  );

  const annotationMeta: string[][][] = [
    [['Person 1', 'Person 2']],
    [
      ['Person 1', 'Person 20'],
      ['Person 30', 'Person 40'],
    ],
  ];

  // Now use `dataTemplate` with the required `chartData` structure
  // Each data point with a horizontalBarChartdata is of type ChartDataPoint.
  // a row of these make an array called ChartDataPoint[] which is a part of ChartProps
  // data?: ChartProps[];
  const dataTemplate = [
    // ChartProps
    {
      chartTitle: 'one',
      //ChartDataPoint[]
      chartDataProps: [
        {
          // ChartDataPoint
          legend: 'One.One',
          horizontalBarChartdata: { x: 100 },
          color: getColorFromToken(DataVizPalette.color1),
        },
      ],
    },
    {
      chartTitle: 'two',
      chartDataProps: [
        {
          legend: 'Two.One',
          horizontalBarChartdata: { x: 66 },
          color: getColorFromToken(DataVizPalette.color10),
        },
        {
          legend: 'Two.Two',
          horizontalBarChartdata: { x: 33 },
          color: getColorFromToken(DataVizPalette.color20),
        },
      ],
    },
  ];

  // Now merge chartData and annotationMeta to create full `legendProps`
  const finalData = dataTemplate.map((group, groupIdx) => {
    const legends = group.chartDataProps?.map((chartDataPoint, itemIdx) => ({
      title: chartDataPoint.legend ?? '',
      color: chartDataPoint.color,
      legendAnnotation: () =>
        annotationPopover(annotationMeta[groupIdx][itemIdx], chartDataPoint.horizontalBarChartdata.x),
    }));

    return {
      ...group,
      legendProps: {
        enabledWrapLines: true,
        legends,
      },
    };
  });

  return (
    <div style={{ maxWidth: 600 }}>
      {finalData.map((bar, index) => (
        <HorizontalBarChart
          key={index}
          data={[bar]}
          className={'hbcstacked'}
          hideTooltip={true}
          chartDataMode="hidden"
          legendProps={bar.legendProps}
          showLegendForSinglePointBar={true}
        />
      ))}
    </div>
  );
};

HorizontalBarStackedAnnotatedInlineLegend.parameters = {
  docs: {
    description: {},
  },
};
