/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { resetIds } from '../../Utilities';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '../../index';
import { chartPointsVBC } from '../../utilities/test-data';
import { render } from '@testing-library/react';
const rendererAct = renderer.act;
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

describe('VerticalBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders VerticalBarChart correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} hideTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} enabledLegendsWrapLines={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} showXAxisLablesTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} wrapXAxisLables={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} yAxisTickFormat={'/%d'} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} hideLabels={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} enableGradient={false} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPointsVBC} roundCorners={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('VerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} hideTooltip={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(
      <VerticalBarChart
        data={chartPointsVBC}
        onRenderCalloutPerDataPoint={(props: IVerticalBarChartDataPoint) =>
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
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const props = {
      data: chartPointsVBC,
      height: 300,
      width: 600,
    };
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart {...props} />);
    });
    const htmlBefore = component!.toJSON();
    component.update(<VerticalBarChart {...props} />);
    const htmlAfter = component!.toJSON();
    expect(htmlAfter).not.toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsVBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart {...props} />);
    });
    const htmlBefore = component!.toJSON();
    component.update(<VerticalBarChart {...props} hideLegend={false} />);
    const htmlAfter = component!.toJSON();
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} enabledLegendsWrapLines />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={[]} roundCorners={true} />);
    });
    const tree = component!.toJSON();
    expect(tree.props['aria-label']).toBe('Graph has no data to display');
  });
});
