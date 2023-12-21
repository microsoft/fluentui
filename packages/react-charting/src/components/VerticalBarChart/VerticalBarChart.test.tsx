jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';

import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '../../index';
import { IVerticalBarChartState, VerticalBarChartBase } from './VerticalBarChart.base';
import { act } from 'react-dom/test-utils';
import { chartPoints_VBC } from '../../utilities/testData';

const rendererAct = renderer.act;

// Wrapper of the VerticalBarChart to be tested.
let wrapper: ReactWrapper<IVerticalBarChartProps, IVerticalBarChartState, VerticalBarChartBase> | undefined;

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

describe('VerticalBarChart snapShot testing', () => {
  it('renders VerticalBarChart correctly', () => {
    let component, tree;
    renderer.act(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} />);
    });
    tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} hideTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} enabledLegendsWrapLines={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} showXAxisLablesTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} wrapXAxisLables={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} yAxisTickFormat={'/%d'} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<VerticalBarChart data={chartPoints_VBC} hideLabels={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('VerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    act(() => {
      wrapper = mount(<VerticalBarChart data={chartPoints_VBC} hideLegend={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    act(() => {
      wrapper = mount(<VerticalBarChart data={chartPoints_VBC} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    act(() => {
      wrapper = mount(<VerticalBarChart data={chartPoints_VBC} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    act(() => {
      wrapper = mount(<VerticalBarChart data={chartPoints_VBC} hideTooltip={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    act(() => {
      wrapper = mount(<VerticalBarChart data={chartPoints_VBC} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    act(() => {
      wrapper = mount(
        <VerticalBarChart
          data={chartPoints_VBC}
          onRenderCalloutPerDataPoint={(props: IVerticalBarChartDataPoint) =>
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
    act(() => {
      wrapper = mount(<VerticalBarChart data={chartPoints_VBC} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints_VBC,
      height: 300,
      width: 600,
    };
    act(() => {
      wrapper = mount(<VerticalBarChart {...props} />);
    });
    wrapper!.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints_VBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    act(() => {
      wrapper = mount(<VerticalBarChart {...props} />);
    });
    wrapper!.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    act(() => {
      wrapper = mount(
        <VerticalBarChart data={chartPoints_VBC} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />,
      );
    });
    const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    act(() => {
      wrapper = mount(<VerticalBarChart data={[]} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />);
    });
    const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('Render empty chart calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints_VBC,
    };
    act(() => {
      const component = mount(<VerticalBarChart {...props} />);
      component.setProps({ ...props });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('Prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: [],
    };
    act(() => {
      const component = mount(<VerticalBarChart {...props} />);
      component.setProps({ ...props, data: chartPoints_VBC });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
