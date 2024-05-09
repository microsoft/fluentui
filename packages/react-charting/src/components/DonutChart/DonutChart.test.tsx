jest.mock('react-dom');
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { chartPointsDC, chartPointsDCElevateMinimums, pointsDC } from '../../utilities/test-data';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { IDonutChartProps, DonutChart } from './index';
import { IDonutChartState, DonutChartBase } from './DonutChart.base';
import { IChartProps, IChartDataPoint } from '../../index';
import toJson from 'enzyme-to-json';
const rendererAct = renderer.act;
import { act as domAct } from 'react-dom/test-utils';

// Wrapper of the DonutChart to be tested.
let wrapper: ReactWrapper<IDonutChartProps, IDonutChartState, DonutChartBase> | undefined;

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

const pointsNoColors: IChartDataPoint[] = [
  { legend: 'first', data: 20000, xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, xAxisCalloutData: '2020/04/25' },
];

const chartTitle = 'Donut chart example';

export const emptyChartPoints: IChartProps = {
  chartTitle,
  chartData: [],
};

export const noColorsChartPoints: IChartProps = {
  chartTitle,
  chartData: pointsNoColors,
};

describe('DonutChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);
  it('renders DonutChart correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} innerRadius={55} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DonutChart correctly without color points', () => {
    const chartPointColor = pointsDC[0].color;
    delete pointsDC[0].color;

    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={noColorsChartPoints} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
    pointsDC[0].color = chartPointColor;
  });

  it('renders hideLegend correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} hideTooltip={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} enabledLegendsWrapLines={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders value inside onf the pie', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} valueInsideDonut={1000} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render arc labels', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} hideLabels={false} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render arc labels in percentage format', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDC} hideLabels={false} showLabelsInPercent={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should elevate all smaller values to minimums', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<DonutChart data={chartPointsDCElevateMinimums} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('DonutChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should mount legend when hideLegend false ', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    domAct(() => {
      wrapper = mount(
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
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('DonutChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} innerRadius={55} calloutProps={{ doNotLayer: true }} />);
    });
    wrapper!.find('path[id^="_Pie_"]').at(0).simulate('mouseover');
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} innerRadius={55} calloutProps={{ doNotLayer: true }} />);
    });
    wrapper!.find('path[id^="_Pie_"]').at(0).simulate('mousemove');
    const html1 = wrapper!.html();
    wrapper!.find('path[id^="_Pie_"]').at(0).simulate('mouseleave');
    wrapper!.find('path[id^="_Pie_"]').at(1).simulate('mousemove');
    const html2 = wrapper!.html();
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
    domAct(() => {
      wrapper = mount(
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
    });
    wrapper!.find('path[id^="_Pie_"]').at(0).simulate('mouseover');
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);
  it('No empty chart aria label div rendered', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={chartPointsDC} />);
    });
    const renderedDOM = wrapper!.findWhere(
      (node: ReactWrapper) => node.prop('aria-label') === 'Graph has no data to display',
    );
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    domAct(() => {
      wrapper = mount(<DonutChart data={emptyChartPoints} />);
    });
    const renderedDOM = wrapper!.findWhere(
      (node: ReactWrapper) => node.prop('aria-label') === 'Graph has no data to display',
    );
    expect(renderedDOM!.length).toBe(1);
  });
});
