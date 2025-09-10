import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { HorizontalBarChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';
import { CursorClickRegular, CursorClickFilled } from '@fluentui/react-icons';

const AnnotationPopover = (names: string[], value?: number) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded(prev => !prev);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {value && <span>{value}%</span>}{' '}
      <button /* styling here */
        onClick={handleClick}
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
        {isExpanded ? <CursorClickRegular /> : <CursorClickFilled />}
      </button>
      {isExpanded && (
        <div
          style={{
            display: 'flex',
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
      )}
    </div>
  );
};

export const HorizontalBarStackedAnnotatedInlineLegend = (): JSXElement => {
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
      chartData: [
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
      chartData: [
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
    const legends = group.chartData?.map((chartData, itemIdx) => ({
      title: chartData.legend ?? '',
      color: chartData.color,
      legendAnnotation: () => AnnotationPopover(annotationMeta[groupIdx][itemIdx], chartData.horizontalBarChartdata.x),
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
