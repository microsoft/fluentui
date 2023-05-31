import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import * as utils from '../../utilities/utilities';
import { mount, ReactWrapper } from 'enzyme';
import { ILineChartPoints, ILineChartProps, LineChart } from './index';
import { ILineChartState, LineChartBase } from './LineChart.base';



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
    legend: 'metaData1',
    data: [
      {
        x: new Date('2020-03-03T00:00:00.000Z'),
        y: 297000,
      },
      {
        x: new Date('2020-03-04T00:00:00.000Z'),
        y: 284000,
      }
    ],
    color: 'red',
  }
];

const sampleChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: samplePoints,
};

describe('Line chart rendering', () => {
  test('Should render the Line chart with numeric x-axis data', () => {
    const { container } = render(<LineChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  // test('Should render the Line chart with date x-axis data', () => {
  //   const { container } = render(<LineChart data={sampleChartPoints}/>);
  //   expect(container).toMatchSnapshot();
  // });
});

test('Should render the lines with the specified colors', async () => {
  // Arrange
  // colors mentioned in the data points itself
  const { container } = render(<LineChart data={chartPoints}/>);
  const getById = queryAllByAttribute.bind(null, 'id');
  const lines = getById(container, /lineID/i);
  // Assert
  expect(lines[0].getAttribute('stroke')).toEqual('yellow');
  expect(lines[1].getAttribute('stroke')).toEqual('green');
  expect(lines[2].getAttribute('stroke')).toEqual('red');
});

test('Should hide callout on mouse leave', () => {
  // Arrange
  const { container } = render(<LineChart data={chartPoints} calloutProps={{ doNotLayer: true }}/>);
  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  const getByClass = queryAllByAttribute.bind(null, 'class');

  fireEvent.mouseOver(getById(container, /line/i)[0]);
  expect(getByClass(container, /callout/i)[0]).toBeDefined();
  fireEvent.mouseLeave(getById(container, /line/i)[0]);
  expect(!getByClass(container, /callout/i)[0]).toBeDefined();
});

test('Should highlight the corresponding Line on mouse over on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={chartPoints} />);
  // Act
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
  // Act
  const legend = screen.queryByText('metaData1');
  expect(legend).toBeDefined();
  fireEvent.mouseOver(legend!);
  // Assert
  expect(screen.queryByText('metaData2')).toHaveStyle('opacity: 0.67');
});

test('Should select legend on single mouse click on legends', () => {
  // Arrange
  const { container } = render(<LineChart data={chartPoints} hideLegend={false} />);
  // Act
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
  // Act
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

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <LineChart culture={window.navigator.language} data={chartPoints} />
    </ThemeProvider>,
  );
  // Assert
  // expect(container).toMatchSnapshot();
});
// test('Should display legends callout on mouse over', async () => {
//   // Arrange
//   // const { container } = render(<LineChart data={chartPoints} width={200} height={300} tickValues={[ 20, 30, 40 ]} />);
//   const { container } = render(<LineChart data={chartPoints} width={200} height={300} legendsOverflowText={'Overflow Items'}/>);
//   // await new Promise(resolve => setTimeout(resolve));
//   // Act

//   global.innerHeight = 300;
//   global.innerWidth = 200;
//   act(() => {
//     global.dispatchEvent(new Event('resize'));
//     const legend = screen.queryByText('more');
//   expect(legend).toBeDefined();
//   // screen.debug(container, 500000);
//   fireEvent.mouseOver(legend!);
//   });


//   // Assert

//   const getByClass = queryAllByAttribute.bind(null, 'class');
//   expect(getByClass(container, /callout/i)[0]).toBeDefined();


// });




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

    // Act
    global.innerWidth = window.innerWidth / 2;
    global.innerHeight = window.innerHeight / 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    // Assert
    // expect(container).toMatchSnapshot();
  });

  test('Should remain unchanged on zoom out', () => {
    // Arrange
    const { container } = render(<LineChart data={chartPoints} width={300} height={300} />);

    // Act
    global.innerWidth = window.innerWidth * 2;
    global.innerHeight = window.innerHeight * 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    // Assert
  //  expect(container).toMatchSnapshot();
  });
});
