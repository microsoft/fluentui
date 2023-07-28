import { render, screen, queryAllByAttribute, fireEvent, act, waitFor } from '@testing-library/react';
import { chartPoints } from './DonutChart.test';
import { DonutChart, IChartProps } from './index';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import * as utils from '../../utilities/utilities';

export const emptyChartPoints: IChartProps = {
  chartTitle: 'Donut chart',
  chartData: [],
};

test('Should hide callout on mouse leave', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.mouseOver(getById(container, /Pie/i)[0]);
  expect(getById(container, /callout/i)[0]).toBeDefined();
  fireEvent.mouseLeave(getById(container, /Pie/i)[0]);

  // Assert
  expect(getById(container, /callout/i)[0]).toHaveStyle('opacity: 0');
  expect(container).toMatchSnapshot();
});

test('Should show callout on focus', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.focus(getById(container, /Pie/i)[0]);

  // Assert
  expect(getById(container, /focusRing/i)).toBeDefined();
});

test('Should remove focus on blur', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.blur(getById(container, /Pie/i)[0]);

  // Assert
  const value = getById(container, /Pie/i)[0].getAttribute('id');
  expect(value).not.toContain('focusRing');
});

test('Should highlight the corresponding Pie on mouse over on legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  expect(legend).toBeDefined();
  fireEvent.mouseOver(legend!);

  // Assert
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  expect(getById(container, /Pie.*?third/i)[0]).toHaveAttribute('opacity', '0.1');
});

test('Should select legend on single mouse click on legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  expect(legend).toBeDefined();
  fireEvent.click(legend!);

  // Assert
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  const firstLegend = screen.queryByText('first')?.closest('button');
  expect(firstLegend).toHaveAttribute('aria-selected', 'true');
  expect(firstLegend).toHaveAttribute('tabIndex', '0');
});

test('Should deselect legend on double mouse click on legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  expect(legend).toBeDefined();

  //single click on first legend
  fireEvent.click(legend!);
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  const firstLegend = screen.queryByText('first')?.closest('button');
  expect(firstLegend).toHaveAttribute('aria-selected', 'true');
  expect(firstLegend).toHaveAttribute('tabIndex', '0');
  // double click on same first legend
  fireEvent.click(legend!);

  // Assert
  expect(firstLegend).toHaveAttribute('aria-selected', 'false');
});

test('Should show Pies with same opacity on mouse out of legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  expect(legend).toBeDefined();
  fireEvent.mouseOver(legend!);
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  fireEvent.mouseOut(legend!);

  // Assert
  expect(getById(container, /Pie.*?first/i)[0]).toHaveAttribute('opacity', '1');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '1');
});

test('Should display correct callout data on mouse move', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.mouseOver(getById(container, /Pie/i)[0]);
  expect(getById(container, /callout/i)[0]).toHaveTextContent('20,000');
  fireEvent.mouseLeave(getById(container, /Pie/i)[0]);
  fireEvent.mouseOver(getById(container, /Pie/i)[1]);

  // Assert
  expect(getById(container, /callout/i)[0]).toHaveTextContent('39,000');
});

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <DonutChart culture={window.navigator.language} data={chartPoints} innerRadius={55} />
    </ThemeProvider>,
  );

  // Assert
  expect(container).toMatchSnapshot();
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
    const { container } = render(<DonutChart data={chartPoints} innerRadius={55} width={300} height={300} />);

    // Act
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
    const { container } = render(<DonutChart data={chartPoints} innerRadius={55} width={300} height={300} />);

    // Act
    global.innerWidth = window.innerWidth * 2;
    global.innerHeight = window.innerHeight * 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    // Assert
    expect(container).toMatchSnapshot();
  });
});

test('Should change value inside donut with the legend value on mouseOver legend ', () => {
  // Mock the implementation of wrapTextInsideDonut as it internally calls a Browser Function like
  // getComputedTextLength() which will otherwise lead to a crash if mounted
  jest.spyOn(utils, 'wrapTextInsideDonut').mockImplementation(() => '1000');
  // Arrange
  const { container } = render(
    <DonutChart data={chartPoints} innerRadius={55} hideLegend={false} valueInsideDonut={1000} />,
  );
  const getByClass = queryAllByAttribute.bind(null, 'class');

  // Act
  fireEvent.mouseOver(screen.getByText('first'));

  // Assert
  expect(getByClass(container, /insideDonutString.*?/)[0].textContent).toBe('20,000');
});

describe('Donut chart rendering empty/non-empty scenario', () => {
  test('Should re-render the Donut chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<DonutChart data={emptyChartPoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    // Act
    rerender(<DonutChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
    });
  });
});
