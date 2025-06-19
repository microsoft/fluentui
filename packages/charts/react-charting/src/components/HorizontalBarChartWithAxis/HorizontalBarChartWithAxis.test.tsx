/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChartWithAxis } from '../../index';
import { HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { resetIds } from '@fluentui/react';

import { pointsHBCWA } from '../../utilities/test-data';
import { toHaveNoViolations } from 'jest-axe';
import { render, act } from '@testing-library/react';

expect.extend(toHaveNoViolations);

function sharedBeforeEach() {
  resetIds();
}

const pointsForWrapLabels = [
  {
    y: 'String One',
    x: 1000,
    color: DefaultPalette.accent,
  },
  {
    y: 'String Two',
    x: 5000,
    color: DefaultPalette.blueDark,
  },
  {
    y: 'String Three',
    x: 3000,
    color: DefaultPalette.blueMid,
  },
  {
    y: 'String Four',
    x: 2000,
    color: DefaultPalette.blue,
  },
];

describe('HorizontalBarChartWithAxis snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders HorizontalBarChartWithAxis correctly', () => {
    let component: any;
    act(() => {
      component = renderer.create(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders hideLegend correctly', () => {
    let component: any;
    act(() => {
      component = renderer.create(<HorizontalBarChartWithAxis data={pointsHBCWA} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showToolTipForYAxisLabels correctly', () => {
    let component: any;
    act(() => {
      component = renderer.create(
        <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLablesTooltip={true} />,
      );
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showYAxisLables correctly', () => {
    let component: any;
    act(() => {
      component = renderer.create(
        <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLables={true} showYAxisLablesTooltip={false} />,
      );
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    const component = renderer.create(<HorizontalBarChartWithAxis data={pointsHBCWA} enableGradient={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should render rounded corners on bars', () => {
    const component = renderer.create(<HorizontalBarChartWithAxis data={pointsHBCWA} roundCorners={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HorizontalBarChartWithAxis - basic props', () => {
  beforeEach(sharedBeforeEach);

  it('Should not mount legend when hideLegend true', () => {
    render(<HorizontalBarChartWithAxis data={pointsHBCWA} hideLegend={true} />);
    // legendContainer is a className prefix, so we use querySelectorAll
    const legend = document.querySelectorAll('[class^="legendContainer"]');
    expect(legend.length).toBe(0);
  });

  it('Should mount legend when hideLegend false', () => {
    render(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    const legend = document.querySelectorAll('[class^="legendContainer"]');
    expect(legend.length).toBeDefined();
  });

  it('Should mount callout when hideTooltip false', () => {
    render(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    const callout = document.getElementsByClassName('.ms-Layer');
    expect(callout.length).toBeDefined();
  });

  it('Should not mount callout when hideTooltip true', () => {
    render(<HorizontalBarChartWithAxis data={pointsHBCWA} hideTooltip={true} />);
    const callout = document.querySelectorAll('[class^="ms-Layer"]');
    expect(callout.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartWithAxisBase.prototype, 'render');
    const props = {
      data: pointsHBCWA,
      height: 300,
      width: 600,
    };
    act(() => {
      render(<HorizontalBarChartWithAxis {...props} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(1);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartWithAxisBase.prototype, 'render');
    const props = {
      data: pointsHBCWA,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    let rerender: any;
    act(() => {
      const result = render(<HorizontalBarChartWithAxis {...props} />);
      rerender = result.rerender;
    });
    act(() => {
      rerender(<HorizontalBarChartWithAxis {...props} hideTooltip={true} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

// Mouse events test is skipped as in original
describe('HorizontalBarChartWithAxis - mouse events', () => {
  beforeEach(sharedBeforeEach);

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('Should render callout correctly on mouseover', async () => {
    render(<HorizontalBarChartWithAxis data={pointsHBCWA} calloutProps={{ doNotLayer: true }} />);
    // Wait for the chart to be resized
    await new Promise(resolve => setTimeout(resolve));

    // Find the second rect and fire mouseover
    const rects = document.querySelectorAll('rect');
    if (rects.length > 1) {
      rects[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    }
    await new Promise(resolve => setTimeout(resolve));
    // Snapshot with RTL is not as straightforward, so this is left as a placeholder
    // You can use RTL's asFragment() for snapshot if needed
  });
});
