import * as React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { emptyChartPoints } from './GroupedVerticalBarChart.test';
import { GroupedVerticalBarChart } from './index';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { IVSChartDataPoint } from '../../index';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';

const chartDataWithNumaricXAxis = [
  {
    name: '2000',
    series: [
      {
        key: 'series1',
        data: 66,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.accent,
        legend: 'MetaData1',
      },
      {
        key: 'series2',
        data: 13,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.blueMid,
        legend: 'MetaData2',
      },
      {
        key: 'series3',
        data: 34,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.blueLight,
        legend: 'MetaData3',
      },
    ],
  },
  {
    name: '2010',
    series: [
      {
        key: 'series1',
        data: 14,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.accent,
        legend: 'MetaData1',
      },
      {
        key: 'series2',
        data: 90,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.blueMid,
        legend: 'MetaData2',
      },
      {
        key: 'series3',
        data: 33,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.blueLight,
        legend: 'MetaData3',
      },
    ],
  },
  {
    name: '2020',
    series: [
      {
        key: 'series1',
        data: 54,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.accent,
        legend: 'MetaData1',
      },
      {
        key: 'series2',
        data: 72,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.blueMid,
        legend: 'MetaData2',
      },
      {
        key: 'series3',
        data: 18,
        xAxisCalloutData: '2020/04/30',
        color: DefaultPalette.blueLight,
        legend: 'MetaData3',
      },
    ],
  },
];

const chartPoints = [
  {
    name: 'Metadata info multi lines text Completed',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
      {
        key: 'series2',
        data: 44000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
      },
    ],
  },
  {
    name: 'Meta Data2',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '33%',
      },
      {
        key: 'series2',
        data: 3000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '3%',
      },
    ],
  },

  {
    name: 'Single line text ',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '14%',
      },
      {
        key: 'series2',
        data: 50000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '50%',
      },
    ],
  },
];

const maxBarGap = 5;

describe('Grouped Vertical bar chart rendering', () => {
  testWithoutWait(
    'Should render the grouped vertical bar chart with numeric x-axis data',
    GroupedVerticalBarChart,
    { data: chartDataWithNumaricXAxis },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the grouped vertical bar chart with string x-axis data',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent bar', () => {
  // testWithWait(
  //   'Should render the bar with the given width',
  //   GroupedVerticalBarChart,
  //   { data: chartPoints, barwidth: 5, width: 400 },
  //   container => {
  //     // Assert
  //     const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
  //     expect(bars).toHaveLength(6);
  //     expect(bars[0].getAttribute('width')).toEqual('5');
  //     expect(bars[1].getAttribute('width')).toEqual('5');
  //     expect(bars[2].getAttribute('width')).toEqual('5');
  //   },
  // );

  testWithWait(
    'Should render the bars with the specified colors',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars[0].getAttribute('fill')).toEqual(DefaultPalette.blueLight);
      expect(bars[1].getAttribute('fill')).toEqual(DefaultPalette.blue);
      expect(bars[2].getAttribute('fill')).toEqual(DefaultPalette.blueLight);
      expect(bars[3].getAttribute('fill')).toEqual(DefaultPalette.blue);
      expect(bars[4].getAttribute('fill')).toEqual(DefaultPalette.blueLight);
      expect(bars[5].getAttribute('fill')).toEqual(DefaultPalette.blue);
    },
  );

  testWithWait(
    'Should render the bars with labels hidden',
    GroupedVerticalBarChart,
    { data: chartPoints, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );

  // testWithWait(
  //   'Should render the bar with the given bar corner radius',
  //   GroupedVerticalBarChart,
  //   { data: chartPoints, barCornerRadius: 6 },
  //   container => {
  //     // Assert
  //     const curvedBar = screen.queryByText('a 6 6');
  //     expect(curvedBar).toHaveLength(1);
  //   },
  // );

  // testWithWait(
  //   'Should render the bar with the given maximum bar gap',
  //   GroupedVerticalBarChart,
  //   { data: chartPoints, barGapMax: maxBarGap },
  //   container => {
  //     // Assert
  //     const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
  //     expect(bars).toHaveLength(6);
  //     const firstBarYvalue = Number(bars[1].getAttribute('x'));
  //     const firstBarHeight = Number(bars[1].getAttribute('width'));
  //     const secondBarYvalue = Number(bars[0].getAttribute('x'));
  //     expect(firstBarYvalue! + firstBarHeight + maxBarGap).toEqual(secondBarYvalue!);
  //   },
  // );

  // testWithWait(
  //   'Should set minimum bar height',
  //   GroupedVerticalBarChart,
  //   { data: chartPoints, barMinimumHeight: 100 },
  //   container => {
  //     // Legends have 'rect' as a part of their classname
  //     const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
  //     // Assert
  //     expect(bars[3].getAttribute('height')).toEqual('100');
  //   },
  // );
});

describe('Grouped vertical bar chart - Subcomponent Legends', () => {
  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    GroupedVerticalBarChart,
    { data: chartPoints, hideLegend: true },
    container => {
      // Assert
      // Legends have 'rect' as a part of their classname
      const legends = getByClass(container, /legend-/i);
      expect(legends).toHaveLength(0);
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other bars on mouse over a bar legend',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.mouseOver(legends[0]);
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should select legend on single mouse click on legends',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      screen.debug(container, 50000000);
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should deselect legend on double mouse click on legends',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.click(legends![0]);
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '');
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent callout', () => {
  testWithWait(
    'Should show the callout over the bar on mouse over',
    GroupedVerticalBarChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the stacked callout over the bar on mouse over',
    GroupedVerticalBarChart,
    { data: chartPoints, isCalloutForStack: true, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getByClass(container, /calloutlegendText/i)).toBeDefined();
      expect(getByClass(container, /calloutlegendText/i)).toHaveLength(2);
    },
  );

  testWithWait(
    'Should show the single callout over the bar on mouse over',
    GroupedVerticalBarChart,
    { data: chartPoints, isCalloutForStack: false, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getByClass(container, /calloutlegendText/i)).toBeDefined();
      expect(getByClass(container, /calloutlegendText/i)).toHaveLength(1);
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    GroupedVerticalBarChart,
    {
      data: chartPoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Grouped Vertical Bar chart rendering', () => {
  test('Should re-render the Grouped Vertical Bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<GroupedVerticalBarChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_GVBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<GroupedVerticalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_GVBC_empty/i)).toHaveLength(0);
    });
  });
});

describe('Grouped vertical bar chart - Subcomponent xAxis Labels', () => {
  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    GroupedVerticalBarChart,
    { data: chartPoints, showXAxisLablesTooltip: true },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /showDots/i)).toHaveLength(3);
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Meta...');
    },
  );

  testWithWait(
    'Should show rotated x-axis labels',
    GroupedVerticalBarChart,
    { data: chartPoints, rotateXAxisLables: true },
    container => {
      // Assert
      expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('rotate(-45)');
    },
  );
});

describe('Grouped vertical bar chart - Screen resolution', () => {
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
    GroupedVerticalBarChart,
    { data: chartPoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
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
    GroupedVerticalBarChart,
    { data: chartPoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
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

describe('Vertical stacked bar chart - Theme', () => {
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <GroupedVerticalBarChart culture={window.navigator.language} data={chartPoints} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
