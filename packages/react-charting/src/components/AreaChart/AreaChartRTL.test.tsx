/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider, resetIds } from '@fluentui/react';
import { AreaChart, IAreaChartProps } from './index';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

import {
  forEachTimezone,
  getByClass,
  getById,
  isTimezoneSet,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';
const { Timezone } = require('../../../scripts/constants');

expect.extend(toHaveNoViolations);

function sharedBeforeEach() {
  resetIds();
}

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

const chartPoints = [
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

const chartData = {
  chartTitle: 'Area chart multiple example',
  lineChartData: chartPoints,
};

const chart1PointsWithDate = [
  {
    x: new Date('01/06/2018'),
    y: 5,
  },
  {
    x: new Date('01/08/2018'),
    y: 16,
  },
  {
    x: new Date('01/16/2018'),
    y: 6,
  },
  {
    x: new Date('02/06/2018'),
    y: 30,
  },
  {
    x: new Date('02/16/2018'),
    y: 10,
  },
];

const chart2PointsWithDate = [
  {
    x: new Date('01/06/2018'),
    y: 10,
  },
  {
    x: new Date('01/08/2018'),
    y: 33,
  },
  {
    x: new Date('01/16/2018'),
    y: 21,
  },
  {
    x: new Date('02/06/2018'),
    y: 44,
  },
  {
    x: new Date('02/16/2018'),
    y: 22,
  },
];

const chartPointsWithDate = [
  {
    legend: 'legend1',
    data: chart1PointsWithDate,
    color: '#0099BC',
    opacity: 0.7,
    lineOptions: {
      strokeWidth: 2,
      strokeDasharray: '5 5',
    },
  },
  {
    legend: 'legend2',
    data: chart2PointsWithDate,
    color: '#77004D',
    opacity: 0.8,
    lineOptions: {
      strokeWidth: 5,
      stroke: DefaultPalette.blueDark,
    },
  },
];

const chartDataWithDates = {
  chartTitle: 'Area chart styled example',
  lineChartData: chartPointsWithDate,
  pointOptions: { r: 10, strokeWidth: 3, opacity: 1, stroke: DefaultPalette.blueDark },
  pointLineOptions: { strokeWidth: 2, strokeDasharray: '10 10', stroke: DefaultPalette.blueDark },
};

describe('Area chart rendering', () => {
  beforeEach(sharedBeforeEach);
  testWithoutWait(
    'Should render the area chart with numeric x-axis data',
    AreaChart,
    { data: chartData },
    container => {
      expect(container).toMatchSnapshot();
    },
  );

  forEachTimezone((tzName, tzIdentifier) => {
    testWithoutWait(
      `Should render the area chart with date x-axis data in ${tzName} timezone`,
      AreaChart,
      { data: chartDataWithDates },
      container => {
        expect(container).toMatchSnapshot();
      },
      undefined,
      undefined,
      !isTimezoneSet(tzIdentifier),
    );
  });
});

describe('Area chart - Subcomponent Area', () => {
  beforeEach(sharedBeforeEach);
  testWithoutWait('Should render the Areas with the specified colors', AreaChart, { data: chartData }, container => {
    const areas = getById(container, /graph-areaChart/i);
    // Assert
    expect(areas[0].getAttribute('fill')).toEqual('green');
    expect(areas[1].getAttribute('fill')).toEqual('yellow');
    expect(areas[2].getAttribute('fill')).toEqual('blue');
  });
});

describe('Area chart - Subcomponent legend', () => {
  beforeEach(sharedBeforeEach);
  testWithoutWait(
    'Should highlight the corresponding Area on mouse over on legends',
    AreaChart,
    { data: chartData },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const areas = getById(container, /graph-areaChart/i);
      expect(areas[0].getAttribute('fill-opacity')).toEqual('0.7');
      expect(areas[1].getAttribute('fill-opacity')).toEqual('0.1');
      expect(areas[2].getAttribute('fill-opacity')).toEqual('0.1');
    },
  );

  testWithoutWait(
    'Should reduce opacity of the other lines in Area chat and opacity should be zero for selected Area',
    AreaChart,
    { data: chartData },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const areaLines = getById(container, /line-areaChart/i);
      expect(areaLines[0].getAttribute('opacity')).toEqual('0');
      expect(areaLines[1].getAttribute('opacity')).toEqual('0.1');
      expect(areaLines[2].getAttribute('opacity')).toEqual('0.1');
    },
  );

  testWithoutWait(
    'Should highlight the corresponding Legend on mouse over on legends',
    AreaChart,
    { data: chartData },
    container => {
      const legend1 = screen.queryByText('legend1');
      expect(legend1).toBeDefined();
      fireEvent.mouseOver(legend1!);
      // Assert
      expect(screen.queryByText('legend2')).toHaveStyle('opacity: 0.67');
    },
  );

  testWithoutWait(
    'Should select legend on single mouse click on legends',
    AreaChart,
    { data: chartData, hideLegend: false },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.click(legend!);
      // Assert
      expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.1');
      const firstLegend = screen.queryByText('legend1')?.closest('button');
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      expect(firstLegend).toHaveAttribute('tabIndex', '0');
    },
  );

  testWithoutWait(
    'Should deselect legend on double mouse click on legends',
    AreaChart,
    { data: chartData, hideLegend: false },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();

      //single click on first legend
      fireEvent.click(legend!);
      expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.1');
      const firstLegend = screen.queryByText('legend1')?.closest('button');
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      expect(firstLegend).toHaveAttribute('tabIndex', '0');
      // double click on same first legend
      fireEvent.click(legend!);
      // Assert
      expect(firstLegend).toHaveAttribute('aria-selected', 'false');
    },
  );
});

