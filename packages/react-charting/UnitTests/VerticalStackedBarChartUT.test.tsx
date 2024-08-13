import { screen, fireEvent } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IVSChartDataPoint } from '../src/index';
import { VerticalStackedBarChart } from '../src/components/VerticalStackedBarChart/VerticalStackedBarChart';
import { testWithWait, testWithoutWait } from '../src/utilities/TestUtility.test';
import { VerticalStackedBarChartBase } from '../src/components/VerticalStackedBarChart/VerticalStackedBarChart.base';
import { resetIds } from '@fluentui/react';
import { XAxisTypes } from '../src/utilities/utilities';
const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const firstChartPoints: IVSChartDataPoint[] = [
  { legend: 'Metadata1', data: 2, color: DefaultPalette.blue },
  { legend: 'Metadata2', data: 0.5, color: DefaultPalette.blueMid },
  { legend: 'Metadata3', data: 0, color: DefaultPalette.blueLight },
];

const secondChartPoints: IVSChartDataPoint[] = [
  { legend: 'Metadata1', data: 30, color: DefaultPalette.blue },
  { legend: 'Metadata2', data: 3, color: DefaultPalette.blueMid },
  { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
];

const simplePointsWithLine = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 33,
    activeLegend: 'Supported Builds',
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    activeLegend: 'Supported Builds',
    chartData: secondChartPoints,
    xAxisPoint: 55,
    lineData: [{ y: 33, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
];

const singleBar: IVSChartDataPoint[] = [{ legend: 'Metadata1', data: 2.8, color: DefaultPalette.blue }];

const chartPointsWithSingleBar = [
  {
    chartData: singleBar,
    xAxisPoint: 0,
  },
];

const chartPointsWithoutColor = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 0,
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 20,
    lineData: [{ y: 33, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
];

const chartPointsWithStringXAxisPoint = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 'January',
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 'February',
    lineData: [{ y: 41, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
];

function sharedBeforeEach() {
  resetIds();
}

runTest('VerticalStackedBarChart unit tests', () => {
  beforeEach(sharedBeforeEach);

  runTest('get Path', () => {
    testWithWait(
      'Should return path when a point is hovered',
      VerticalStackedBarChart,
      { data: simplePointsWithLine },
      container => {
        const svg = container.querySelector('svg');
        expect(svg).not.toBeNull();
        const paths = svg!.querySelectorAll('path');
        expect(paths).toHaveLength(2);
        expect(paths[0]!.getAttribute('d')).toBe(`M49,6V0.5H-28V6`);
        expect(paths[1]!.getAttribute('d')).toBe(`M-6,275.5H0.5V20.5H-6`);
      },
    );
  });

  testWithWait(
    'Should return visibility as visibility if the point is active',
    VerticalStackedBarChart,
    { data: simplePointsWithLine, theme: DarkTheme },
    container => {
      const points = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      expect(points).toHaveLength(2);
      fireEvent.mouseOver(points[0]);
      const pointsAfterMouseOver = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'circle',
      );
      expect(pointsAfterMouseOver[0].getAttribute('visibility')).toEqual('visibility');
    },
  );

  testWithWait(
    'Should return visibility as hidden if the point is inactive',
    VerticalStackedBarChart,
    { data: simplePointsWithLine, theme: DarkTheme },
    container => {
      const points = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      expect(points).toHaveLength(2);
      fireEvent.mouseOver(points[0]);
      const pointsAfterMouseOver = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'circle',
      );
      expect(pointsAfterMouseOver[0].getAttribute('visibility')).toEqual('visibility');
      expect(pointsAfterMouseOver[1].getAttribute('visibility')).toEqual('hidden');
    },
  );

  testWithoutWait(
    'Should return circle Radius if active Point matches the circle',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
    container => {
      const points = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      expect(points).toHaveLength(2);
      fireEvent.focus(points[0]);
      expect(points[0].getAttribute('r')).toEqual('8');
    },
  );

  testWithoutWait(
    'Should return circleRadius if activePoint matches the circle',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
    container => {
      const points = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      expect(points).toHaveLength(2);
      fireEvent.focus(points[0]);
      expect(points[0].getAttribute('r')).toEqual('8');
    },
  );
});
runTest('get area label', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should return the correct aria label for a stacked Bar',
    VerticalStackedBarChart,
    { data: simplePointsWithLine, barWidth: 25 },
    container => {
      const barAreaLabel = screen.queryByText('2.5');
      expect(barAreaLabel).not.toBeNull();
      expect(barAreaLabel!.getAttribute('aria-label')).toEqual('Total: 2.5');
    },
  );

  testWithWait(
    'Should return the correct aria label for a single Bar',
    VerticalStackedBarChart,
    { data: chartPointsWithSingleBar },
    container => {
      const barAreaLabel = screen.queryAllByText('2.8');
      expect(barAreaLabel.length).not.toBeNull();
      expect(barAreaLabel[1]!.getAttribute('aria-label')).toEqual('Total: 2.8');
    },
  );
});

