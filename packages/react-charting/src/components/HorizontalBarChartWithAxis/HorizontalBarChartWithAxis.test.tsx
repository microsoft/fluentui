jest.mock('react-dom');
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChartWithAxis, IHorizontalBarChartWithAxisProps } from '../../index';
import { IHorizontalBarChartWithAxisState, HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { resetIds } from '@fluentui/react';
const rendererAct = renderer.act;
import { act as domAct } from 'react-dom/test-utils';
import { pointsHBCWA } from '../../utilities/test-data';
import toJson from 'enzyme-to-json';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

let wrapper:
  | ReactWrapper<IHorizontalBarChartWithAxisProps, IHorizontalBarChartWithAxisState, HorizontalBarChartWithAxisBase>
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
    rendererAct(() => {
      component = renderer.create(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders hideLegend correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(<HorizontalBarChartWithAxis data={pointsHBCWA} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showToolTipForYAxisLabels correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(
        <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLablesTooltip={true} />,
      );
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showYAxisLables correctly', () => {
    let component: any;
    rendererAct(() => {
      component = renderer.create(
        <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLables={true} showYAxisLablesTooltip={false} />,
      );
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HorizontalBarChartWithAxis - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={pointsHBCWA} hideLegend={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    });
    const calloutDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={pointsHBCWA} hideTooltip={true} />);
    });
    const calloutDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM!.length).toBe(0);
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
    domAct(() => {
      mount(<HorizontalBarChartWithAxis {...props} />);
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
    domAct(() => {
      const component = mount(<HorizontalBarChartWithAxis {...props} />);
      component.setProps({ ...props, hideTooltip: true });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('HorizontalBarChartWithAxis - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('Should render callout correctly on mouseover', async () => {
    wrapper = mount(<HorizontalBarChartWithAxis data={pointsHBCWA} calloutProps={{ doNotLayer: true }} />);

    // Wait for the chart to be resized

    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    wrapper.find('rect').at(1).simulate('mouseover');
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});
