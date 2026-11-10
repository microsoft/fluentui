// jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartProps, IChartDataPoint, StackedBarChart } from '../../index';
import { StackedBarChartBase } from './StackedBarChart.base';
import { fireEvent, render } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

const points: IChartDataPoint[] = [
  { legend: 'first Lorem ipsum dolor sit amet', data: 40, color: DefaultPalette.magentaDark },
  { legend: 'Winter is coming', data: 23, color: DefaultPalette.red },
];
const chartTitle = 'Stacked bar chart 2nd example';

export const chartPoints: IChartProps = {
  chartTitle,
  chartData: points,
};

export const emptyChartPoints: IChartProps = {
  chartTitle,
  chartData: [],
};

describe('StackedBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders StackedBarChart correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} hideLegend={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} hideTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideNumberDisplay correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} hideNumberDisplay={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideDenominator correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} hideDenominator={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders ignoreFixStyle correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} ignoreFixStyle={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders enableGradient correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} enableGradient={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders roundCorners correctly', () => {
    const { container } = render(<StackedBarChart data={chartPoints} roundCorners={true} />);
    expect(container).toMatchSnapshot();
  });
});

describe('StackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    render(<StackedBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = document.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    render(<StackedBarChart data={chartPoints} />);
    const hideLegendDOM = document.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    render(<StackedBarChart data={chartPoints} />);
    const hideTooltipDom = document.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it.skip('Should not mount callout when hideTootip true ', () => {
    render(<StackedBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = document.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should not mount callout when hideDenominator true ', () => {
    render(<StackedBarChart data={chartPoints} hideDenominator={true} />);
    const hideDenominatorDom = document.querySelectorAll('[class^="ratioDenominator"]');
    expect(hideDenominatorDom.length).toBe(0);
  });

  it('Should not mount callout when hideDenominator false ', () => {
    render(<StackedBarChart data={chartPoints} />);
    const hideDenominatorDom = document.querySelectorAll('[class^="ratioDenominator"]');
    expect(hideDenominatorDom.length).toBeDefined();
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    render(
      <StackedBarChart
        data={chartPoints}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    const renderedDOM = document.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    render(<StackedBarChart data={chartPoints} />);
    const renderedDOM = document.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(StackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const { rerender } = render(<StackedBarChart {...props} />);
    rerender(<StackedBarChart {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(StackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender } = render(<StackedBarChart {...props} />);
    rerender(<StackedBarChart {...props} hideTooltip={true} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('StackedBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', () => {
    const { container } = render(<StackedBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const rects = document.querySelectorAll('rect');
    fireEvent.mouseOver(rects[0]);
    expect(container).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    const { container } = render(<StackedBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const rects = document.querySelectorAll('rect');
    fireEvent.mouseOver(rects[0]);
    const html1 = container.innerHTML;
    fireEvent.mouseOver(rects[1]);
    const html2 = container.innerHTML;
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
    const { container } = render(
      <StackedBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    const rects = document.querySelectorAll('rect');
    fireEvent.mouseOver(rects[0]);
    expect(container).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<StackedBarChart data={chartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const wrapper = render(<StackedBarChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});
