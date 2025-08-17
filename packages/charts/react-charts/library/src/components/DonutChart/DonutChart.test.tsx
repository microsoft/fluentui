import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChartDataPoint, ChartProps, DonutChart } from './index';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import * as utils from '../../utilities/utilities';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as renderer from 'react-test-renderer';
import { chartPointsDC, chartPointsDCElevateMinimums, pointsDC } from '../../utilities/test-data';

expect.extend(toHaveNoViolations);

const chartTitle = 'Donut chart example';
const pointsNoColors: ChartDataPoint[] = [
  { legend: 'first', data: 20000, xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, xAxisCalloutData: '2020/04/25' },
];
export const emptyChartPoints: ChartProps = {
  chartTitle,
  chartData: [],
};

export const noColorsChartPoints: ChartProps = {
  chartTitle,
  chartData: pointsNoColors,
};

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = class ResizeObserver {
    public observe() {
      // do nothing
    }
    public unobserve() {
      // do nothing
    }
    public disconnect() {
      // do nothing
    }
  };
});

describe('Donut chart interactions', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('Should hide callout on mouse leave', () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} />);
    const getByClass = queryAllByAttribute.bind(null, 'class');
    // Act
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.mouseOver(getById(container, /Pie/i)[0]);
    expect(getByClass(container, /PopoverSurface/i)[0]).toBeDefined();
    fireEvent.mouseLeave(getById(container, /Pie/i)[0]);
    // Assert
    expect(getByClass(container, /PopoverSurface/i)[0]).not.toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('Should show callout on focus', () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} />);

    // Act
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.focus(getById(container, /Pie/i)[0]);

    // Assert
    expect(getById(container, /focusRing/i)).toBeDefined();
  });

  test('Should remove focus on blur', () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} />);

    // Act
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.blur(getById(container, /Pie/i)[0]);

    // Assert
    const value = getById(container, /Pie/i)[0].getAttribute('id');
    expect(value).not.toContain('focusRing');
  });

  test('Should highlight the corresponding Pie on mouse over on legends', () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} hideLegend={false} />);

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
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} hideLegend={false} />);

    // Act
    const legend = screen.queryByText('first');
    expect(legend).toBeDefined();
    fireEvent.click(legend!);

    // Assert
    const getById = queryAllByAttribute.bind(null, 'id');
    expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
    const firstLegend = screen.queryByText('first')?.closest('button');
    expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    expect(firstLegend).toHaveAttribute(
      'style',
      '--rect-height: 12px; --rect-backgroundColor: #E5E5E5; --rect-borderColor: #E5E5E5;',
    );
  });

  test('Should deselect legend on double mouse click on legends', () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} hideLegend={false} />);

    // Act
    const legend = screen.queryByText('first');
    expect(legend).toBeDefined();

    //single click on first legend
    fireEvent.click(legend!);
    const getById = queryAllByAttribute.bind(null, 'id');
    expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
    const firstLegend = screen.queryByText('first')?.closest('button');
    expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    expect(firstLegend).toHaveAttribute(
      'style',
      '--rect-height: 12px; --rect-backgroundColor: #E5E5E5; --rect-borderColor: #E5E5E5;',
    );
    // double click on same first legend
    fireEvent.click(legend!);

    // Assert
    expect(firstLegend).toHaveAttribute('aria-selected', 'false');
  });

  test('Should show Pies with same opacity on mouse out of legends', () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} hideLegend={false} />);

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

  test('Should display correct callout data on mouse move', async () => {
    // Arrange
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} />);
    const getByClass = queryAllByAttribute.bind(null, 'class');
    // Act
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.mouseOver(getById(container, /Pie/i)[0]);
    expect(getByClass(container, /PopoverSurface/i)[0]).toHaveTextContent('20,000');
    fireEvent.mouseLeave(getById(container, /Pie/i)[0]);
    fireEvent.mouseOver(getById(container, /Pie/i)[1]);

    // Assert
    await (() => {
      expect(getByClass(container, /PopoverSurface/i)[1]).toHaveTextContent('39,000');
    });
  });

  test('Should change value inside donut with the legend value on mouseOver legend ', () => {
    // Mock the implementation of wrapTextInsideDonut as it internally calls a Browser Function like
    // getComputedTextLength() which will otherwise lead to a crash if mounted
    jest.spyOn(utils, 'wrapTextInsideDonut').mockImplementation(() => '1000');
    // Arrange
    const { container } = render(
      <DonutChart data={chartPointsDC} innerRadius={55} hideLegend={false} valueInsideDonut={1000} />,
    );
    const getByClass = queryAllByAttribute.bind(null, 'class');

    // Act
    fireEvent.mouseOver(screen.getByText('first'));

    // Assert
    expect(getByClass(container, /insideDonutString.*?/)[0].textContent).toBe('20,000');
  });

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
        <DonutChart culture={window.navigator.language} data={chartPointsDC} innerRadius={55} />
      </FluentProvider>,
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Donut Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<DonutChart data={chartPointsDC} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

/* eslint-disable @typescript-eslint/no-deprecated */

describe('DonutChart snapShot testing', () => {
  it('renders DonutChart correctly', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} innerRadius={55} />);

    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DonutChart correctly without color points', () => {
    const chartPointColor = pointsDC[0].color;
    delete pointsDC[0].color;

    let component = renderer.create(<DonutChart data={noColorsChartPoints} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
    pointsDC[0].color = chartPointColor;
  });

  it('renders hideLegend correctly', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} hideLegend={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} hideTooltip={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} legendProps={{ enabledWrapLines: true }} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders value inside onf the pie', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} valueInsideDonut={1000} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render arc labels', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} hideLabels={false} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render arc labels in percentage format', () => {
    let component = renderer.create(<DonutChart data={chartPointsDC} hideLabels={false} showLabelsInPercent={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should elevate all smaller values to minimums', () => {
    let component = renderer.create(<DonutChart data={chartPointsDCElevateMinimums} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
  /* eslint-enable @typescript-eslint/no-deprecated */
});

describe('DonutChart - basic props', () => {
  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(
      <DonutChart
        data={chartPointsDC}
        /* onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
            props ? (
              <div className="onRenderCalloutPerDataPoint">
                <p>Custom Callout Content</p>
              </div>
            ) : null
          } */
      />,
    );
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('DonutChart - mouse events', () => {
  it('Should render callout correctly on mouseover', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} innerRadius={55} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.mouseOver(getById(wrapper.container, /Pie/i)[0]);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} innerRadius={55} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.mouseOver(getById(wrapper.container, /Pie/i)[0]);
    const html1 = wrapper!.container.innerHTML;
    fireEvent.mouseLeave(getById(wrapper.container, /Pie/i)[0]);
    fireEvent.mouseOver(getById(wrapper.container, /Pie/i)[1]);
    const html2 = wrapper!.container.innerHTML;
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
    let wrapper = render(
      <DonutChart
        data={chartPointsDC}
        innerRadius={55}
        /* onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
            props ? (
              <div>
                <pre>{JSON.stringify(props, null, 2)}</pre>
              </div>
            ) : null
          } */
      />,
    );
    const getById = queryAllByAttribute.bind(null, 'id');
    fireEvent.mouseOver(getById(wrapper.container, /Pie/i)[0]);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<DonutChart data={chartPointsDC} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let wrapper = render(<DonutChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});
