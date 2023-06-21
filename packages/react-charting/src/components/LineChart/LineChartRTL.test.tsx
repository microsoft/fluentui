import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import { IEventsAnnotationProps, ILineChartPoints, LineChart } from './index';
import { LineChartBase } from './LineChart.base';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { chartPoints } from '../DonutChart/DonutChart.test';

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


const calloutItemStyle = mergeStyles({
  borderBottom: '1px solid #D9D9D9',
  padding: '3px',
});

const eventsData: IEventsAnnotationProps = {
  events: [
    {
      event: 'event 1',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 1 message</div>,
    },
    {
      event: 'event 2',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 2 message</div>,
    },
    {
      event: 'event 3',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 3 message</div>,
    },
    {
      event: 'event 4',
      date: new Date('2020-03-06T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 4 message</div>,
    },
    {
      event: 'event 5',
      date: new Date('2020-03-08T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 5 message</div>,
    },
  ],
  strokeColor: '#111111',
  labelColor: '#111111',
  labelHeight: 18,
  labelWidth: 50,
  mergedLabel: (count: number) => `${count} events`,
};

const eventPoints: ILineChartPoints[] = [
  {
    legend: 'From_Legacy_to_O365',
    data: [
      {
        x: new Date('2020-03-03T00:00:00.000Z'),
        y: 297,
      },
      {
        x: new Date('2020-03-04T00:00:00.000Z'),
        y: 284,
      },
      {
        x: new Date('2020-03-05T00:00:00.000Z'),
        y: 282,
      },
      {
        x: new Date('2020-03-06T00:00:00.000Z'),
        y: 294,
      },
      {
        x: new Date('2020-03-07T00:00:00.000Z'),
        y: 294,
      },
      {
        x: new Date('2020-03-08T00:00:00.000Z'),
        y: 300,
      },
      {
        x: new Date('2020-03-09T00:00:00.000Z'),
        y: 298,
      },
    ],
    color: 'green',
    lineOptions: {
      lineBorderWidth: '4',
    },
  },
  {
    legend: 'All',
    data: [
      {
        x: new Date('2020-03-03T00:00:00.000Z'),
        y: 292,
      },
      {
        x: new Date('2020-03-04T00:00:00.000Z'),
        y: 287,
      },
      {
        x: new Date('2020-03-05T00:00:00.000Z'),
        y: 287,
      },
      {
        x: new Date('2020-03-06T00:00:00.000Z'),
        y: 292,
      },
      {
        x: new Date('2020-03-07T00:00:00.000Z'),
        y: 287,
      },
      {
        x: new Date('2020-03-08T00:00:00.000Z'),
        y: 297,
      },
      {
        x: new Date('2020-03-09T00:00:00.000Z'),
        y: 292,
      },
    ],
    color: 'yellow',
    lineOptions: {
      lineBorderWidth: '4',
    },
  }
];

const eventAnnotationChatPoints = {
chartTitle: 'LineChart',
lineChartData: eventPoints,
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
  test('Should render the Line chart with numeric x-axis data', () => {
    const { container } = render(<LineChart data={basicChartPoints}/>);
    expect(container).toMatchSnapshot();
  });

  test('Should render the Line chart with date x-axis data', () => {
    const { container } = render(<LineChart data={dateChartPoints}/>);
    expect(container).toMatchSnapshot();
  });
});


describe('Line chart - Subcomponent Time Range', () => {
  test('Should render time range with defined data', async () => {
    // Arrange
    const { container } = render(<LineChart data={dateChartPoints} colorFillBars={colorFillBarData} />);
    await new Promise(resolve => setTimeout(resolve));
    const getByClass = queryAllByAttribute.bind(null, 'class');
    expect(getByClass(container, /rect/i).length > 0);
  });

  test('Should highlight corresponding time range on legend click', async () => {
    // Arrange
    const { container } = render(<LineChart data={dateChartPoints} colorFillBars={colorFillBarData} />);

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
  test('Should render the lines with the specified colors', async () => {
    // Arrange
    const { container } = render(<LineChart data={basicChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    // Assert
    expect(lines[0].getAttribute('stroke')).toEqual('yellow');
    expect(lines[1].getAttribute('stroke')).toEqual('green');
    expect(lines[2].getAttribute('stroke')).toEqual('red');
  });

  test('Should render line with gaps', async () => {
    // Arrange
    const { container } = render(<LineChart data={chartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    expect(lines.length == 9);
  });
});

describe('Line chart - Subcomponent legend', () => {
test('Should highlight the corresponding Line on mouse over on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={basicChartPoints} />);
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

test('Should highlight the corresponding Legend on mouse over on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={basicChartPoints} />);
  const legend = screen.queryByText('metaData1');
  expect(legend).toBeDefined();
  fireEvent.mouseOver(legend!);
  // Assert
  expect(screen.queryByText('metaData2')).toHaveStyle('opacity: 0.67');
});

test('Should select legend on single mouse click on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={basicChartPoints} hideLegend={false} />);
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

test('Should deselect legend on double mouse click on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={basicChartPoints} hideLegend={false} />);
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

test('Should highlight the data points and render the corresponding callout', () => {
  // Arrange
  const { container } = render(<LineChart data={basicChartPoints} />);
  const getById = queryAllByAttribute.bind(null, 'id');
  const firstPointonLine = getById(container, /lineID/)[0];
  expect(firstPointonLine).toBeDefined();
  fireEvent.mouseOver(firstPointonLine);
  // Assert
  expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
});

test('Should not show any tooltip when hideTooltip is true', () => {
  // Arrange
  const { container } = render(<LineChart data={basicChartPoints} hideTooltip={true} />);
  const getByClass = queryAllByAttribute.bind(null, 'class');
  // Assert
  expect(getByClass(container, /toolTipcallout/i)).toHaveLength(0);
});
});

describe('Line chart - Subcomponent xAxis Labels', () => {
  test('Should show the x-axis labels tooltip when hovered', async () => {
    // Arrange
    const { container } = render(<LineChart data={dateChartPoints} showXAxisLablesTooltip={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const xAxisLabels = getById(container, /showDots/i);
    fireEvent.mouseOver(xAxisLabels[0]);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Febr...');
  });

  test('Should show rotated x-axis labels', async () => {
    // Arrange
    const { container } = render(<LineChart data={dateChartPoints} rotateXAxisLables={true} />);
    await new Promise(resolve => setTimeout(resolve));
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

  test('Should remain unchanged on zoom in', () => {
    // Arrange
    const { container } = render(<LineChart data={basicChartPoints} width={300} height={300} />);
    global.innerWidth = window.innerWidth / 2;
    global.innerHeight = window.innerHeight / 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    // Assert
    expect(container).toMatchSnapshot();
  });

  test('Should remain unchanged on zoom out', () => {
    // Arrange
    const { container } = render(<LineChart data={basicChartPoints} width={300} height={300} />);
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


