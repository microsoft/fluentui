import * as React from 'react';
import { resetIds } from '../../Utilities';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartProps, IChartDataPoint, MultiStackedBarChart, MultiStackedBarChartVariant } from '../../index';
import { MultiStackedBarChartBase } from './MultiStackedBarChart.base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

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

export const chartPoints: IChartProps[] = [
  {
    chartTitle: 'Monitored',
    chartData: firstChartPoints,
  },
  {
    chartTitle: 'Unmonitored',
    chartData: secondChartPoints,
  },
];

export const emptyChartPoints: IChartProps[] = [
  {
    chartData: [],
  },
];

function sharedBeforeEach() {
  resetIds();
}

afterEach(() => {
  cleanup();
  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
});

describe('MultiStackedBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders MultiStackedBarChart correctly', () => {
    const { container } = render(<MultiStackedBarChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const { container } = render(<MultiStackedBarChart data={chartPoints} hideLegend={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const { container } = render(<MultiStackedBarChart data={chartPoints} hideTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideRatio correctly', () => {
    const { container } = render(<MultiStackedBarChart data={chartPoints} hideRatio={[true, false]} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideDenominator correctly', () => {
    const { container } = render(<MultiStackedBarChart data={chartPoints} hideDenominator={[true, true]} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render absolute-scale variant correctly', () => {
    const { container } = render(
      <MultiStackedBarChart data={chartPoints} variant={MultiStackedBarChartVariant.AbsoluteScale} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render bar labels in absolute-scale variant', () => {
    const { container } = render(
      <MultiStackedBarChart data={chartPoints} variant={MultiStackedBarChartVariant.AbsoluteScale} hideLabels={true} />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('MultiStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);

  it('Should not mount legend when hideLegend true ', () => {
    render(<MultiStackedBarChart data={chartPoints} hideLegend={true} />);
    // legendContainer class should not be present
    expect(document.querySelectorAll('[class^="legendContainer"]').length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    render(<MultiStackedBarChart data={chartPoints} />);
    expect(document.querySelectorAll('[class^="legendContainer"]').length).toBeGreaterThan(0);
  });

  it('Should mount callout when hideTooltip false ', () => {
    render(<MultiStackedBarChart data={chartPoints} />);
    expect(document.querySelectorAll('[class^="ms-Layer"]').length).toBeGreaterThan(0);
  });

  it.skip('Should not mount callout when hideTooltip true ', () => {
    render(<MultiStackedBarChart data={chartPoints} hideTooltip={true} />);
    expect(document.querySelectorAll('[class^="ms-Layer"]').length).toBe(0);
  });

  it('Should not mount callout when hideDenominator true ', () => {
    render(<MultiStackedBarChart data={chartPoints} hideDenominator={[true, true]} />);
    expect(document.querySelectorAll('[class^="ratioDenominator"]').length).toBe(0);
  });

  it('Should not mount callout when hideDenominator false ', () => {
    render(<MultiStackedBarChart data={chartPoints} />);
    expect(document.querySelectorAll('[class^="ratioDenominator"]').length).toBeGreaterThan(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    render(
      <MultiStackedBarChart
        data={chartPoints}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <div data-testid="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    // Simulate mouseover on the first rect to trigger callout
    const rect = document.querySelector('rect');
    if (rect) {
      fireEvent.mouseOver(rect);
    }
    expect(screen.queryByTestId('onRenderCalloutPerDataPoint')).toBeInTheDocument();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    render(<MultiStackedBarChart data={chartPoints} />);
    expect(screen.queryByTestId('onRenderCalloutPerDataPoint')).not.toBeInTheDocument();
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(MultiStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const { rerender } = render(<MultiStackedBarChart {...props} />);
    rerender(<MultiStackedBarChart {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(MultiStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender } = render(<MultiStackedBarChart {...props} />);
    rerender(<MultiStackedBarChart {...props} hideTooltip={true} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('MultiStackedBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);

  it('Should render callout correctly on mouseover', () => {
    render(<MultiStackedBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const rect = document.querySelector('rect');
    if (rect) {
      fireEvent.mouseOver(rect);
    }
    // You can use snapshot testing for the DOM
    expect(document.body).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    render(<MultiStackedBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const rects = document.querySelectorAll('rect');
    if (rects.length > 1) {
      fireEvent.mouseMove(rects[0]);
      const html1 = document.body.innerHTML;
      fireEvent.mouseMove(rects[1]);
      const html2 = document.body.innerHTML;
      expect(html1).not.toBe(html2);
    }
  });

  it('Should render customized callout on mouseover', () => {
    render(
      <MultiStackedBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <div data-testid="custom-callout">
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    const rect = document.querySelector('rect');
    if (rect) {
      fireEvent.mouseOver(rect);
    }
    expect(screen.getByTestId('custom-callout')).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

  it('No empty chart aria label div rendered', () => {
    render(<MultiStackedBarChart data={chartPoints} />);
    expect(screen.queryByLabelText('Graph has no data to display')).not.toBeInTheDocument();
  });

  it('Empty chart aria label div rendered', () => {
    render(<MultiStackedBarChart data={emptyChartPoints} />);
    expect(screen.getByLabelText('Graph has no data to display')).toBeInTheDocument();
  });
});
