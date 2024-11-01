/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  getByClass,
  getById,
  testScreenResolutionChanges,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility.test';
import { MultiStackedBarChart } from './MultiStackedBarChart';
import { IChartDataPoint, IChartProps, IMultiStackedBarChartProps } from './index';
import { DefaultPalette, ThemeProvider, resetIds } from '@fluentui/react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { MultiStackedBarChartBase } from './MultiStackedBarChart.base';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

function sharedBeforeEach() {
  resetIds();
}

const firstChartPoints: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: DefaultPalette.red,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 23,
    color: DefaultPalette.green,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '23%',
  },
  {
    legend: 'Social security numbers',
    data: -35,
    color: DefaultPalette.yellow,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '35%',
  },
  {
    legend: 'Credit card numbers',
    data: 87,
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
  {
    legend: 'Tax identification numbers (USA)',
    data: 420,
    color: DefaultPalette.black,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
];
const firstChartPoints1: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 140,
    color: DefaultPalette.red,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 56,
    color: DefaultPalette.green,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '56%',
  },
  {
    legend: 'Social security numbers',
    data: 35,
    color: DefaultPalette.yellow,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '35%',
  },
  {
    legend: 'Credit card numbers',
    data: 92,
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '92%',
  },
  {
    legend: 'Tax identification numbers (USA)',
    data: 87,
    color: DefaultPalette.black,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
];

const secondChartPoints: IChartDataPoint[] = [
  {
    legend: 'Phone Numbers',
    data: 40,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
  {
    legend: 'Credit card Numbers',
    data: 23,
    color: DefaultPalette.green,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
];

const singleChartPoint: IChartDataPoint[] = [
  {
    legend: 'Phone Numbers',
    data: 40,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
    placeHolder: true,
  },
];

const data: IChartProps[] = [
  {
    chartTitle: 'Monitored',
    chartData: firstChartPoints,
  },
  {
    chartTitle: 'Monitored Second Chart',
    chartData: firstChartPoints1,
  },
  {
    chartTitle: 'Unmonitored',
    chartData: secondChartPoints,
  },
];

const oneDataPoint: IChartProps[] = [
  {
    chartTitle: 'Single Chart Point with placeholder',
    chartData: singleChartPoint,
  },
];

describe('Multi Stacked bar chart rendering', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should render the Multi Stacked bar chart with non-empty data',
    MultiStackedBarChart,
    { data },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Multi Stacked bar chart - Subcomponent bar', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should render the multi stacked bar with the given bar height',
    MultiStackedBarChart,
    { data, barHeight: 5 },
    container => {
      // Assert
      expect(getById(container, /_MSBC_bar/i)).toHaveLength(data.length);
      expect(getById(container, /_MSBC_rect/i)[0].getAttribute('height')).toEqual('5');
    },
  );

  testWithWait(
    'Should render the multi stacked bar with the given variant part-to-whole',
    MultiStackedBarChart,
    { data, variant: 'part-to-whole' },
    container => {
      const rect = getById(container, /_MSBC_rect/i);
      // Assert
      expect(getById(container, /_MSBC_bar/i)).toHaveLength(data.length);
      expect(getById(container, /_MSBC_rect/i)).toHaveLength(12);
      const rect1: number = +rect[10].getAttribute('width')!.split('%')[0];
      const rect2: number = +rect[11].getAttribute('width')!.split('%')[0];
      expect(rect1 + rect2).toEqual(100);
    },
  );

  testWithWait(
    'Should render the multi stacked bar with the given variant absolute-scale',
    MultiStackedBarChart,
    { data, variant: 'absolute-scale' },
    container => {
      const rect = getById(container, /_MSBC_rect/i);
      // Assert
      expect(getById(container, /_MSBC_bar/i)).toHaveLength(data.length);
      expect(getById(container, /_MSBC_rect/i)).toHaveLength(12);
      let longestBarTotalValue = 0;
      const totalValue: number[] = [];
      let barIndexWithHighestWidth = -1;
      data.forEach((item, index) => {
        const barTotalValue = item.chartData!.reduce((a, b) => a + b!.data!, 0);
        longestBarTotalValue = Math.max(longestBarTotalValue, barTotalValue);
        barIndexWithHighestWidth = longestBarTotalValue === barTotalValue ? index : barIndexWithHighestWidth;
        totalValue.push(barTotalValue);
      });
      const receivedWidth = rect.map(item => +item.getAttribute('width')!.split('%')[0]);
      const receivedWidthGroups: number[] = [];
      data.forEach((item, index) => {
        const groupSize = item.chartData!.length;
        receivedWidthGroups.push(
          receivedWidth.slice(index * groupSize, (index + 1) * groupSize).reduce((a, b) => a + b, 0),
        );
      });
      // The longest bar should have 100% width
      expect(receivedWidthGroups[barIndexWithHighestWidth]).toEqual(100);
      // Any other bar should have less than 100% width
      receivedWidthGroups.forEach((item, index) => {
        if (index !== barIndexWithHighestWidth) {
          expect(item).toBeLessThan(100);
        }
      });
    },
  );
});

