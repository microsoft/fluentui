/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { IVSChartDataPoint, VerticalStackedBarChart, IVerticalStackedChartProps } from '../../index';
import { chartPointsVSBC, emptychartPointsVSBC } from '../../utilities/test-data';
import { render } from '@testing-library/react';

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

describe('VerticalStackedBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders VerticalStackedBarChart correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} enabledLegendsWrapLines={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} showXAxisLablesTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} wrapXAxisLables={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders isCalloutForStack correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} isCalloutForStack={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} yAxisTickFormat={'/%d'} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} hideLabels={true} />);
    });
    const tree = component!.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} enableGradient={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} roundCorners={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('VerticalStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not render legend when hideLegend true ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render legend when hideLegend false ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should render callout when hideTootip false ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const hideTooltipDom = wrapper.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not render callout when hideTootip true ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    const wrapper = render(
      <VerticalStackedBarChart
        data={chartPointsVSBC}
        onRenderCalloutPerStack={(props: IVerticalStackedChartProps) =>
          props ? (
            <div className="onRenderCalloutPerStack">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );

    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(
      <VerticalStackedBarChart
        data={chartPointsVSBC}
        onRenderCalloutPerDataPoint={(props: IVSChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const props = {
      data: chartPointsVSBC,
      height: 300,
      width: 600,
    };
    const component = renderer.create(<VerticalStackedBarChart {...props} />);
    const htmlBefore = component!.toJSON();
    component.update(<VerticalStackedBarChart {...props} />);
    const htmlAfter = component!.toJSON();
    expect(htmlAfter).not.toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsVSBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const component = renderer.create(<VerticalStackedBarChart {...props} />);
    const htmlBefore = component!.toJSON();
    component.update(<VerticalStackedBarChart {...props} hideLegend={false} />);
    const htmlAfter = component!.toJSON();
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const component = renderer.create(<VerticalStackedBarChart data={emptychartPointsVSBC} />);
    const tree = component!.toJSON();
    const node = Array.isArray(tree) ? tree[0] : tree;
    expect(node && node.props['aria-label']).toBe('Graph has no data to display');
  });

  test('should render empty chart div when data array is empty', () => {
    const component = renderer.create(<VerticalStackedBarChart data={[]} roundCorners={true} />);
    const tree = component!.toJSON();
    const node = Array.isArray(tree) ? tree[0] : tree;
    expect(node && node.props['aria-label']).toBe('Graph has no data to display');
  });
});