runTest('get area selected', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should return the correct aria selected for legends when mouse click',
    VerticalStackedBarChart,
    { data: chartPointsWithSingleBar },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toBeDefined();
      fireEvent.click(legends![0]);
      const legendsAfterMouseOver = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      legendsAfterMouseOver.forEach(legend => {
        expect(legend.getAttribute('aria-selected')).toEqual('true');
      });
    },
  );

  testWithWait(
    'Should return the correct aria selected for legends',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toBeDefined();
      legends.forEach(legend => {
        expect(legend.getAttribute('aria-selected')).toEqual('false');
      });
    },
  );

  testWithWait(
    'Should return the correct aria selected for legends when mouse over',
    VerticalStackedBarChart,
    { data: chartPointsWithSingleBar },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toBeDefined();
      fireEvent.mouseOver(legends![0]);
      const legendsAfterMouseOver = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      legendsAfterMouseOver.forEach(legend => {
        expect(legend.getAttribute('aria-selected')).toEqual('false');
      });
    },
  );

  testWithWait(
    'Should return the correct aria selected for legends when mouse double click',
    VerticalStackedBarChart,
    { data: chartPointsWithSingleBar },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toBeDefined();
      fireEvent.doubleClick(legends![0]);
      const legendsAfterMouseOver = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      legendsAfterMouseOver.forEach(legend => {
        expect(legend.getAttribute('aria-selected')).toEqual('false');
      });
    },
  );
});

runTest('X- Axis Data', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should return the bars and x axis values for string XAxis data',
    VerticalStackedBarChart,
    { data: chartPointsWithStringXAxisPoint },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(5);
      const firstBarXAxisValue = screen.queryByText('January');
      expect(firstBarXAxisValue).not.toBeNull();
      const secondBarXAxisValue = screen.queryByText('February');
      expect(secondBarXAxisValue).not.toBeNull();
    },
  );

  testWithWait(
    'Should return the bars count properly for numeric XAxis data',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(5);
    },
  );
});

runTest('Get lines data', () => {
  beforeEach(sharedBeforeEach);

  test('Should return line data properly after formatting', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const lineObject = instance._getFormattedLineData(simplePointsWithLine);
    expect(lineObject['Supported Builds']).toHaveLength(2);
    const firstObject = lineObject['Supported Builds'][0];
    expect(firstObject['index']).toEqual(0);
    expect(firstObject['xItem']).toBeDefined();
    const secondObject = lineObject['Supported Builds'][1];
    expect(secondObject['index']).toEqual(1);
    expect(secondObject['xItem']).toBeDefined();
  });

  test('Should return the correct line legends', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._points = simplePointsWithLine;
    instance._lineObject = instance._getFormattedLineData(simplePointsWithLine);
    instance._getMargins({
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    });
    instance._getAxisData({ yAxisDomainValues: [10, 20, 30, 40] });
    instance._dataset = instance._createDataSetLayer();
    const result = instance._getLineLegends(simplePointsWithLine);
    expect(result).toHaveLength(1);
    expect(result[0]['title']).toEqual('Supported Builds');
  });
});

