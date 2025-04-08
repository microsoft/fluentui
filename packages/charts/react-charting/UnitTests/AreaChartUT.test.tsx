import { screen, fireEvent } from '@testing-library/react';
import { AreaChart } from '../src/components/AreaChart/index';
import { getById, testWithoutWait, isTimezoneSet, forEachTimezone } from '../src/utilities/TestUtility.test';
import { resetIds } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';

const env = require('../config/tests');
const { Timezone } = require('../scripts/constants');
const runTest = env === 'TEST' ? describe : describe.skip;

const chart1Points = [
  {
    x: 20,
    y: 9,
  },
  {
    x: 25,
    y: 14,
  },
  {
    x: 30,
    y: 14,
  },
  {
    x: 35,
    y: 23,
  },
  {
    x: 40,
    y: 20,
  },
  {
    x: 45,
    y: 31,
  },
  {
    x: 50,
    y: 29,
  },
  {
    x: 55,
    y: 27,
  },
  {
    x: 60,
    y: 37,
  },
  {
    x: 65,
    y: 51,
  },
];

const chart2Points = [
  {
    x: 20,
    y: 21,
  },
  {
    x: 25,
    y: 25,
  },
  {
    x: 30,
    y: 10,
  },
  {
    x: 35,
    y: 10,
  },
  {
    x: 40,
    y: 14,
  },
  {
    x: 45,
    y: 18,
  },
  {
    x: 50,
    y: 9,
  },
  {
    x: 55,
    y: 23,
  },
  {
    x: 60,
    y: 7,
  },
  {
    x: 65,
    y: 55,
  },
];

const chart3Points = [
  {
    x: 20,
    y: 30,
  },
  {
    x: 25,
    y: 35,
  },
  {
    x: 30,
    y: 33,
  },
  {
    x: 35,
    y: 40,
  },
  {
    x: 40,
    y: 10,
  },
  {
    x: 45,
    y: 40,
  },
  {
    x: 50,
    y: 34,
  },
  {
    x: 55,
    y: 40,
  },
  {
    x: 60,
    y: 60,
  },
  {
    x: 65,
    y: 40,
  },
];

const chartPointsMultiStacked = [
  {
    legend: 'legend1',
    data: chart1Points,
    color: 'green',
  },
  {
    legend: 'legend2',
    data: chart2Points,
    color: 'yellow',
  },
  {
    legend: 'legend3',
    data: chart3Points,
    color: 'blue',
  },
];

const chartPoints = [
  {
    legend: 'legend1',
    data: chart1Points,
    color: 'green',
  },
];

const chartPointsDarkTheme = [
  {
    legend: 'legend1',
    data: chart1Points,
    color: DarkTheme.palette.themePrimary,
  },
];

const chartPointsWithoutDefaultColor = [
  {
    legend: 'legend1',
    data: chart1Points,
  },
];

export const chartDataMultiStacked = {
  chartTitle: 'Area chart multiple example',
  lineChartData: chartPointsMultiStacked,
};

export const chartData = {
  chartTitle: 'Area chart example',
  lineChartData: chartPoints,
};

export const chartDataWithoutDefaultColor = {
  chartTitle: 'Area chart without default color example',
  lineChartData: chartPointsWithoutDefaultColor,
};

export const chartDataDarkTheme = {
  chartTitle: 'Area chart dark theme example',
  lineChartData: chartPointsDarkTheme,
};

function sharedBeforeEach() {
  resetIds();
}

runTest('_getOpacity', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should return fill-opacity of 0.7 if chart is not multi-stacked',
    AreaChart,
    { data: chartData },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      expect(areas.length).toBe(1);
      expect(areas[0].getAttribute('fill-opacity')).toBe('0.7');
    },
  );

  testWithoutWait(
    'Should return fill-opacity of 0.7 if chart is multi-stacked',
    AreaChart,
    { data: chartDataMultiStacked },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      expect(areas.length).toBe(3);
      expect(areas[0].getAttribute('fill-opacity')).toBe('0.7');
    },
  );

  testWithoutWait(
    'Should return fill-opacity of 0.7 if legend is highlighted and data is multi-stacked',
    AreaChart,
    { data: chartDataMultiStacked },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const areas = getById(container, /graph-areaChart/i);
      expect(areas[0].getAttribute('fill-opacity')).toEqual('0.7');
    },
  );

  testWithoutWait(
    'Should return fill-opacity of 0.1 if legend 1 is highlighted but legend 2 is not and data is multi-stacked',
    AreaChart,
    { data: chartDataMultiStacked },
    container => {
      const legend1 = screen.queryByText('legend1');
      expect(legend1).toBeDefined();
      fireEvent.mouseOver(legend1!);
      // Assert
      const areas = getById(container, /graph-areaChart/i);
      expect(areas[1].getAttribute('fill-opacity')).toEqual('0.1');
    },
  );
});

