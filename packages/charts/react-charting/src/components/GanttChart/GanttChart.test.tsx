/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider, resetIds, setRTL } from '@fluentui/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GanttChart } from './index';
import { ganttData, ganttDataWithLongY, ganttDataWithNumericY } from '../../utilities/test-data';
import { IGanttChartDataPoint } from '../../types/index';

expect.extend(toHaveNoViolations);

const originalRAF = window.requestAnimationFrame;

function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.HTMLElement.prototype.getBoundingClientRect = () =>
    ({
      bottom: 44,
      height: 350,
      left: 10,
      right: 35.67,
      top: 20,
      width: 600,
    } as DOMRect);
}

beforeEach(() => {
  resetIds();
  updateChartWidthAndHeight();
});

afterEach(() => {
  cleanup();
  window.requestAnimationFrame = originalRAF;
  jest.useRealTimers();
});

describe('GanttChart rendering and behavior tests', () => {
  it('should render GanttChart correctly', () => {
    const { container } = render(<GanttChart data={ganttData} />);
    expect(container).toMatchSnapshot();
  });

  it('should render GanttChart correctly in dark theme', () => {
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <GanttChart data={ganttData} />
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render GanttChart correctly when the layout direction is RTL', () => {
    setRTL(true);
    const { container } = render(<GanttChart data={ganttData} />);
    expect(container).toMatchSnapshot();
    setRTL(false);
  });

  it('should display full y-axis tick labels when showYAxisLables is true', () => {
    const { container } = render(<GanttChart data={ganttDataWithLongY} showYAxisLables={true} />);
    expect(container).toMatchSnapshot();
  });

  it('should truncate y-axis tick labels when showYAxisLablesTooltip is true', async () => {
    const { container } = render(<GanttChart data={ganttDataWithLongY} showYAxisLablesTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('should render bars with gradient fill when enableGradient is true', () => {
    const { container } = render(<GanttChart data={ganttData} enableGradient={true} />);
    expect(container).toMatchSnapshot();
  });

  it('should render bars with rounded corners when roundCorners is true', () => {
    const { container } = render(<GanttChart data={ganttData} roundCorners={true} />);
    expect(container).toMatchSnapshot();
  });

  it('should not render the legends when the hideLegend prop is true', async () => {
    const { container, rerender } = render(<GanttChart data={ganttData} />);
    expect(container.querySelectorAll('button')).toHaveLength(3);

    rerender(<GanttChart data={ganttData} hideLegend={true} />);
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('should render callout correctly when a bar is hovered', async () => {
    const { container } = render(<GanttChart data={ganttData} calloutProps={{ doNotLayer: true }} />);
    await act(() => {
      fireEvent.mouseOver(container.querySelector('rect')!);
    });
    expect(container).toMatchSnapshot();
  });

  it('should not display callout on bar hover when hideTooltip is true', async () => {
    const { container } = render(
      <GanttChart data={ganttData} hideTooltip={true} calloutProps={{ doNotLayer: true }} />,
    );
    await act(() => {
      fireEvent.mouseOver(container.querySelector('rect')!);
    });
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should render GanttChart correctly with numeric y-axis data', () => {
    const { container } = render(<GanttChart data={ganttDataWithNumericY} />);
    expect(container).toMatchSnapshot();
  });

  it('should render bars with the specified barHeight when it is within the maxBarHeight', () => {
    const { container } = render(<GanttChart data={ganttData} barHeight={10} maxBarHeight={30} />);
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    bars.forEach(bar => {
      expect(bar).toHaveAttribute('height', '10');
    });
  });

  it('should cap the bar height to maxBarHeight when barHeight exceeds it', () => {
    const { container } = render(<GanttChart data={ganttData} barHeight={50} maxBarHeight={30} />);
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    bars.forEach(bar => {
      expect(bar).toHaveAttribute('height', '30');
    });
  });
});

describe('GanttChart interaction and accessibility tests', () => {
  it('should display full y-axis tick label on hover when showYAxisLablesTooltip is true', async () => {
    render(<GanttChart data={ganttDataWithLongY} showYAxisLablesTooltip={true} />);
    expect(screen.queryByText('Site Preparation')).toBeNull();

    await act(() => {
      fireEvent.mouseOver(screen.getByText('Site...'));
    });
    expect(screen.queryByText('Site Preparation')).not.toBeNull();
  });

  it(`should display callout on bar hover and hide it on mouse leave from the chart`, async () => {
    const { container } = render(<GanttChart data={ganttData} calloutProps={{ doNotLayer: true }} />);
    const bar = container.querySelector('rect')!;
    await act(() => {
      fireEvent.mouseOver(bar);
    });
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    await act(() => {
      fireEvent.mouseLeave(container.querySelector('[class^="root"]')!);
    });
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should display callout when a bar is focused', async () => {
    const { container } = render(<GanttChart data={ganttData} calloutProps={{ doNotLayer: true }} />);
    const bar = container.querySelector('rect')!;
    await act(() => {
      fireEvent.focus(bar);
    });
    expect(container.querySelector('.ms-Callout')).not.toBeNull();
  });

  it(`should highlight corresponding bars on legend hover and remove highlight on legend mouse out`, async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    const legendButton = screen.getByText('Not Started');
    await act(() => {
      fireEvent.mouseOver(legendButton);
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    expect(bars[3]).toHaveAttribute('opacity', '1');
    expect(bars[0]).toHaveAttribute('opacity', '0.1');

    await act(() => {
      fireEvent.mouseOut(legendButton);
    });
    expect(bars[3]).toHaveAttribute('opacity', '1');
    expect(bars[0]).toHaveAttribute('opacity', '1');
  });

  it(`should toggle highlight on corresponding bars when legend is clicked`, async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    const legendButton = screen.getByText('Incomplete');
    await act(() => {
      fireEvent.click(legendButton);
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    expect(bars[1]).toHaveAttribute('opacity', '1');
    expect(bars[0]).toHaveAttribute('opacity', '0.1');

    await act(() => {
      fireEvent.click(legendButton);
    });
    expect(bars[1]).toHaveAttribute('opacity', '1');
    expect(bars[0]).toHaveAttribute('opacity', '1');
  });

  it(`should display callouts only for highlighted bars`, async () => {
    const { container } = render(<GanttChart data={ganttData} calloutProps={{ doNotLayer: true }} />);
    await act(() => {
      fireEvent.click(screen.getByText('Complete'));
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);

    await act(() => {
      fireEvent.mouseOver(bars[1]);
    });
    expect(container.querySelector('.ms-Callout')).toBeNull();

    await act(() => {
      fireEvent.mouseOver(bars[0]);
    });
    expect(container.querySelector('.ms-Callout')).not.toBeNull();
  });

  it(`should highlight corresponding bars for multiple selected legends`, async () => {
    const { container } = render(
      <GanttChart data={ganttDataWithNumericY} legendProps={{ canSelectMultipleLegends: true }} />,
    );
    await act(() => {
      fireEvent.click(screen.getByText('Finance'));
    });
    await act(() => {
      fireEvent.click(screen.getByText('Operations'));
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(6);
    expect(bars[2]).toHaveAttribute('opacity', '1');
    expect(bars[4]).toHaveAttribute('opacity', '1');
    expect(bars[5]).toHaveAttribute('opacity', '0.1');
  });

  it('should render custom callout content using onRenderCalloutPerDataPoint when a bar is hovered', async () => {
    const { container } = render(
      <GanttChart
        data={ganttData}
        onRenderCalloutPerDataPoint={(props: IGanttChartDataPoint) =>
          props ? <pre>{JSON.stringify(props, null, 2)}</pre> : null
        }
        calloutProps={{ doNotLayer: true }}
      />,
    );
    await act(() => {
      fireEvent.mouseOver(container.querySelector('rect')!);
    });
    expect(container).toMatchSnapshot();
  });

  it('should pass accessibility checks with no violations', async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    jest.useRealTimers();
    const results = await axe(container);
    jest.useFakeTimers();
    expect(results).toHaveNoViolations();
  });
});