runTest('_toFocusWholeStack', () => {
  beforeEach(sharedBeforeEach);

  test('Should return the correct focus to whole stack value properly', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    const result = instance._toFocusWholeStack(false);
    expect(result).toEqual(false);
    const result1 = instance._toFocusWholeStack(true);
    expect(result1).toEqual(true);
  });

  test('Should return the correct data set', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._points = simplePointsWithLine;
    instance._lineObject = instance._getFormattedLineData(simplePointsWithLine);
    instance._getMargins({
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    });
    instance._getAxisData({ yAxisDomainValues: [10, 20, 30, 40] });
    instance._dataset = instance._createDataSetLayer();
    const result = instance._createDataSetLayer();
    expect(result).toHaveLength(2);
    const firstObject = result[0];
    expect(firstObject['x']).toEqual(33);
    expect(firstObject['y']).toEqual(2.5);
    const secondObject = result[1];
    expect(secondObject['x']).toEqual(55);
    expect(secondObject['y']).toEqual(73);
  });
});

runTest('Get Domain Margins', () => {
  beforeEach(sharedBeforeEach);

  test('Should return the correct margins when total width is greater than required width', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._points = simplePointsWithLine;
    instance._lineObject = instance._getFormattedLineData(simplePointsWithLine);
    instance._getMargins({
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    });
    instance._getAxisData({ yAxisDomainValues: [10, 20, 30, 40] });
    instance._dataset = instance._createDataSetLayer();
    instance._createDataSetLayer();
    var result = instance._getDomainMargins(1000);
    expect(result['bottom']).toEqual(10);
    expect(result['left']).toEqual(26);
    expect(result['right']).toEqual(26);
    expect(result['top']).toEqual(10);
  });

  test('Should return the correct margins when total width is less than required width', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._points = simplePointsWithLine;
    instance._lineObject = instance._getFormattedLineData(simplePointsWithLine);
    instance._getMargins({
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    });
    instance._getAxisData({ yAxisDomainValues: [10, 20, 30, 40] });
    instance._dataset = instance._createDataSetLayer();
    instance._createDataSetLayer();
    var result = instance._getDomainMargins(50);
    expect(result['bottom']).toEqual(10);
    expect(result['left']).toEqual(20.5);
    expect(result['right']).toEqual(20.5);
    expect(result['top']).toEqual(10);
  });
});

runTest('Get Scales', () => {
  beforeEach(sharedBeforeEach);

  test('Should return scales for numeric x-axis', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._points = simplePointsWithLine;
    instance._lineObject = instance._getFormattedLineData(simplePointsWithLine);
    instance._getMargins({
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    });
    instance._getAxisData({ yAxisDomainValues: [10, 20, 30, 40] });
    instance._dataset = instance._createDataSetLayer();
    const containerHeight = 500;
    const containerWidth = 800;
    instance._xAxisType = XAxisTypes.NumericAxis;
    const scales = instance._getScales(containerHeight, containerWidth);

    expect(scales.xBarScale).toBeDefined();
    expect(scales.yBarScale).toBeDefined();
  });

  test('Should return scales for non-numeric axis', () => {
    const instance = new VerticalStackedBarChartBase({
      data: chartPointsWithStringXAxisPoint,
      theme: DarkTheme,
    });
    expect(instance).toBeDefined();
    instance._points = chartPointsWithStringXAxisPoint;
    instance._lineObject = instance._getFormattedLineData(chartPointsWithStringXAxisPoint);
    instance._getMargins({
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    });
    instance._getAxisData({ yAxisDomainValues: [10, 20, 30, 40] });
    instance._dataset = instance._createDataSetLayer();
    const containerHeight = 500;
    const containerWidth = 800;
    instance._xAxisType = XAxisTypes.NumericAxis;
    const scales = instance._getScales(containerHeight, containerWidth);

    expect(scales.xBarScale).toBeDefined();
    expect(scales.yBarScale).toBeDefined();
  });
});
