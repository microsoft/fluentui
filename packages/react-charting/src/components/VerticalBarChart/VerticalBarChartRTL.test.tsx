/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { act, render, screen, queryAllByAttribute, fireEvent } from '@testing-library/react';
import { chartPoints } from './VerticalBarChart.test';
import { DefaultPalette } from '@fluentui/react';
import { VerticalBarChart } from './VerticalBarChart';
import { VerticalBarChartBase } from './VerticalBarChart.base';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';

const pointsWithLine = [
  {
    x: 0,
    y: 10000,
    legend: 'Oranges',
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
    lineData: {
      y: 7000,
      yAxisCalloutData: '34%',
    },
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Dogs',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
    lineData: {
      y: 30000,
    },
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
    lineData: {
      y: 3000,
      yAxisCalloutData: '43%',
    },
  },
  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
  {
    x: 52000,
    y: 43000,
    legend: 'Giraffes',
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '71%',
    lineData: {
      y: 30000,
    },
  },
  {
    x: 68000,
    y: 30000,
    legend: 'Cats',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
    lineData: {
      y: 5000,
    },
  },
  {
    x: 80000,
    y: 20000,
    legend: 'Elephants',
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
    lineData: {
      y: 16000,
    },
  },
  {
    x: 92000,
    y: 45000,
    legend: 'Monkeys',
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '33%',
    lineData: {
      y: 40000,
      yAxisCalloutData: '45%',
    },
  },
];

const simplePoints = [
  {
    x: 'This is a medium long label. ',
    y: 3500,
    color: '#627CEF',
  },
  {
    x: 'This is a long label This is a long label',
    y: 2500,
    color: '#C19C00',
  },
  {
    x: 'This label is as long as the previous one',
    y: 1900,
    color: '#E650AF',
  },
  {
    x: 'A short label',
    y: 2800,
    color: '#0E7878',
  },
];

