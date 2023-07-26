import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import { ILineChartPoints, LineChart } from './index';

import {
  getByClass,
  getById,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility';

const basicPoints: ILineChartPoints[] = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
    color: 'red',
  },
  {
    legend: 'metaData2',
    data: [
      { x: 30, y: 60 },
      { x: 50, y: 90 },
    ],
    color: 'green',
  },
  {
    legend: 'metaData3',
    data: [
      { x: 70, y: 30 },
      { x: 40, y: 80 },
    ],
    color: 'yellow',
  }
];

const basicChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: basicPoints,
};

const datePoints: ILineChartPoints[] = [
  {
    data: [
      { x: new Date('2020/01/01'), y: 30 },
      { x: new Date('2020/02/01'), y: 50 },
      { x: new Date('2020/03/01'), y: 30 },
      { x: new Date('2020/04/01'), y: 50 },
      { x: new Date('2020/05/01'), y: 30 },
      { x: new Date('2020/06/01'), y: 50 },
    ],
    legend: 'First',
    lineOptions: {
      lineBorderWidth: '4',
    },
  }
];

const dateChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: datePoints,
};

const colorFillBarData = [
  {
    legend: 'Time range 1',
    color: 'blue',
    data: [
      {
        startX: new Date('2020/01/01'),
        endX: new Date('2020/02/01'),
      },
    ],
  },
  {
    legend: 'Time range 2',
    color: 'red',
    data: [
      {
        startX: new Date('2018/04/01'),
        endX: new Date('2018/05/01'),
      }
    ],
    applyPattern: true,
  },
];

const pointsWithGaps: ILineChartPoints[] = [
  {
    legend: 'Normal Data',

    hideNonActiveDots: true,
    lineOptions: {
      lineBorderWidth: '4',
    },
    data: [
      {
        x: new Date('2020-03-03T00:00:00.000Z'),
        y: 216000,
      },
      {
        x: new Date('2020-03-03T10:30:00.000Z'),
        y: 218123,
        hideCallout: true,
      },
      // gap here
      {
        x: new Date('2020-03-03T11:00:00.000Z'),
        y: 219000,
        hideCallout: true,
      },
      {
        x: new Date('2020-03-04T00:00:00.000Z'),
        y: 248000,
        hideCallout: true,
      },
      // gap here
      {
        x: new Date('2020-03-05T00:00:00.000Z'),
        y: 252000,
        hideCallout: true,
      },
      {
        x: new Date('2020-03-06T00:00:00.000Z'),
        y: 274000,
      },
      {
        x: new Date('2020-03-07T00:00:00.000Z'),
        y: 260000,
        hideCallout: true,
      },
      // gap here
      {
        x: new Date('2020-03-08T00:00:00.000Z'),
        y: 300000,
        hideCallout: true,
      },
      {
        x: new Date('2020-03-08T12:00:00.000Z'),
        y: 218000,
      },
      {
        x: new Date('2020-03-09T00:00:00.000Z'),
        y: 218000,
      },
      {
        x: new Date('2020-03-10T00:00:00.000Z'),
        y: 269000,
      },
    ],
    color: 'green',
  }
];

const chartPointsWithGaps = {
  chartTitle: 'LineChart',
  lineChartData: pointsWithGaps,
};


describe('Line chart rendering', () => {
  testWithoutWait(
    'Should render the Line chart with numeric x-axis data',
    LineChart,
    { data: basicChartPoints },
    container => {
    expect(container).toMatchSnapshot();
  });

  testWithoutWait(
    'Should render the Line chart with date x-axis data',
    LineChart,
    { data: dateChartPoints },
    container => {
    expect(container).toMatchSnapshot();
  });
});


describe('Line chart - Subcomponent Time Range', () => {
  testWithWait(
    'Should render the Line chart with date x-axis data',
    LineChart,
    { data: dateChartPoints, colorFillBars: colorFillBarData },
    container => {
    const getByClass = queryAllByAttribute.bind(null, 'class');
    // Assert
    expect(getByClass(container, /rect/i).length > 0);
  });

  testWithWait(
    'Should highlight corresponding time range on legend click',
    LineChart,
    { data: dateChartPoints, colorFillBars: colorFillBarData },
    container => {
    const legend = screen.queryByText('Time range 1');
    expect(legend).toBeDefined();
    fireEvent.click(legend!);
    const timeRangeLegend = screen.queryByText('Time range 1')?.closest('button');
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    const filledBars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    // Assert
    expect(timeRangeLegend).toHaveAttribute('aria-selected', 'true');
    expect(lines[0].getAttribute('opacity')).toEqual('0.1');
    expect(filledBars[0].getAttribute('fill-opacity')).toEqual('0.4');
    expect(filledBars[1].getAttribute('fill-opacity')).toEqual('0.1');
  });
});

