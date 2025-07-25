/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider, resetIds, setRTL } from '@fluentui/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GanttChart } from './index';
import { ganttData, ganttDataWithLongY, ganttDataWithNumericY } from '../../utilities/test-data';
import { GanttChartDataPoint } from '../../types/index';

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

  it('should display tooltip on truncated y-axis tick labels hover when showYAxisLablesTooltip is true', async () => {
    render(<GanttChart data={ganttDataWithLongY} showYAxisLablesTooltip={true} />);
    expect(screen.queryByText('Site Preparation')).toBeNull();

    await act(() => {
      fireEvent.mouseOver(screen.getByText('Site...'));
    });
    expect(screen.queryByText('Site Preparation')).not.toBeNull();
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
    const { container } = render(<GanttChart data={ganttData} />);
    await act(() => {
      fireEvent.mouseOver(container.querySelector('rect')!);
    });
    expect(container).toMatchSnapshot();
  });

  it('should not display callout on bar hover when hideTooltip is true', async () => {
    const { container } = render(<GanttChart data={ganttData} hideTooltip={true} />);
    await act(() => {
      fireEvent.mouseOver(container.querySelector('rect')!);
    });
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should render GanttChart correctly with numeric y-axis data', () => {
    const { container } = render(<GanttChart data={ganttDataWithNumericY} />);
    expect(container).toMatchSnapshot();
  });

  it('should render bars with the specified height when barHeight is set', () => {
    const { container } = render(<GanttChart data={ganttData} barHeight={50} />);
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    bars.forEach(bar => {
      expect(bar).toHaveAttribute('height', '50');
    });
  });
});

describe('GanttChart interaction and accessibility tests', () => {
  it(`should display callout on bar hover and hide it on mouse leave from the chart`, async () => {
    const { container } = render(<GanttChart data={ganttData} />);
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
    const { container } = render(<GanttChart data={ganttData} />);
    const bar = container.querySelector('rect')!;
    await act(() => {
      fireEvent.focus(bar);
    });
    expect(container.querySelector('.ms-Callout')).not.toBeNull();
  });

  it(`should highlight corresponding bars on legend hover and remove highlight on legend mouse out`, async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    const legendTitle = 'Not Started';
    const legendButton = screen.getByText(legendTitle);
    await act(() => {
      fireEvent.mouseOver(legendButton);
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    for (let i = 0; i < bars.length; i++) {
      if (ganttData[i].legend === legendTitle) {
        expect(bars[i]).toHaveAttribute('opacity', '1');
      } else {
        expect(bars[i]).toHaveAttribute('opacity', '0.1');
      }
    }

    await act(() => {
      fireEvent.mouseOut(legendButton);
    });
    for (let i = 0; i < bars.length; i++) {
      expect(bars[i]).toHaveAttribute('opacity', '1');
    }
  });

  it(`should toggle highlight on corresponding bars when legend is clicked`, async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    const legendTitle = 'Incomplete';
    const legendButton = screen.getByText(legendTitle);
    await act(() => {
      fireEvent.click(legendButton);
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    for (let i = 0; i < bars.length; i++) {
      if (ganttData[i].legend === legendTitle) {
        expect(bars[i]).toHaveAttribute('opacity', '1');
      } else {
        expect(bars[i]).toHaveAttribute('opacity', '0.1');
      }
    }

    await act(() => {
      fireEvent.click(legendButton);
    });
    for (let i = 0; i < bars.length; i++) {
      expect(bars[i]).toHaveAttribute('opacity', '1');
    }
  });

  it.skip(`should display callout on hover over highlighted bar and hide on hover over unhighlighted bar`, async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    const legendTitle = 'Complete';
    await act(() => {
      fireEvent.click(screen.getByText(legendTitle));
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(8);
    for (let i = 0; i < bars.length; i++) {
      await act(() => {
        fireEvent.mouseOver(bars[i]);
      });
      if (ganttData[i].legend === legendTitle) {
        expect(container.querySelector('.ms-Callout')).not.toBeNull();
      } else {
        expect(container.querySelector('.ms-Callout')).toBeNull();
      }
    }
  });

  it(`should highlight corresponding bars for multiple selected legends`, async () => {
    const { container } = render(
      <GanttChart data={ganttDataWithNumericY} legendProps={{ canSelectMultipleLegends: true }} />,
    );
    const legendTitle1 = 'Finance';
    const legendTitle2 = 'Operations';
    await act(() => {
      fireEvent.click(screen.getByText(legendTitle1));
    });
    await act(() => {
      fireEvent.click(screen.getByText(legendTitle2));
    });
    const bars = container.querySelectorAll('rect');
    expect(bars).toHaveLength(6);
    for (let i = 0; i < bars.length; i++) {
      if ([legendTitle1, legendTitle2].includes(ganttDataWithNumericY[i].legend!)) {
        expect(bars[i]).toHaveAttribute('opacity', '1');
      } else {
        expect(bars[i]).toHaveAttribute('opacity', '0.1');
      }
    }
  });

  it('should render custom callout content using onRenderCalloutPerDataPoint when a bar is hovered', async () => {
    const { container } = render(
      <GanttChart
        data={ganttData}
        onRenderCalloutPerDataPoint={(props: GanttChartDataPoint) =>
          props ? <pre>{JSON.stringify(props, null, 2)}</pre> : null
        }
      />,
    );
    await act(() => {
      fireEvent.mouseOver(container.querySelector('rect')!);
    });
    expect(container).toMatchSnapshot();
  });

  it.skip('should pass accessibility checks with no violations', async () => {
    const { container } = render(<GanttChart data={ganttData} />);
    jest.useRealTimers();
    const results = await axe(container);
    jest.useFakeTimers();
    expect(results).toHaveNoViolations();
  });
});