describe('Multi Stacked bar chart - Subcomponent Legends', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should show any rendered legends when hideLegend is not set',
    MultiStackedBarChart,
    { data },
    container => {
      // Arrange
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      // Assert
      expect(legends).toHaveLength(5);
    },
  );

  testWithWait(
    'Should not show any legends when a datapoint is marked as placeholder',
    MultiStackedBarChart,
    { data: oneDataPoint },
    container => {
      // Assert
      expect(screen.queryAllByText('Phone Numbers')).toHaveLength(0);
    },
  );

  test('Should reduce the opacity of the other bars and their legends on mouse over a bar legend', async () => {
    // Arrange
    const { container } = render(<MultiStackedBarChart data={data} />);
    const bars = getById(container, /_MSBC_bar/i);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(bars).toHaveLength(data.length);
    expect(legends).toHaveLength(5);
    // Act
    fireEvent.mouseOver(screen.getByText('Debit card numbers (EU and USA)'));
    await waitFor(() => {
      // Assert
      expect(screen.getByText('Passport numbers (USA)')).toHaveStyle('opacity: 0.67');
      expect(getByClass(container, /opacityChangeOnHover/i)).toHaveLength(12);
      expect(getByClass(container, /opacityChangeOnHover/i)[1]).toHaveStyle('opacity: 0.1');
    });
  });

  test('Should change the opacity of the other bars and their legends on mouse out from a bar legend', async () => {
    // Arrange
    const { container } = render(<MultiStackedBarChart data={data} />);
    const bars = getById(container, /_MSBC_bar/i);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(bars).toHaveLength(data.length);
    expect(legends).toHaveLength(5);
    // Act
    fireEvent.mouseOut(screen.getByText('Debit card numbers (EU and USA)'));
    await waitFor(() => {
      // Assert
      expect(screen.getByText('Passport numbers (USA)')).not.toHaveAttribute('opacity');
      expect(getByClass(container, /opacityChangeOnHover/i)).toHaveLength(12);
      expect(getByClass(container, /opacityChangeOnHover/i)[1]).not.toHaveAttribute('opacity');
    });
  });

  test('Should reduce the opacity of the other bars and their legends on mouse click a bar legend', async () => {
    // Arrange
    const { container } = render(<MultiStackedBarChart data={data} />);
    const bars = getById(container, /_MSBC_bar/i);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(bars).toHaveLength(data.length);
    expect(legends).toHaveLength(5);
    // Act
    fireEvent.click(screen.getByText('Debit card numbers (EU and USA)'));
    await waitFor(() => {
      // Assert
      expect(screen.getByText('Passport numbers (USA)')).toHaveStyle('opacity: 0.67');
      expect(getByClass(container, /opacityChangeOnHover/i)).toHaveLength(12);
      expect(getByClass(container, /opacityChangeOnHover/i)[1]).toHaveStyle('opacity: 0.1');
    });
  });
});

describe('Multi Stacked bar chart - Subcomponent callout', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should call the handler on mouse over bar',
    MultiStackedBarChart,
    { data, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const handleMouseOver = jest.spyOn(MultiStackedBarChartBase.prototype as any, '_onBarHover');
      const rect = getById(container, /_MSBC_rect/i);
      // Assert
      expect(rect).toHaveLength(12);
      // Act
      fireEvent.mouseOver(rect[0]);
      // Assert
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );

  testWithWait(
    'Should show the callout on mouse over bar',
    MultiStackedBarChart,
    { data, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = getById(container, /_MSBC_bar/i);
      // Assert
      expect(getById(container, /_MSBC_bar/i)).toHaveLength(data.length);
      // Act
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getByClass(container, /callout/i)).toBeDefined();
      expect(getByClass(container, /callout/i)[0].getAttribute('opacity')).toBeNull();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    MultiStackedBarChart,
    {
      data,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IMultiStackedBarChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      // Arrange
      const bars = getById(container, /_MSBC_bar/i);
      // Assert
      expect(bars).toHaveLength(data.length);
      // Act
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /callout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Screen resolution', () => {
  beforeEach(sharedBeforeEach);

  testScreenResolutionChanges(() => {
    // Arrange
    const { container } = render(<MultiStackedBarChart data={data} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Multi Stacked bar chart - Theme', () => {
  beforeEach(sharedBeforeEach);

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <MultiStackedBarChart culture={window.navigator.language} data={data} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Multi Stacked Bar Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<MultiStackedBarChart data={data} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