describe('Line chart - Subcomponent line', () => {
  testWithoutWait(
    'Should render the lines with the specified colors',
    LineChart,
    { data: basicChartPoints },
    container => {
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    // Assert
    expect(lines[0].getAttribute('stroke')).toEqual('yellow');
    expect(lines[1].getAttribute('stroke')).toEqual('green');
    expect(lines[2].getAttribute('stroke')).toEqual('red');
  });

  testWithoutWait(
    'Should render line with gaps',
    LineChart,
    { data: chartPointsWithGaps },
    container => {
    // Arrange
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    // Assert
    expect(lines.length == 9);
  });
});


describe('Line chart - Subcomponent legend', () => {
  testWithoutWait(
    'Should highlight the corresponding Line on mouse over on legends',
    LineChart,
    { data: basicChartPoints },
    container => {
    const legend = screen.queryByText('metaData1');
    expect(legend).toBeDefined();
    fireEvent.mouseOver(legend!);
    // Assert
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    expect(lines[0].getAttribute('opacity')).toEqual('0.1');
    expect(lines[1].getAttribute('opacity')).toEqual('0.1');
    expect(lines[2].getAttribute('opacity')).toEqual('1');
  });

  testWithoutWait(
    'Should highlight the corresponding Legend on mouse over on legends',
    LineChart,
    { data: basicChartPoints },
    container => {
    const legend = screen.queryByText('metaData1');
    expect(legend).toBeDefined();
    fireEvent.mouseOver(legend!);
    // Assert
    expect(screen.queryByText('metaData2')).toHaveStyle('opacity: 0.67');
  });

  testWithoutWait(
    'Should select legend on single mouse click on legends',
    LineChart,
    { data: basicChartPoints, hideLegend: false },
    container => {
    // Arrange
    const legend = screen.queryByText('metaData1');
    expect(legend).toBeDefined();
    fireEvent.click(legend!);
    // Assert
    const getById = queryAllByAttribute.bind(null, 'id');
    expect(getById(container, /line/i)[1]).toHaveAttribute('opacity', '0.1');
    const firstLegend = screen.queryByText('metaData1')?.closest('button');
    expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    expect(firstLegend).toHaveAttribute('tabIndex', '0');
  });

  testWithoutWait(
    'Should deselect legend on double mouse click on legends',
    LineChart,
    { data: basicChartPoints, hideLegend: false },
    container => {
    const legend = screen.queryByText('metaData1');
    expect(legend).toBeDefined();

    //single click on first legend
    fireEvent.click(legend!);
    const getById = queryAllByAttribute.bind(null, 'id');
    expect(getById(container, /line/i)[1]).toHaveAttribute('opacity', '0.1');
    const firstLegend = screen.queryByText('metaData1')?.closest('button');
    expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    expect(firstLegend).toHaveAttribute('tabIndex', '0');
    // double click on same first legend
    fireEvent.click(legend!);
    // Assert
    expect(firstLegend).toHaveAttribute('aria-selected', 'false');
  });

  testWithWait(
    'Should highlight the data points and render the corresponding callout',
    LineChart,
    { data: basicChartPoints },
    container => {
    // Arrange
    const getById = queryAllByAttribute.bind(null, 'id');
    const firstPointonLine = getById(container, /lineID/)[0];
    expect(firstPointonLine).toBeDefined();
    fireEvent.mouseOver(firstPointonLine);
    // Assert
    expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
  });

  testWithWait(
    'Should not show any tooltip when hideTooltip is true',
    LineChart,
    { data: basicChartPoints, hideTooltip: true },
    container => {
    // Arrange
    const getByClass = queryAllByAttribute.bind(null, 'class');
    // Assert
    expect(getByClass(container, /toolTipcallout/i)).toHaveLength(0);
  });
});

describe('Line chart - Subcomponent xAxis Labels', () => {
  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    LineChart,
    { data: dateChartPoints, showXAxisLablesTooltip: true },
    container => {
    // Arrange
    const getById = queryAllByAttribute.bind(null, 'id');
    const xAxisLabels = getById(container, /showDots/i);
    fireEvent.mouseOver(xAxisLabels[0]);
    // Assert
    expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Febr...');
  });

  testWithWait(
    'Should show rotated x-axis labels',
    LineChart,
    { data: dateChartPoints, rotateXAxisLables: true },
    container => {
    const getByClass = queryAllByAttribute.bind(null, 'class');
    expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('translate(40.5,0)');
  });
});

describe('Screen resolution', () => {
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
    LineChart,
    { data: basicChartPoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
    // Arrange
    global.innerWidth = window.innerWidth / 2;
    global.innerHeight = window.innerHeight / 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    // Assert
    expect(container).toMatchSnapshot();
  });

  testWithWait(
    'Should remain unchanged on zoom out',
    LineChart,
    { data: basicChartPoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
    // Arrange
    global.innerWidth = window.innerWidth * 2;
    global.innerHeight = window.innerHeight * 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    // Assert
    expect(container).toMatchSnapshot();
  });
});

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <LineChart culture={window.navigator.language} data={basicChartPoints} />
    </ThemeProvider>,
  );
  // Assert
  expect(container).toMatchSnapshot();
});


