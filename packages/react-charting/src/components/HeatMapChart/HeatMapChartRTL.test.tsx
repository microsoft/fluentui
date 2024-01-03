import * as React from 'react';
import { queryAllByAttribute, render, waitFor, screen, fireEvent } from '@testing-library/react';
import { HeatMapChart, IHeatMapChartProps } from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const stringPoints: string[] = ['p1', 'p2', 'p3', 'p4'];
const numericPoints: number[] = [10, 20, 30, 40];
const datePoints: Date[] = [new Date('2020-03-01'), new Date('2020-03-02')];

export const HeatMapData: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: datePoints[0],
        y: stringPoints[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: datePoints[1],
        y: stringPoints[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
        off and people of alaska are hoping for more of this days`,
      },
    ],
  },
  {
    value: 200,
    legend: 'Nasty',
    data: [
      {
        x: datePoints[0],
        y: stringPoints[1],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: datePoints[1],
        y: stringPoints[0],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
      off and people of alaska are hoping for more of this days`,
      },
    ],
  },
];
const HeatMapData2: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Excellent',
    data: [
      {
        x: stringPoints[3],
        y: stringPoints[1],
        value: 100,
        rectText: 100,
      },
      {
        x: stringPoints[2],
        y: stringPoints[0],
        value: 75,
        rectText: 75,
      },
    ],
  },
  {
    value: 200,
    legend: 'Nasty',
    data: [
      {
        x: stringPoints[3],
        y: stringPoints[0],
        value: 50,
        rectText: 50,
      },
      {
        x: stringPoints[2],
        y: stringPoints[1],
        value: 25,
        rectText: 25,
      },
    ],
  },
];
const HeatMapData3: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Excellent',
    data: [
      {
        x: numericPoints[2],
        y: numericPoints[1],
        value: 75,
        callOutAccessibilityData: { ariaLabel: 'Lorem ipsum dolor sit amet' },
      },
      {
        x: numericPoints[3],
        y: numericPoints[0],
        value: 100,
        callOutAccessibilityData: { ariaLabel: 'consectetur adipiscing elit' },
      },
    ],
  },
  {
    value: 200,
    legend: 'Nasty',
    data: [
      {
        x: numericPoints[2],
        y: numericPoints[0],
        value: 50,
        callOutAccessibilityData: { ariaLabel: 'sed do eiusmod tempor incididunt' },
      },
      {
        x: numericPoints[3],
        y: numericPoints[1],
        value: 25,
        callOutAccessibilityData: { ariaLabel: 'ut labore et dolore magna aliqua' },
      },
    ],
  },
];

describe('HeatMap chart rendering', () => {
  test('Should re-render the HeatMap chart with data', async () => {
    // Arrange
    const { container, rerender } = render(
      <HeatMapChart
        data={[]}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_HeatMap_empty/i)).toHaveLength(1);
    // Act
    rerender(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_HeatMap_empty/i)).toHaveLength(0);
    });
  });
});

describe('Heat Map Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const axeResults = await axe(container);
    expect(axeResults).toHaveNoViolations();
  }, 10000);
});

describe('HeatMapChart interaction and accessibility tests', () => {
  it(`should highlight the corresponding rectangle(s) when the mouse moves over a legend and
  unhighlight them when the mouse moves out of the legend`, () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData2}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );

    const legend = screen.getByText(HeatMapData2[0].legend);

    fireEvent.mouseOver(legend);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="1"]')).toHaveLength(2);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="0.1"]')).toHaveLength(2);

    fireEvent.mouseOut(legend);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="1"]')).toHaveLength(4);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="0.1"]')).toHaveLength(0);
  });

  it(`should highlight the corresponding rectangle(s) when a legend is clicked and
  unhighlight them when the legend is clicked again`, () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData2}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );

    const legend = screen.getByText(HeatMapData2[1].legend);

    fireEvent.click(legend);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="1"]')).toHaveLength(2);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="0.1"]')).toHaveLength(2);

    fireEvent.click(legend);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="1"]')).toHaveLength(4);
    expect(container.querySelectorAll('g[role="img"][fill-opacity="0.1"]')).toHaveLength(0);
  });

  it(`should show a callout when a highlighted rectangle is hovered/focused and
  hide it when an unhighlighted rectangle is hovered/focused`, () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData2}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
        calloutProps={{ doNotLayer: true }}
      />,
    );

    fireEvent.click(screen.getByText(HeatMapData2[0].legend));

    for (let i = 0; i < HeatMapData2[0].data.length; i++) {
      const rect = screen.getByText(HeatMapData2[0].data[i].rectText!);

      fireEvent.mouseOver(rect);
      expect(container.querySelector('.ms-Callout')).not.toBeNull();

      fireEvent.focus(rect);
      expect(container.querySelector('.ms-Callout')).not.toBeNull();
    }
    for (let i = 0; i < HeatMapData2[1].data.length; i++) {
      const rect = screen.getByText(HeatMapData2[1].data[i].rectText!);

      fireEvent.mouseOver(rect);
      expect(container.querySelector('.ms-Callout')).toBeNull();

      fireEvent.focus(rect);
      expect(container.querySelector('.ms-Callout')).toBeNull();
    }
  });
});

describe('HeatMapChart snapshot tests', () => {
  it('should render HeatMapChart correctly with custom string formatter functions', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData2}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
        xAxisStringFormatter={value => `xPoint ${value}`}
        yAxisStringFormatter={value => `yPoint ${value}`}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render HeatMapChart correctly with numeric datapoints', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData3}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
