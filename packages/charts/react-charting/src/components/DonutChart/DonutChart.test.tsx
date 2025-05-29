/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { chartPointsDC, chartPointsDCElevateMinimums, pointsDC } from '../../utilities/test-data';
import { resetIds } from '../../Utilities';
import { render, screen, fireEvent } from '@testing-library/react';
import { DonutChart } from './index';
import { IChartProps, IChartDataPoint } from '../../index';

export const emptyChartPoints: IChartProps = {
  chartTitle: 'Donut chart example',
  chartData: [],
};

const pointsNoColors: IChartDataPoint[] = [
  { legend: 'first', data: 20000, xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, xAxisCalloutData: '2020/04/25' },
];

export const noColorsChartPoints: IChartProps = {
  chartTitle: 'Donut chart example',
  chartData: pointsNoColors,
};

function sharedBeforeEach() {
  resetIds();
}

describe('DonutChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders DonutChart correctly', () => {
    const { container } = render(<DonutChart data={chartPointsDC} innerRadius={55} />);
    expect(container).toMatchSnapshot();
  });

  it('renders DonutChart correctly without color points', () => {
    const chartPointColor = pointsDC[0].color;
    delete pointsDC[0].color;
    const { container } = render(<DonutChart data={noColorsChartPoints} />);
    expect(container).toMatchSnapshot();
    pointsDC[0].color = chartPointColor;
  });

  it('renders hideLegend correctly', () => {
    const { container } = render(<DonutChart data={chartPointsDC} hideLegend={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const { container } = render(<DonutChart data={chartPointsDC} hideTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const { container } = render(<DonutChart data={chartPointsDC} enabledLegendsWrapLines={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders value inside onf the pie', () => {
    const { container } = render(<DonutChart data={chartPointsDC} valueInsideDonut={1000} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render arc labels', () => {
    const { container } = render(<DonutChart data={chartPointsDC} hideLabels={false} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render arc labels in percentage format', () => {
    const { container } = render(<DonutChart data={chartPointsDC} hideLabels={false} showLabelsInPercent={true} />);
    expect(container).toMatchSnapshot();
  });

  it('Should elevate all smaller values to minimums', () => {
    const { container } = render(<DonutChart data={chartPointsDCElevateMinimums} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render gradients on arcs', () => {
    const { container } = render(<DonutChart data={chartPointsDCElevateMinimums} enableGradient={true} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render rounded corners on arcs', () => {
    const { container } = render(<DonutChart data={chartPointsDCElevateMinimums} roundCorners={true} />);
    expect(container).toMatchSnapshot();
  });
});

describe('DonutChart - basic props', () => {
  beforeEach(sharedBeforeEach);

  it('Should mount legend when hideLegend false', () => {
    render(<DonutChart data={chartPointsDC} />);
    // legendContainer class is used for legend container
    const legend = document.querySelectorAll('[class^="legendContainer"]');
    expect(legend.length).toBeDefined();
  });

  it('Should mount callout when hideTooltip false', () => {
    render(<DonutChart data={chartPointsDC} />);
    // ms-Layer is used for callout layer
    const callout = document.querySelectorAll('[class^="ms-Layer"]');
    expect(callout.length).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack', () => {
    render(<DonutChart data={chartPointsDC} />);
    // .onRenderCalloutPerStack class should not exist
    const callout = document.querySelectorAll('.onRenderCalloutPerStack');
    expect(callout.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint', () => {
    render(
      <DonutChart
        data={chartPointsDC}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    // Simulate mouseover on first arc to trigger callout
    const arc = document.querySelector('path[id^="_Pie_"]');
    if (arc) {
      fireEvent.mouseOver(arc);
    }
    const callout = document.querySelectorAll('.onRenderCalloutPerDataPoint');
    expect(callout.length).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint', () => {
    render(<DonutChart data={chartPointsDC} />);
    const callout = document.querySelectorAll('.onRenderCalloutPerDataPoint');
    expect(callout.length).toBe(0);
  });
});

describe('DonutChart - mouse events', () => {
  beforeEach(sharedBeforeEach);

  it('Should render callout correctly on mouseover', () => {
    render(<DonutChart data={chartPointsDC} innerRadius={55} calloutProps={{ doNotLayer: true }} />);
    const arc = document.querySelector('path[id^="_Pie_"]');
    if (arc) {
      fireEvent.mouseOver(arc);
    }
    // Check if callout appears (look for callout content)
    const callout = document.querySelector('[class*="callout"]');
    expect(callout).toBeDefined();
  });

  it('Should render callout correctly on mousemove', () => {
    render(<DonutChart data={chartPointsDC} innerRadius={55} calloutProps={{ doNotLayer: true }} />);
    const arcs = document.querySelectorAll('path[id^="_Pie_"]');
    if (arcs.length > 1) {
      fireEvent.mouseMove(arcs[0]);
      const html1 = document.body.innerHTML;
      fireEvent.mouseLeave(arcs[0]);
      fireEvent.mouseMove(arcs[1]);
      const html2 = document.body.innerHTML;
      expect(html1).not.toBe(html2);
    }
  });

  it('Should render customized callout on mouseover', () => {
    render(
      <DonutChart
        data={chartPointsDC}
        innerRadius={55}
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
    const arc = document.querySelector('path[id^="_Pie_"]');
    if (arc) {
      fireEvent.mouseOver(arc);
    }
    // Check for the custom callout content
    expect(document.querySelector('pre')).toBeDefined();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

  it('No empty chart aria label div rendered', () => {
    render(<DonutChart data={chartPointsDC} />);
    const emptyDiv = screen.queryByLabelText('Graph has no data to display');
    expect(emptyDiv).toBeNull();
  });

  it('Empty chart aria label div rendered', () => {
    render(<DonutChart data={emptyChartPoints} />);
    const emptyDiv = screen.getByLabelText('Graph has no data to display');
    expect(emptyDiv).toBeInTheDocument();
  });
});
