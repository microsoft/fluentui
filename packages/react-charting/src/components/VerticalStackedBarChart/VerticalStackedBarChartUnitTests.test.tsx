import { screen, fireEvent } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IVSChartDataPoint } from '../../index';
import { VerticalStackedBarChart } from './VerticalStackedBarChart';
import { testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';

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

describe('Unit tests for Path', () => {
  testWithWait(
    'Should return path when a point is hovered',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(2);
      expect(paths[0]!.getAttribute('d')).toBe(`M56.5,6V0.5H-35.5V6`);
      expect(paths[1]!.getAttribute('d')).toBe(`M-6,275.5H0.5V20.5H-6`);
    },
  );
});

describe('Unit tests for Points', () => {
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

describe('_addDefaultColors', () => {
  testWithoutWait(
    'Should return an array with the same length as the input array',
    VerticalStackedBarChart,
    { data: chartPointsWithoutColor },
    container => {
      const points = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      expect(points).toHaveLength(2);
      points.forEach(point => {
        expect(point).toHaveAttribute('fill');
      });
    },
  );
});

describe('_getAriaLabel', () => {
  testWithWait(
    'Should return the correct aria label for a Bar',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
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
      const barAreaLabel = screen.queryByText('2.8');
      expect(barAreaLabel).not.toBeNull();
      expect(barAreaLabel!.getAttribute('aria-label')).toEqual('Total: 2.8');
    },
  );
});

describe('_legendHighlighted', () => {
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
});

describe('_noLegendHighlighted', () => {
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

describe('_createStringBars', () => {
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
});

describe('_createNumericBars', () => {
  testWithWait(
    'Should return the bars and x axis values for numaric XAxis data',
    VerticalStackedBarChart,
    { data: simplePointsWithLine },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(5);
    },
  );
});

describe('_getFormattedLineData', () => {
  test('Should return the correct margins when total width is greater than required width', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
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
});

describe('_toFocusWholeStack', () => {
  test('Should return the correct margins when total width is greater than required width', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
    });
    expect(instance).toBeDefined();
    const result = instance._toFocusWholeStack(false);
    expect(result).toEqual(false);
    const result1 = instance._toFocusWholeStack(true);
    expect(result1).toEqual(true);
  });
});

describe('_getLineLegends', () => {
  test('Should return the correct line legends', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
    });
    expect(instance).toBeDefined();
    instance.updateProperties();
    const result = instance._getLineLegends(simplePointsWithLine);
    expect(result).toHaveLength(1);
    expect(result[0]['title']).toEqual('Supported Builds');
  });
});

describe('_createDataSetLayer', () => {
  test('Should return the correct data set', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
    });
    expect(instance).toBeDefined();
    instance.updateProperties();
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

describe('_getDomainMargins', () => {
  test('Should return the correct domain margins', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
    });
    expect(instance).toBeDefined();
    instance.updateProperties();
    instance._createDataSetLayer();
    var result = instance._getDomainMargins(1000);
    expect(result['bottom']).toEqual(10);
    expect(result['left']).toEqual(468);
    expect(result['right']).toEqual(468);
    expect(result['top']).toEqual(10);

    result = instance._getDomainMargins(500);
    expect(result['bottom']).toEqual(10);
    expect(result['left']).toEqual(218);
    expect(result['right']).toEqual(218);
    expect(result['top']).toEqual(10);
  });
});

describe('_getScales', () => {
  test('Should return the correct  scale', () => {
    const instance = new VerticalStackedBarChartBase({
      data: simplePointsWithLine,
    });
    expect(instance).toBeDefined();
    instance.updateProperties();

    const containerHeight = 500;
    const containerWidth = 800;
    const isNumericAxis = true;
    const scales = instance._getScales(containerHeight, containerWidth, isNumericAxis);

    expect(scales.xBarScale).toBeDefined();
    expect(scales.yBarScale).toBeDefined();
    // expect(scales.xBarScale(-1000)).toBeLessThan(0);
    // expect(scales.xBarScale(20000)).toBeLessThanOrEqual(containerWidth);
    // expect(scales.xBarScale(40000)).toBeGreaterThan(containerWidth);
    expect(scales.yBarScale(-500)).toBeLessThan(0);
    expect(scales.yBarScale(60000)).toBeGreaterThan(containerHeight);
  });
});
