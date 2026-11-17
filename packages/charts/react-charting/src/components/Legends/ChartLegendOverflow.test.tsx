import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import {
  AreaChart,
  DonutChart,
  FunnelChart,
  GanttChart,
  GaugeChart,
  GroupedVerticalBarChart,
  HeatMapChart,
  HorizontalBarChartWithAxis,
  LineChart,
  MultiStackedBarChart,
  PolarChart,
  ScatterChart,
  StackedBarChart,
  VerticalBarChart,
  VerticalStackedBarChart,
} from '../../index';
import { ILegendsProps, LegendOverflowText } from '../../index';

type OverflowProps = {
  legendsOverflowText?: LegendOverflowText;
  legendProps?: Partial<ILegendsProps>;
};

const series = Array.from({ length: 8 }, (_, index) => ({
  legend: `Series ${index + 1}`,
  color: DefaultPalette.blue,
  data: [
    { x: 1, y: index + 1 },
    { x: 2, y: index + 2 },
  ],
}));
const chartData = {
  lineChartData: series,
  scatterChartData: series,
  chartData: series.map((item, index) => ({ legend: item.legend, color: item.color, data: index + 1 })),
};
const bars = series.map((item, index) => ({
  x: index + 1,
  y: index + 2,
  legend: item.legend,
  color: item.color,
}));
const stackedBars = [{ xAxisPoint: 'Category', chartData: chartData.chartData }];
const groupedBars = [
  {
    name: 'Category',
    series: chartData.chartData.map((item, index) => ({ ...item, key: String(index) })),
  },
];
const heatMapData = series.map((item, index) => ({
  value: index + 1,
  legend: item.legend,
  data: [{ x: 'Category', y: item.legend, value: index + 1 }],
}));
const overflowItems = series.slice(0, 2).map((item, index) => ({
  key: String(index),
  title: item.legend,
  color: item.color,
}));
const wrappedOverflow = { enabledWrapLines: true, overflowProps: { overflowItems } };

const charts: {
  name: string;
  chartLevel: boolean;
  render: (props: OverflowProps) => React.ReactElement;
}[] = [
  { name: 'AreaChart', chartLevel: true, render: props => <AreaChart data={chartData} {...props} /> },
  { name: 'DonutChart', chartLevel: true, render: props => <DonutChart data={chartData} {...props} /> },
  {
    name: 'FunnelChart',
    chartLevel: false,
    render: props => (
      <FunnelChart
        data={series.map((item, index) => ({ stage: item.legend, value: 8 - index, color: item.color }))}
        {...props}
      />
    ),
  },
  {
    name: 'GanttChart',
    chartLevel: true,
    render: props => (
      <GanttChart
        data={series.map((item, index) => ({
          x: { start: index + 1, end: index + 2 },
          y: item.legend,
          legend: item.legend,
          color: item.color,
        }))}
        {...props}
      />
    ),
  },
  {
    name: 'GaugeChart',
    chartLevel: false,
    render: props => (
      <GaugeChart
        chartValue={40}
        segments={series.map(item => ({ size: 10, legend: item.legend, color: item.color }))}
        {...props}
      />
    ),
  },
  {
    name: 'GroupedVerticalBarChart',
    chartLevel: true,
    render: props => <GroupedVerticalBarChart data={groupedBars} {...props} />,
  },
  {
    name: 'HeatMapChart',
    chartLevel: true,
    render: props => (
      <HeatMapChart
        data={heatMapData}
        domainValuesForColorScale={[1, 8]}
        rangeValuesForColorScale={[DefaultPalette.blueLight, DefaultPalette.blue]}
        {...props}
      />
    ),
  },
  {
    name: 'HorizontalBarChartWithAxis',
    chartLevel: true,
    render: props => <HorizontalBarChartWithAxis data={bars} {...props} />,
  },
  { name: 'LineChart', chartLevel: true, render: props => <LineChart data={chartData} {...props} /> },
  {
    name: 'MultiStackedBarChart',
    chartLevel: true,
    render: props => <MultiStackedBarChart data={[chartData]} {...props} />,
  },
  {
    name: 'PolarChart',
    chartLevel: false,
    render: props => (
      <PolarChart
        data={series.map(item => ({
          type: 'linepolar',
          legend: item.legend,
          color: item.color,
          data: [
            { theta: 0, r: 1 },
            { theta: 90, r: 2 },
          ],
        }))}
        {...props}
      />
    ),
  },
  { name: 'ScatterChart', chartLevel: true, render: props => <ScatterChart data={chartData} {...props} /> },
  { name: 'StackedBarChart', chartLevel: true, render: props => <StackedBarChart data={chartData} {...props} /> },
  { name: 'VerticalBarChart', chartLevel: true, render: props => <VerticalBarChart data={bars} {...props} /> },
  {
    name: 'VerticalStackedBarChart',
    chartLevel: true,
    render: props => <VerticalStackedBarChart data={stackedBars} {...props} />,
  },
];

describe('chart legend overflow labels', () => {
  const originalTextLength = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'getComputedTextLength');

  beforeEach(() => {
    Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
      configurable: true,
      value: () => 40,
    });
  });

  afterEach(() => {
    cleanup();
    if (originalTextLength) {
      Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', originalTextLength);
    } else {
      Reflect.deleteProperty(SVGElement.prototype, 'getComputedTextLength');
    }
  });

  describe.each(charts)('$name', chart => {
    it.each(['string', 'formatter'] as const)('supports a %s through legendProps', kind => {
      const formatter = jest.fn((count: number) => `mais ${count} legendas`);
      const overflowText = kind === 'string' ? 'remaining' : formatter;
      const result = render(chart.render({ legendProps: { ...wrappedOverflow, overflowText } }));
      const label = kind === 'string' ? '2 remaining' : 'mais 2 legendas';
      expect(result.getByRole('button', { name: label }).textContent).toBe(label);
      if (kind === 'formatter') {
        expect(formatter).toHaveBeenLastCalledWith(2);
      }
    });

    if (chart.chartLevel) {
      it.each(['string', 'formatter'] as const)('supports a %s through legendsOverflowText', kind => {
        const formatter = jest.fn((count: number) => `mais ${count} legendas`);
        const legendsOverflowText = kind === 'string' ? 'remaining' : formatter;
        const result = render(chart.render({ legendsOverflowText, legendProps: wrappedOverflow }));
        const label = kind === 'string' ? '2 remaining' : 'mais 2 legendas';
        expect(result.getByRole('button', { name: label }).textContent).toBe(label);
        if (kind === 'formatter') {
          expect(formatter).toHaveBeenLastCalledWith(2);
        }
      });

      it.each(['string', 'formatter'] as const)(
        'gives a %s in legendProps precedence over the chart-level label',
        kind => {
          const chartFormatter = jest.fn((count: number) => `chart ${count}`);
          const legendFormatter = jest.fn((count: number) => `override ${count}`);
          const result = render(
            chart.render({
              legendsOverflowText: chartFormatter,
              legendProps: { ...wrappedOverflow, overflowText: kind === 'string' ? 'override' : legendFormatter },
            }),
          );
          const label = kind === 'string' ? '2 override' : 'override 2';
          expect(result.getByRole('button', { name: label }).textContent).toBe(label);
          expect(chartFormatter).not.toHaveBeenCalled();
          if (kind === 'formatter') {
            expect(legendFormatter).toHaveBeenLastCalledWith(2);
          }
        },
      );
    }
  });
});
