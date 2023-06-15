import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import { ILineChartPoints, LineChart } from './index';
import { LineChartBase } from './LineChart.base';

const points: ILineChartPoints[] = [
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

const chartPoints = {
  chartTitle: 'LineChart',
  lineChartData: points,
};


const samplePoints: ILineChartPoints[] = [
    {
      data: [
        { x: new Date('2018/01/01'), y: 30 },
        { x: new Date('2018/02/01'), y: 50 },
        { x: new Date('2018/03/01'), y: 30 },
        { x: new Date('2018/04/01'), y: 50 },
        { x: new Date('2018/05/01'), y: 30 },
        { x: new Date('2018/06/01'), y: 50 },
      ],
      legend: 'First',
      lineOptions: {
        lineBorderWidth: '4',
      },
    }
  ];

const sampleChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: samplePoints,
};

describe('Line chart rendering', () => {
  test('Should render the Line chart with numeric x-axis data', () => {
    const { container } = render(<LineChart data={chartPoints}/>);
    expect(container).toMatchSnapshot();
  });

  test('Should render the Line chart with date x-axis data', () => {
    const { container } = render(<LineChart data={sampleChartPoints}/>);
    expect(container).toMatchSnapshot();
  });
});

describe('Line chart - Subcomponent line', () => {
  test('Should render the lines with the specified colors', async () => {
    // Arrange
    const { container } = render(<LineChart data={chartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    const lines = getById(container, /lineID/i);
    // Assert
    expect(lines[0].getAttribute('stroke')).toEqual('yellow');
    expect(lines[1].getAttribute('stroke')).toEqual('green');
    expect(lines[2].getAttribute('stroke')).toEqual('red');
  });
});

describe('Line chart - Subcomponent legend', () => {
test('Should highlight the corresponding Line on mouse over on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={chartPoints} />);
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
  const { container } = render(<LineChart data={chartPoints} />);
  const legend = screen.queryByText('metaData1');
  expect(legend).toBeDefined();
  fireEvent.mouseOver(legend!);
  // Assert
  expect(screen.queryByText('metaData2')).toHaveStyle('opacity: 0.67');
});

test('Should select legend on single mouse click on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={chartPoints} hideLegend={false} />);
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
  const { container } = render(<LineChart data={chartPoints} hideLegend={false} />);
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
  const { container } = render(<LineChart data={chartPoints} />);
  const getById = queryAllByAttribute.bind(null, 'id');
  const firstPointonLine = getById(container, /lineID/)[0];
  expect(firstPointonLine).toBeDefined();
  fireEvent.mouseOver(firstPointonLine);
  // Assert
  expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
});

test('Should not show any tooltip when hideTooltip is true', () => {
  // Arrange
  const { container } = render(<LineChart data={chartPoints} hideTooltip={true} />);
  const getByClass = queryAllByAttribute.bind(null, 'class');
  // Assert
  expect(getByClass(container, /toolTipcallout/i)).toHaveLength(0);
});
});

describe('Line chart - Subcomponent xAxis Labels', () => {
  test('Should show the x-axis labels tooltip when hovered', async () => {
    // Arrange
    const { container } = render(<LineChart data={sampleChartPoints} showXAxisLablesTooltip={true} />);
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
    const { container } = render(<LineChart data={sampleChartPoints} rotateXAxisLables={true} />);
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
    const { container } = render(<LineChart data={chartPoints} width={300} height={300} />);
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
    const { container } = render(<LineChart data={chartPoints} width={300} height={300} />);
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
      <LineChart culture={window.navigator.language} data={chartPoints} />
    </ThemeProvider>,
  );
  // Assert
  expect(container).toMatchSnapshot();
});