runTest('_getLineOpacity', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait('Should return 1 if chart is not multi-stacked', AreaChart, { data: chartData }, container => {
    const areas = getById(container, /line-areaChart/i);
    expect(areas.length).toBe(1);
    expect(areas[0].getAttribute('opacity')).toBe('1');
  });

  testWithoutWait(
    'Should return 0.3 if chart is multi-stacked and no legend is highlighted',
    AreaChart,
    { data: chartDataMultiStacked },
    container => {
      const areas = getById(container, /line-areaChart/i);
      expect(areas.length).toBe(3);
      expect(areas[0].getAttribute('opacity')).toBe('0.3');
    },
  );

  testWithoutWait(
    'Should return 1 if callout is visible and data is not multi-stacked',
    AreaChart,
    { data: chartData },
    container => {
      // Arrange
      const areas = getById(container, /line-areaChart/i);
      expect(areas.length).toBe(1);
      fireEvent.mouseOver(areas[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(areas[0].getAttribute('opacity')).toBe('1');
    },
  );

  testWithoutWait(
    'Should return opacity of 0.1 if legend 1 is highlighted, legend 2 is not highlighted and data is multi-stacked',
    AreaChart,
    { data: chartDataMultiStacked },
    container => {
      const legend1 = screen.queryByText('legend1');
      expect(legend1).toBeDefined();
      fireEvent.mouseOver(legend1!);
      // Assert
      const areas = getById(container, /line-areaChart/i);
      expect(areas.length).toBe(3);
      expect(areas[1].getAttribute('opacity')).toEqual('0.1');
    },
  );

  testWithoutWait(
    'Should return opacity of 0 if legend 1 is highlighted, legend 2 is active and data is multi-stacked',
    AreaChart,
    { data: chartDataMultiStacked },
    container => {
      const legend1 = screen.queryByText('legend1');
      expect(legend1).toBeDefined();
      fireEvent.mouseOver(legend1!);
      const legend2 = screen.queryByText('legend2');
      expect(legend2).toBeDefined();
      fireEvent.click(legend2!);
      // Assert
      const areas = getById(container, /line-areaChart/i);
      expect(areas.length).toBe(3);
      expect(areas[1].getAttribute('opacity')).toEqual('0');
    },
  );
});

runTest('_updateCircleFillColor', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should return the line color if neither the nearest circle nor the active point is highlighted',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      // Assert
      points.forEach(point => {
        expect(point.getAttribute('fill')).toEqual('green');
      });
    },
  );

  testWithoutWait(
    'Should return white if the nearest circle is highlighted and the circle is not clicked',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.mouseOver(points[6]);
      expect(points[6].getAttribute('fill')).toEqual('#ffffff');
    },
  );

  testWithoutWait(
    'Should return the line color if the nearest circle is highlighted and the circle is clicked',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.mouseOver(points[0]);
      fireEvent.click(points[0]);
      expect(points[0].getAttribute('fill')).toEqual('green');
    },
  );

  testWithoutWait(
    'Should return white if the active point is highlighted and the circle is not clicked',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.focus(points[0]);
      expect(points[0].getAttribute('fill')).toEqual('#ffffff');
    },
  );

  testWithoutWait(
    'Should return the line color if the active point is highlighted but the circle is clicked',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.mouseOver(points[0]);
      fireEvent.click(points[0]);
      fireEvent.mouseOver(points[1]);
      fireEvent.click(points[1]);
      expect(points[1].getAttribute('fill')).toEqual('green');
    },
  );
});

runTest('_getCircleRadius', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should return 1 if isCircleClicked is true and nearestCircleToHighlight matches xDataPoint',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.mouseOver(points[1]);
      fireEvent.click(points[0]);
      // nearest circle to highlight has index 6
      // activePoint does not matche the point circle whose radius is checked
      expect(points[6].getAttribute('r')).toEqual('1');
    },
  );

  testWithoutWait(
    'Should return circleRadius if activePoint matches the circle',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.focus(points[0]);
      // activePoint matches the point circle whose radius is checked
      expect(points[0].getAttribute('r')).toEqual('8');
    },
  );

  testWithoutWait(
    'Should return 0 if !isCircleClicked, (activePoint != circle) and (nearestCircleToHighlight != xDataPoint)',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.focus(points[0]);
      expect(points[1].getAttribute('r')).toEqual('0');
    },
  );

  testWithoutWait(
    'Should return 0 if isCircleClicked is true but nearestCircleToHighlight does not match xDataPoint',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.click(points[0]);
      fireEvent.mouseOver(points[1]);
      expect(points[2].getAttribute('r')).toEqual('0');
    },
  );

  testWithoutWait(
    'Should return 0 if nearestCircleToHighlight does not match xDataPoint and activePoint is not set',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.mouseOver(points[1]);
      expect(points[2].getAttribute('r')).toEqual('0');
    },
  );

  testWithoutWait(
    'Should return circleRadius if nearestCircleToHighlight matches xDataPoint and activePoint is not set',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.mouseOver(points[6]);
      expect(points[6].getAttribute('r')).toEqual('8');
    },
  );

  testWithoutWait(
    'Should return circleRadius if nearestCircleToHighlight matches xDataPoint, activePoint matches another circle',
    AreaChart,
    { data: chartData },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      fireEvent.focus(points[0]);
      fireEvent.mouseOver(points[6]);
      expect(points[6].getAttribute('r')).toEqual('8');
    },
  );
});

