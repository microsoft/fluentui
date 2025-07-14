import * as React from 'react';
import { HorizontalBarChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

export const HorizontalBarChartAnnotated = () => {
  const chartDataEdgeCase = Array.from({ length: 20 }, (_, i) => ({
    legend: `Four.${i + 1}`,
    horizontalBarChartdata: { x: 20 },
    color: getColorFromToken(DataVizPalette.color1),
    annotationInformation: [`Person ${i + 1}`],
  }));

  const chartSecondEdgeCase = Array.from({ length: 19 }, (_, i) => ({
    legend: `Six.${i + 1}`,
    horizontalBarChartdata: { x: 1 },
    color: getColorFromToken(DataVizPalette.color2),
    annotationInformation: [`Person ${i + 1}`],
  }));

  const data = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'One.One',
          horizontalBarChartdata: { x: 1543 },
          color: getColorFromToken(DataVizPalette.color1),
          annotationInformation: ['Person 1', 'Person 2'],
        },
        {
          legend: 'One.Two',
          horizontalBarChartdata: { x: 1 },
          color: getColorFromToken(DataVizPalette.color2),
          annotationInformation: ['Person 3', 'Person 4', 'Person 5'],
        },
        {
          legend: 'One.Three',
          horizontalBarChartdata: { x: 998 },
          color: getColorFromToken(DataVizPalette.color3),
          annotationInformation: ['Person 6'],
        },
        {
          legend: 'One.Four',
          horizontalBarChartdata: { x: 7 },
          color: getColorFromToken(DataVizPalette.color4),
          annotationInformation: ['Person 7', 'Person 8'],
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'Two.One',
          horizontalBarChartdata: { x: 987 },
          color: getColorFromToken(DataVizPalette.color5),
          annotationInformation: ['Person 9', 'Person 10'],
        },
        {
          legend: 'Two.Two',
          horizontalBarChartdata: { x: 7 },
          color: getColorFromToken(DataVizPalette.color6),
          annotationInformation: ['Person 11'],
        },
        {
          legend: 'Two.Three',
          horizontalBarChartdata: { x: 1 },
          color: getColorFromToken(DataVizPalette.color7),
          annotationInformation: ['Person 12', 'Person 13'],
        },
        {
          legend: 'Two.Four',
          horizontalBarChartdata: { x: 1985 },
          color: getColorFromToken(DataVizPalette.color8),
          annotationInformation: ['Person 14'],
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'Three.One',
          horizontalBarChartdata: { x: 18 },
          color: getColorFromToken(DataVizPalette.color9),
          annotationInformation: ['Person 15', 'Person 16'],
        },
        {
          legend: 'Three.Two',
          horizontalBarChartdata: { x: 0 },
          color: getColorFromToken(DataVizPalette.color10),
          annotationInformation: ['Person 17'],
        },
        {
          legend: 'Three.Three',
          horizontalBarChartdata: { x: 971 },
          color: getColorFromToken(DataVizPalette.color11),
          annotationInformation: ['Person 18', 'Person 19'],
        },
        {
          legend: 'Three.Four',
          horizontalBarChartdata: { x: 28 },
          color: getColorFromToken(DataVizPalette.color12),
          annotationInformation: ['Person 20'],
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: chartDataEdgeCase,
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'Five.One',
          horizontalBarChartdata: { x: 60 },
          color: getColorFromToken(DataVizPalette.color20),
          annotationInformation: ['Person 21'],
        },
        {
          legend: 'Five.Two',
          horizontalBarChartdata: { x: 6 },
          color: getColorFromToken(DataVizPalette.color21),
          annotationInformation: ['Person 22'],
        },
        {
          legend: 'Five.Three',
          horizontalBarChartdata: { x: 30 },
          color: getColorFromToken(DataVizPalette.color22),
          annotationInformation: ['Person 23'],
        },
        {
          legend: 'Five.Four',
          horizontalBarChartdata: { x: 4 },
          color: getColorFromToken(DataVizPalette.color12),
          annotationInformation: ['Person 24'],
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'Six.Hundred',
          horizontalBarChartdata: { x: 100 },
          color: getColorFromToken(DataVizPalette.color12),
          annotationInformation: ['Person 20'],
        },
        ...chartSecondEdgeCase,
      ],
    },
  ];

  function useResizeObserver(targetRef: React.RefObject<HTMLElement>) {
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
      if (!targetRef.current) return;

      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setSize({ width, height });
        }
      });

      observer.observe(targetRef.current);

      return () => observer.disconnect();
    }, [targetRef]);

    return size;
  }

  const containerRef = React.useRef(null);
  const dimension = useResizeObserver(containerRef);

  return (
    <div ref={containerRef} style={{ maxWidth: 600 }}>
      <HorizontalBarChart
        data={data}
        chartDataMode="hidden"
        showAnnotationsInPercentage={true}
        barHeight={8}
        hideTooltip={true}
        allowHoverOnSegment={false}
        containerWidth={dimension.width}
      />
    </div>
  );
};

HorizontalBarChartAnnotated.parameters = {
  docs: {
    description: {
      story: 'A horizontal bar chart with annotations for each bar.',
    },
  },
};
