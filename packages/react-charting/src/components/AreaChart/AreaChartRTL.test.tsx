import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import { AreaChart, IEventsAnnotationProps, ILineChartPoints, LineChart } from './index';
import { LineChartBase } from './AreaChart.base';
import { DefaultPalette, mergeStyles } from '@fluentui/react/lib/Styling';


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
    x: new Date('2018/01/06'),
    y: 5,
  },
  {
    x: new Date('2018/01/08'),
    y: 16,
  },
  {
    x: new Date('2018/01/16'),
    y: 6,
  },
  {
    x: new Date('2018/02/06'),
    y: 30,
  },
  {
    x: new Date('2018/02/16'),
    y: 10,
  },
];

const chart2PointsWithDate = [
  {
    x: new Date('2018/01/06'),
    y: 10,
  },
  {
    x: new Date('2018/01/08'),
    y: 33,
  },
  {
    x: new Date('2018/01/16'),
    y: 21,
  },
  {
    x: new Date('2018/02/06'),
    y: 44,
  },
  {
    x: new Date('2018/02/16'),
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
  test('Should render the area chart with numeric x-axis data', () => {
    const { container } = render(<AreaChart data={chartData} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render the area chart with date x-axis data', () => {
    const { container } = render(<AreaChart data={chartDataWithDates} />);
    expect(container).toMatchSnapshot();
  });
});

describe('Area chart - Subcomponent Area', () => {
  test('Should render the Areas with the specified colors', async () => {
    // Arrange
    const { container } = render(<AreaChart data={chartData} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    const areas = getById(container, /graph-areaChart/i);
    // Assert
    expect(areas[0].getAttribute('fill')).toEqual('green');
    expect(areas[1].getAttribute('fill')).toEqual('yellow');
    expect(areas[2].getAttribute('fill')).toEqual('blue');
  });
});

describe('Area chart - Subcomponent legend', () => {
  test('Should highlight the corresponding Area on mouse over on legends', () => {
    // Arrange
    const { container } = render(<AreaChart data={chartData} />);
    const legend = screen.queryByText('legend1');
    expect(legend).toBeDefined();
    fireEvent.mouseOver(legend!);
    // Assert
    const getById = queryAllByAttribute.bind(null, 'id');
    const areas = getById(container, /graph-areaChart/i);
    expect(areas[0].getAttribute('fill-opacity')).toEqual('0.7');
    expect(areas[1].getAttribute('fill-opacity')).toEqual('0.1');
    expect(areas[2].getAttribute('fill-opacity')).toEqual('0.1');
  });

  test('Should reduce opacity of the other lines in Area chat and opacity should be zero for selected Area', () => {
    // Arrange
    const { container } = render(<AreaChart data={chartData} />);
    const legend = screen.queryByText('legend1');
    expect(legend).toBeDefined();
    fireEvent.mouseOver(legend!);
    // Assert
    const getById = queryAllByAttribute.bind(null, 'id');
    const areaLines = getById(container, /line-areaChart/i);
    expect(areaLines[0].getAttribute('opacity')).toEqual('0');
    expect(areaLines[1].getAttribute('opacity')).toEqual('0.1');
    expect(areaLines[2].getAttribute('opacity')).toEqual('0.1');
  });

  test('Should highlight the corresponding Legend on mouse over on legends', () => {
    // Arrange
    const { container } = render(<AreaChart data={chartData} />);
    const legend1 = screen.queryByText('legend1');
    expect(legend1).toBeDefined();
    fireEvent.mouseOver(legend1!);
    // Assert
    expect(screen.queryByText('legend2')).toHaveStyle('opacity: 0.67');
  });

  test('Should select legend on single mouse click on legends', () => {
    // Arrange
    const { container } = render(<AreaChart data={chartData} hideLegend={false} />);
    const legend = screen.queryByText('legend1');
    expect(legend).toBeDefined();
    fireEvent.click(legend!);
    // Assert
    const getById = queryAllByAttribute.bind(null, 'id');
    expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.1');
    const firstLegend = screen.queryByText('legend1')?.closest('button');
    expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    expect(firstLegend).toHaveAttribute('tabIndex', '0');
  });


  test('Should deselect legend on double mouse click on legends', () => {
    // Arrange
    const { container } = render(<AreaChart data={chartData} hideLegend={false} />);
    const legend = screen.queryByText('legend1');
    expect(legend).toBeDefined();

    //single click on first legend
    fireEvent.click(legend!);
    const getById = queryAllByAttribute.bind(null, 'id');
    expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.1');
    const firstLegend = screen.queryByText('legend1')?.closest('button');
    expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    expect(firstLegend).toHaveAttribute('tabIndex', '0');
    // double click on same first legend
    fireEvent.click(legend!);
    // Assert
    expect(firstLegend).toHaveAttribute('aria-selected', 'false');
  });
});


describe('Area chart - Subcomponent xAxis Labels', () => {
  test('Should show the x-axis labels tooltip when hovered', async () => {
    // Arrange
    const { container } = render(<AreaChart data={chartDataWithDates} showXAxisLablesTooltip={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const xAxisLabels = getById(container, /showDots/i);
    fireEvent.mouseOver(xAxisLabels[0]);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Jan ...');
  });

  test('Should show rotated x-axis labels', async () => {
    // Arrange
    const { container } = render(<AreaChart data={chartDataWithDates} rotateXAxisLables={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const getByClass = queryAllByAttribute.bind(null, 'class');
    expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('translate(39.03658536585366,0)');
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
    const { container } = render(<AreaChart data={chartData} width={300} height={300} />);
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
    const { container } = render(<AreaChart data={chartData} width={300} height={300} />);
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
      <AreaChart culture={window.navigator.language} data={chartData} />
    </ThemeProvider>,
  );
  // Assert
  expect(container).toMatchSnapshot();
});
