jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import {
  IVSChartDataPoint,
  IVerticalStackedBarChartProps,
  VerticalStackedBarChart,
  IVerticalStackedChartProps,
} from '../../index';
import { IVerticalStackedBarChartState, VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';
import { act as domAct } from 'react-dom/test-utils';
import { chartPoints_VSBC, emptychartPoints_VSBC } from '../../utilities/testData';

// Wrapper of the VerticalStackedBarChart to be tested.
let wrapper:
  | ReactWrapper<IVerticalStackedBarChartProps, IVerticalStackedBarChartState, VerticalStackedBarChartBase>
  | undefined;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }

  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

describe('VerticalStackedBarChart snapShot testing', () => {
  it('renders VerticalStackedBarChart correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} hideLegend={true} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} hideTooltip={true} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} enabledLegendsWrapLines={true} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} showXAxisLablesTooltip={true} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} wrapXAxisLables={true} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders isCalloutForStack correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} isCalloutForStack={true} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} yAxisTickFormat={'/%d'} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let component: any;
    let tree;

    renderer.act(() => {
      component = renderer.create(<VerticalStackedBarChart data={chartPoints_VSBC} hideLabels={true} />);
    });
    tree = component!.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('VerticalStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} hideLegend={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} />);
    });
    const hideTooltipDom = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} hideTooltip={true} />);
    });
    const hideTooltipDom = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    domAct(() => {
      wrapper = mount(
        <VerticalStackedBarChart
          data={chartPoints_VSBC}
          onRenderCalloutPerStack={(props: IVerticalStackedChartProps) =>
            props ? (
              <div className="onRenderCalloutPerStack">
                <p>Custom Callout Content</p>
              </div>
            ) : null
          }
        />,
      );
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    domAct(() => {
      wrapper = mount(
        <VerticalStackedBarChart
          data={chartPoints_VSBC}
          onRenderCalloutPerDataPoint={(props: IVSChartDataPoint) =>
            props ? (
              <div className="onRenderCalloutPerDataPoint">
                <p>Custom Callout Content</p>
              </div>
            ) : null
          }
        />,
      );
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(VerticalStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints_VSBC,
      height: 300,
      width: 600,
    };
    let component: any;
    domAct(() => {
      component = mount(<VerticalStackedBarChart {...props} />);
    });
    component!.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(VerticalStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints_VSBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    let component: any;
    domAct(() => {
      component = mount(<VerticalStackedBarChart {...props} />);
    });
    component!.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('No empty chart aria label div rendered', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={chartPoints_VSBC} />);
    });
    const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    domAct(() => {
      wrapper = mount(<VerticalStackedBarChart data={emptychartPoints_VSBC} />);
    });
    const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