describe('Area chart - Subcomponent callout', () => {
  beforeEach(sharedBeforeEach);
  testWithWait(
    'Should show the callout over the area on mouse over',
    AreaChart,
    { data: chartData, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const areas = getById(container, /graph-areaChart/i);
      fireEvent.mouseOver(areas[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the stacked callout over the are on mouse over',
    AreaChart,
    { data: chartData, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const areas = getById(container, /graph-areaChart/i);
      expect(areas).toHaveLength(3);
      fireEvent.mouseOver(areas[0]);
      // Assert
      expect(getByClass(container, /calloutlegendText/i)).toBeDefined();
      expect(getByClass(container, /calloutlegendText/i)).toHaveLength(3);
    },
  );

  testWithWait(
    'Should show the custom callout over the Area on mouse over',
    AreaChart,
    {
      data: chartData,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IAreaChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      fireEvent.mouseOver(areas[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );
});

describe('Area chart - Subcomponent xAxis Labels', () => {
  beforeEach(sharedBeforeEach);
  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    AreaChart,
    { data: chartDataWithDates, showXAxisLablesTooltip: true },
    container => {
      const xAxisLabels = getById(container, /showDots/i);
      fireEvent.mouseOver(xAxisLabels[0]);
      // Assert
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Jan ...');
    },
    undefined,
    undefined,
  );

  testWithWait(
    'Should show rotated x-axis labels',
    AreaChart,
    { data: chartDataWithDates, rotateXAxisLables: true },
    container => {
      // FIXME - Bad check. Not the best way to check result from a third party utility.
      // If there are any changes, the value must be manually adjusted to ensure the test passes.
      // Assert
      expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('translate(39.03658536585366,0)');
    },
    undefined,
    undefined,
    !isTimezoneSet(Timezone.UTC),
  );
});

describe('Screen resolution', () => {
  beforeEach(sharedBeforeEach);
  const originalInnerWidth = global.innerWidth;
  const originalInnerHeight = global.innerHeight;
  afterEach(() => {
    global.innerWidth = originalInnerWidth;
    global.innerHeight = originalInnerHeight;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
  });

  testWithWait(
    'Should remain unchanged on zoom in',
    AreaChart,
    { data: chartData, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
      // Arrange
      global.innerWidth = window.innerWidth / 2;
      global.innerHeight = window.innerHeight / 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should remain unchanged on zoom out',
    AreaChart,
    { data: chartData, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
      // Arrange
      global.innerWidth = window.innerWidth * 2;
      global.innerHeight = window.innerHeight * 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('AreaChart - Theme', () => {
  beforeEach(sharedBeforeEach);
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <AreaChart culture={window.navigator.language} data={chartData} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });

  test('Should pass accessibility tests', async () => {
    const { container } = render(<AreaChart data={chartData} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