runTest('_addDefaultColors', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should return an array with the same length as the input array',
    AreaChart,
    { data: chartDataWithoutDefaultColor },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      points.forEach(point => {
        expect(point).toHaveAttribute('fill');
        expect(point.getAttribute('fill')).toEqual('#637cef');
      });
    },
  );

  testWithoutWait('Should use the provided color if it exists', AreaChart, { data: chartData }, container => {
    const points = getById(container, /circle/i);
    expect(points).toHaveLength(10);
    points.forEach(point => {
      expect(point).toHaveAttribute('fill');
      expect(point.getAttribute('fill')).toEqual('green');
    });
  });

  testWithoutWait(
    'Should use the inverted theme if the isInverted property is true and colors are not provided',
    AreaChart,
    { data: chartDataWithoutDefaultColor, theme: { ...DarkTheme, isInverted: true } },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      points.forEach(point => {
        expect(point).toHaveAttribute('fill');
        expect(point.getAttribute('fill')).toEqual('#637cef');
      });
    },
  );

  testWithoutWait(
    'Should use the inverted theme if the isInverted property is true and colors are provided',
    AreaChart,
    { data: chartDataDarkTheme, theme: { ...DarkTheme, isInverted: true } },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(10);
      points.forEach(point => {
        expect(point).toHaveAttribute('fill');
        expect(point.getAttribute('fill')).toEqual('#2899f5');
      });
    },
  );
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should return the correct aria label for a point with xAxisCalloutData and yAxisCalloutData',
    AreaChart,
    {
      data: {
        chartTitle: 'Area chart arial label example',
        lineChartData: [
          {
            legend: 'Legend 1',
            data: [
              {
                x: new Date(2022, 0, 1),
                y: 10,
                xAxisCalloutData: 'Jan 1, 2022',
                yAxisCalloutData: '10 units',
                callOutAccessibilityData: {
                  ariaLabel: 'Custom aria label',
                },
              },
            ],
          },
        ],
      },
    },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(1);
      expect(points[0].getAttribute('aria-label')).toEqual('Custom aria label');
    },
  );

  forEachTimezone((tzName, tzIdentifier) => {
    testWithoutWait(
      `Should return the correct aria label for a point with formatted x value and y value in ${tzName} timezone`,
      AreaChart,
      {
        data: {
          chartTitle: 'Area chart arial label example',
          lineChartData: [
            {
              legend: 'Legend 1',
              data: [
                {
                  x: new Date('2022-01-01T00:00Z'),
                  y: 10,
                },
              ],
            },
          ],
        },
      },
      container => {
        const points = getById(container, /circle/i);
        expect(points).toHaveLength(1);
        expect(points[0].getAttribute('aria-label')).toMatchSnapshot();
      },
      undefined,
      undefined,
      !(isTimezoneSet(tzIdentifier) && env === 'TEST'),
    );

    testWithoutWait(
      `Should return the correct aria label for a point with formatted x value and yAxisCalloutData in ${tzName} timezone`,
      AreaChart,
      {
        data: {
          chartTitle: 'Area chart arial label example',
          lineChartData: [
            {
              legend: 'Legend 1',
              data: [
                {
                  x: new Date('2022-01-01T00:00Z'),
                  y: 10,
                  yAxisCalloutData: '10 units',
                },
              ],
            },
          ],
        },
      },
      container => {
        const points = getById(container, /circle/i);
        expect(points).toHaveLength(1);
        expect(points[0].getAttribute('aria-label')).toMatchSnapshot();
      },
      undefined,
      undefined,
      !(isTimezoneSet(tzIdentifier) && env === 'TEST'),
    );

    testWithoutWait(
      `Should return the correct aria label for a point with formatted x value and xAxisCalloutData in ${tzName} timezone`,
      AreaChart,
      {
        data: {
          chartTitle: 'Area chart arial label example',
          lineChartData: [
            {
              legend: 'Legend 1',
              data: [
                {
                  x: new Date('2022-01-01T00:00Z'),
                  y: 10,
                  xAxisCalloutData: 'Jan 1, 2022',
                },
              ],
            },
          ],
        },
      },
      container => {
        const points = getById(container, /circle/i);
        expect(points).toHaveLength(1);
        expect(points[0].getAttribute('aria-label')).toMatchSnapshot();
      },
      undefined,
      undefined,
      !(isTimezoneSet(tzIdentifier) && env === 'TEST'),
    );
  });

  testWithoutWait(
    'Should return the correct aria label for a point with callOutAccessibilityData but no xAxis or yAxis CalloutData',
    AreaChart,
    {
      data: {
        chartTitle: 'Area chart arial label example',
        lineChartData: [
          {
            legend: 'Legend 1',
            data: [
              {
                x: 1,
                y: 10,
                callOutAccessibilityData: {
                  ariaLabel: 'Custom aria label',
                },
              },
            ],
          },
        ],
      },
    },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(1);
      expect(points[0].getAttribute('aria-label')).toEqual('Custom aria label');
    },
  );
});
