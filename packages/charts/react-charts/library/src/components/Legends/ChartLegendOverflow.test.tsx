import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { tokens } from '@fluentui/react-theme';
import {
  AreaChart,
  DonutChart,
  FunnelChart,
  GanttChart,
  GaugeChart,
  GroupedVerticalBarChart,
  HeatMapChart,
  HorizontalBarChart,
  HorizontalBarChartWithAxis,
  LineChart,
  PolarChart,
  ScatterChart,
  VerticalBarChart,
  VerticalStackedBarChart,
} from '../../index';
import type { LegendsProps, LegendOverflowText } from '../../index';

type OverflowProps = {
  width?: number;
  height?: number;
  legendsOverflowText?: LegendOverflowText;
  legendProps?: Partial<LegendsProps>;
};

const series = Array.from({ length: 8 }, (_, index) => ({
  legend: `Series ${index + 1}`,
  color: tokens.colorPaletteBlueForeground2,
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
        rangeValuesForColorScale={[tokens.colorPaletteBlueBackground2, tokens.colorPaletteBlueForeground2]}
        {...props}
      />
    ),
  },
  {
    name: 'HorizontalBarChart',
    chartLevel: true,
    render: props => (
      <HorizontalBarChart
        data={[
          {
            chartTitle: 'Category',
            chartData: series.map(item => ({
              legend: item.legend,
              color: item.color,
              horizontalBarChartdata: { x: 1, total: 8 },
            })),
          },
        ]}
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
  { name: 'VerticalBarChart', chartLevel: true, render: props => <VerticalBarChart data={bars} {...props} /> },
  {
    name: 'VerticalStackedBarChart',
    chartLevel: true,
    render: props => <VerticalStackedBarChart data={stackedBars} {...props} />,
  },
];

describe('chart legend overflow labels', () => {
  const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
  const originalResizeObserver = global.ResizeObserver;
  const originalTextLength = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'getComputedTextLength');
  const originalGetComputedStyle = window.getComputedStyle;
  let styleSpy: jest.SpyInstance;
  let boundsSpy: jest.SpyInstance;

  beforeEach(() => {
    styleSpy = jest.spyOn(window, 'getComputedStyle').mockImplementation(element => {
      const style = originalGetComputedStyle(element);
      style.marginTop = '0px';
      style.marginBottom = '0px';
      return style;
    });
    boundsSpy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 650, 350));
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 250 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get(this: HTMLElement) {
        return this.isConnected ? 50 : 0;
      },
    });
    global.ResizeObserver = class implements ResizeObserver {
      public observe = jest.fn();
      public unobserve = jest.fn();
      public disconnect = jest.fn();
    };
    Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
      configurable: true,
      value: () => 40,
    });
  });

  afterEach(() => {
    cleanup();
    styleSpy.mockRestore();
    boundsSpy.mockRestore();
    global.ResizeObserver = originalResizeObserver;
    if (originalTextLength) {
      Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', originalTextLength);
    } else {
      Reflect.deleteProperty(SVGElement.prototype, 'getComputedTextLength');
    }
    for (const [property, descriptor] of [
      ['clientWidth', originalClientWidth],
      ['offsetWidth', originalOffsetWidth],
    ] as const) {
      if (descriptor) {
        Object.defineProperty(HTMLElement.prototype, property, descriptor);
      } else {
        Reflect.deleteProperty(HTMLElement.prototype, property);
      }
    }
  });

  describe.each(charts)('$name', chart => {
    const renderChart = (props: OverflowProps) => render(chart.render({ width: 650, height: 350, ...props }));

    it.each(['string', 'formatter'] as const)('supports a %s through legendProps', kind => {
      const formatter = jest.fn((count: number) => `mais ${count} legendas`);
      const overflowText = kind === 'string' ? 'remaining' : formatter;
      const result = renderChart({ legendProps: { overflowText } });
      const count = result.container.querySelectorAll('button[role="option"][data-overflowing]').length;
      expect(count).toBeGreaterThan(0);
      const label = kind === 'string' ? `+${count} remaining` : `mais ${count} legendas`;
      expect(result.getByRole('button', { name: label }).textContent).toBe(label);
      if (kind === 'formatter') {
        expect(formatter).toHaveBeenLastCalledWith(count);
      }
    });

    if (chart.chartLevel) {
      it.each(['string', 'formatter'] as const)('supports a %s through legendsOverflowText', kind => {
        const formatter = jest.fn((count: number) => `mais ${count} legendas`);
        const legendsOverflowText = kind === 'string' ? 'remaining' : formatter;
        const result = renderChart({ legendsOverflowText });
        const count = result.container.querySelectorAll('button[role="option"][data-overflowing]').length;
        expect(count).toBeGreaterThan(0);
        const label = kind === 'string' ? `+${count} remaining` : `mais ${count} legendas`;
        expect(result.getByRole('button', { name: label }).textContent).toBe(label);
        if (kind === 'formatter') {
          expect(formatter).toHaveBeenLastCalledWith(count);
        }
      });

      it.each(['string', 'formatter'] as const)(
        'gives a %s in legendProps precedence over the chart-level label',
        kind => {
          const chartFormatter = jest.fn((count: number) => `chart ${count}`);
          const legendFormatter = jest.fn((count: number) => `override ${count}`);
          const result = renderChart({
            legendsOverflowText: chartFormatter,
            legendProps: { overflowText: kind === 'string' ? 'override' : legendFormatter },
          });
          const count = result.container.querySelectorAll('button[role="option"][data-overflowing]').length;
          expect(count).toBeGreaterThan(0);
          const label = kind === 'string' ? `+${count} override` : `override ${count}`;
          expect(result.getByRole('button', { name: label }).textContent).toBe(label);
          expect(chartFormatter).not.toHaveBeenCalled();
          if (kind === 'formatter') {
            expect(legendFormatter).toHaveBeenLastCalledWith(count);
          }
        },
      );
    }
  });
});
