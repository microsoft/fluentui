import * as React from 'react';
import { resetIds } from '../../Utilities';
import { render, screen } from '@testing-library/react';
import { PieChart } from './index';
import { PieChartBase } from './PieChart.base';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import * as utils from '../../utilities/utilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

function sharedBeforeEach() {
  resetIds();
  jest.spyOn(utils, 'wrapContent').mockImplementation(() => false);
}

function sharedAfterEach() {
  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

export const chartPoints = [
  { y: 50, x: 'A' },
  { y: 25, x: 'B' },
  { y: 25, x: 'C' },
];
export const colors = [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green];

describe('PieChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders PieChart correctly', () => {
    const { container } = render(<PieChart data={chartPoints} colors={colors} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with colors, width and height data correctly', () => {
    const { container } = render(<PieChart data={chartPoints} height={300} width={600} colors={colors} />);
    expect(container).toMatchSnapshot();
  });
});

describe('PieChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should mount legend when hideLegend false ', () => {
    render(<PieChart data={chartPoints} colors={colors} />);
    // Find element with class starting with "legendContainer"
    const legend = document.querySelectorAll('[class^="legendContainer"]');
    expect(legend).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    render(<PieChart data={chartPoints} colors={colors} />);
    // Find element with class starting with "ms-Layer"
    const callouts = document.querySelectorAll('[class^="ms-Layer"]');
    expect(callouts.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(PieChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      colors,
    };
    const { rerender } = render(<PieChart {...props} />);
    rerender(<PieChart {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(PieChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      colors,
    };
    const { rerender } = render(<PieChart {...props} />);
    rerender(<PieChart {...props} width={600} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

  it('No empty chart aria label div rendered', () => {
    render(<PieChart data={chartPoints} colors={colors} />);
    const emptyLabel = screen.queryByLabelText('Graph has no data to display');
    expect(emptyLabel).toBeNull();
  });

  it('Empty chart aria label div rendered', () => {
    render(<PieChart data={[]} colors={colors} />);
    const emptyLabel = screen.queryByLabelText('Graph has no data to display');
    expect(emptyLabel).not.toBeNull();
  });
});