describe('Vertical bar chart rendering', () => {
  test('Should render the vertical bar chart with numeric x-axis data', () => {
    const { container } = render(<VerticalBarChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render the vertical bar chart with string x-axis data', () => {
    const { container } = render(<VerticalBarChart data={simplePoints} />);
    expect(container).toMatchSnapshot();
  });
});

describe('Vertical bar chart - Subcomponent bar', () => {
  test('Should render the bar with the given width', async () => {
    // Arrange
    render(<VerticalBarChart data={chartPoints} barWidth={100} />);
    await new Promise(resolve => setTimeout(resolve));
    const bar = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect')[1];

    // Assert
    expect(bar.getAttribute('width')).toEqual('100');
  });
  test('Should render the bars with the specified colors', async () => {
    // Arrange
    // colors mentioned in the data points itself
    render(<VerticalBarChart data={chartPoints} />);
    await new Promise(resolve => setTimeout(resolve));
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');

    // Assert
    expect(bars[0].getAttribute('fill')).toEqual('#0078d4');
    expect(bars[1].getAttribute('fill')).toEqual('#002050');
    expect(bars[2].getAttribute('fill')).toEqual('#00188f');
  });
  test('Should render the bars with the a single color', async () => {
    // Arrange
    render(<VerticalBarChart data={chartPoints} useSingleColor={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');

    // Assert
    expect(bars[0].getAttribute('fill')).toEqual('#00bcf2');
    expect(bars[1].getAttribute('fill')).toEqual('#00bcf2');
    expect(bars[2].getAttribute('fill')).toEqual('#00bcf2');
  });
  test('Should render the bars with labels hidden', async () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={chartPoints} hideLabels={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const getByClass = queryAllByAttribute.bind(null, 'class');

    // Assert
    expect(getByClass(container, /barLabel/i)).toHaveLength(0);
  });
});

describe('Vertical bar chart - Subcomponent line', () => {
  test('Should render line along with bars', () => {
    // Arrange
    render(<VerticalBarChart data={pointsWithLine} />);
    const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');

    // Assert
    expect(line).not.toHaveLength(0);
  });
  test('Should highlight the data points and render the corresponding callout', () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={pointsWithLine} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    const firstPointonLine = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle')[0];
    expect(firstPointonLine).toBeDefined();
    fireEvent.mouseOver(firstPointonLine);
    // Assert
    expect(firstPointonLine.getAttribute('visibility')).toEqual('visibility');
    expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
  });
});

describe('Vertical bar chart - Subcomponent Legends', () => {
  test('Should not show any rendered legends when hideLegend is true', () => {
    const { container } = render(<VerticalBarChart data={pointsWithLine} hideLegend={true} />);
    const getByClass = queryAllByAttribute.bind(null, 'class');
    expect(getByClass(container, /rect/i)).toHaveLength(0);
  });
  test('Should reduce the opacity of the other bars/lines and their legends on mouse over a line legend', async () => {
    render(<VerticalBarChart data={pointsWithLine} lineLegendText={'just line'} />);
    fireEvent.mouseOver(screen.getByText('just line'));
    await new Promise(resolve => setTimeout(resolve));
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path')[0];
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    expect(bars).toHaveLength(8);
    expect(legends).toHaveLength(9);
    expect(screen.getByText('Oranges')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Dogs')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Apples')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Bananas')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Giraffes')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Cats')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Elephants')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Monkeys')).toHaveStyle('opacity: 0.67');
    expect(line).toBeDefined();
    expect(bars[0]).toBeDefined();
    expect(bars[0]).toHaveStyle('opacity: 0.1');
    expect(bars[1]).toBeDefined();
    expect(bars[1]).toHaveStyle('opacity: 0.1');
    expect(bars[2]).toBeDefined();
    expect(bars[2]).toHaveStyle('opacity: 0.1');
    expect(bars[3]).toBeDefined();
    expect(bars[3]).toHaveStyle('opacity: 0.1');
    expect(bars[4]).toBeDefined();
    expect(bars[4]).toHaveStyle('opacity: 0.1');
    expect(bars[5]).toBeDefined();
    expect(bars[5]).toHaveStyle('opacity: 0.1');
    expect(bars[6]).toBeDefined();
    expect(bars[6]).toHaveStyle('opacity: 0.1');
    expect(bars[7]).toBeDefined();
    expect(bars[7]).toHaveStyle('opacity: 0.1');
  });
  test('Should reduce the opacity of the other bars/lines and their legends on mouse over a bar legend', async () => {
    render(<VerticalBarChart data={pointsWithLine} lineLegendText={'just line'} />);
    fireEvent.mouseOver(screen.getByText('Oranges'));
    await new Promise(resolve => setTimeout(resolve));
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path')[0];
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    expect(bars).toHaveLength(8);
    expect(legends).toHaveLength(9);
    expect(screen.getByText('just line')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Dogs')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Apples')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Bananas')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Giraffes')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Cats')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Elephants')).toHaveStyle('opacity: 0.67');
    expect(screen.getByText('Monkeys')).toHaveStyle('opacity: 0.67');
    expect(line).toBeDefined();
    expect(bars[1]).toBeDefined();
    expect(bars[1]).toHaveStyle('opacity: 0.1');
    expect(bars[2]).toBeDefined();
    expect(bars[2]).toHaveStyle('opacity: 0.1');
    expect(bars[3]).toBeDefined();
    expect(bars[3]).toHaveStyle('opacity: 0.1');
    expect(bars[4]).toBeDefined();
    expect(bars[4]).toHaveStyle('opacity: 0.1');
    expect(bars[5]).toBeDefined();
    expect(bars[5]).toHaveStyle('opacity: 0.1');
    expect(bars[6]).toBeDefined();
    expect(bars[6]).toHaveStyle('opacity: 0.1');
    expect(bars[7]).toBeDefined();
    expect(bars[7]).toHaveStyle('opacity: 0.1');
  });
});
describe('Vertical bar chart - Subcomponent callout', () => {
  test('Should call the handler on mouse over bar and on mouse leave from bar', async () => {
    // Arrange
    const handleMouseOver = jest.spyOn(VerticalBarChartBase.prototype as any, '_onBarHover');
    render(<VerticalBarChart data={pointsWithLine} calloutProps={{ doNotLayer: true }} />);
    await new Promise(resolve => setTimeout(resolve));
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    expect(bars).toHaveLength(8);
    fireEvent.mouseOver(bars[0]);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(handleMouseOver).toHaveBeenCalled();
  });

  test('Should show the callout over the bar on mouse over', async () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={pointsWithLine} calloutProps={{ doNotLayer: true }} />);
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    expect(bars).toHaveLength(8);
    fireEvent.mouseOver(bars[0]);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /toolTipcallout/i)).toBeDefined();
  });

  test('Should show the callout over the line on mouse over', async () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={pointsWithLine} calloutProps={{ doNotLayer: true }} />);
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path')[0];
    expect(line).toBeDefined();
    fireEvent.mouseOver(line);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /toolTipcallout/i)).toBeDefined();
  });

  test('Should show the custom callout over the bar on mouse over', async () => {
    // Arrange
    const { container } = render(
      <VerticalBarChart
        data={pointsWithLine}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerDataPoint={props =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    expect(bars).toHaveLength(8);
    fireEvent.mouseOver(bars[0]);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /toolTipcallout/i)).toBeDefined();
    expect(screen.queryByText('Custom Callout Content')).toBeDefined();
  });

  test('Should show the custom callout over the line on mouse over', async () => {
    // Arrange
    const { container } = render(
      <VerticalBarChart
        data={pointsWithLine}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerDataPoint={props =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path')[0];
    expect(line).toBeDefined();
    fireEvent.mouseOver(line);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /toolTipcallout/i)).toBeDefined();
    expect(screen.queryByText('Custom Callout Content')).toBeNull();
  });
});

describe('Vertical bar chart - Subcomponent xAxis Labels', () => {
  test('Should show the x-axis labels tooltip when hovered', async () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={pointsWithLine} showXAxisLablesTooltip={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const getById = queryAllByAttribute.bind(null, 'id');
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    expect(bars).toHaveLength(8);
    fireEvent.mouseOver(bars[0]);
    await new Promise(resolve => setTimeout(resolve));
    // Assert
    expect(getById(container, /showDots/i)).toHaveLength(5);
    expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('20,0...');
  });

  test('Should show rotated x-axis labels', async () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={simplePoints} rotateXAxisLables={true} />);
    await new Promise(resolve => setTimeout(resolve));
    const getByClass = queryAllByAttribute.bind(null, 'class');
    expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('rotate(-45)');
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
    const { container } = render(<VerticalBarChart data={chartPoints} width={300} height={300} />);

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
    const { container } = render(<VerticalBarChart data={chartPoints} width={300} height={300} />);

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

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <VerticalBarChart culture={window.navigator.language} data={chartPoints} />
    </ThemeProvider>,
  );

  // Assert
  expect(container).toMatchSnapshot();
});
